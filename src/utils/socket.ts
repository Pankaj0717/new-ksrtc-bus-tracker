import { io } from 'socket.io-client';
import { useBusStore } from '../stores/busStore';

export const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('busUpdated', (updatedBus) => {
  const { buses, setBuses } = useBusStore.getState();
  const updatedBuses = buses.map(bus => 
    bus.id === updatedBus.id ? updatedBus : bus
  );
  setBuses(updatedBuses);
});

socket.on('busAdded', (newBus) => {
  const { buses, setBuses } = useBusStore.getState();
  setBuses([...buses, newBus]);
});

socket.on('busDeleted', (busId) => {
  const { buses, setBuses } = useBusStore.getState();
  setBuses(buses.filter(bus => bus.id !== busId));
});