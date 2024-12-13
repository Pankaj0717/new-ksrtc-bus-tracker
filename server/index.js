import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { BusModel } from './models/bus.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5175",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://mongodb:mongodb@cluster0.caokv.mongodb.net/')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected');

  // Listen for bus updates
  socket.on('updateBus', async (data) => {
    try {
      const updatedBus = await BusModel.findOneAndUpdate(
        { busNumber: data.busNumber },
        {
          $set: {
            status: data.status,
            lastUpdated: new Date(),
            'stops.$[stop].status': data.currentStop ? 'Current' : 'Upcoming'
          }
        },
        { new: true }
      );

      if (updatedBus) {
        // Broadcast the update to all connected clients
        io.emit('busUpdated', updatedBus);
      }
    } catch (error) {
      console.error('Error updating bus:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// API Routes
app.get('/api/buses', async (req, res) => {
  try {
    const buses = await BusModel.find();
    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching buses' });
  }
});

app.post('/api/buses', async (req, res) => {
  try {
    const newBus = new BusModel(req.body);
    await newBus.save();
    io.emit('busAdded', newBus);
    res.status(201).json(newBus);
  } catch (error) {
    res.status(500).json({ error: 'Error adding bus' });
  }
});

app.delete('/api/buses/:id', async (req, res) => {
  try {
    await BusModel.findByIdAndDelete(req.params.id);
    io.emit('busDeleted', req.params.id);
    res.status(200).json({ message: 'Bus deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting bus' });
  }
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});