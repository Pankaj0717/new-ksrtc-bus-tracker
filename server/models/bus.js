import mongoose from 'mongoose';

const stopSchema = new mongoose.Schema({
  name: String,
  arrivalTime: String,
  departureTime: String,
  status: {
    type: String,
    enum: ['Completed', 'Current', 'Upcoming'],
    default: 'Upcoming'
  }
});

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true,
    unique: true
  },
  route: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['On Time', 'Delayed', 'Arrived', 'Cancelled'],
    default: 'On Time'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  stops: [stopSchema]
});

export const BusModel = mongoose.model('Bus', busSchema);