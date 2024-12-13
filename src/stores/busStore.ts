import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Bus, NewBusData } from '../types';
import { buses as initialBuses } from '../data/mockData';
import { socket } from '../utils/socket';

interface BusState {
  buses: Bus[];
  updateBusStatus: (busNumber: string, status: Bus['status'], currentStop: string) => void;
  filterBuses: (query: string) => Bus[];
  addBus: (busData: NewBusData) => void;
  deleteBus: (busId: string) => void;
  updateBusStops: (busId: string, stops: Omit<Stop, 'status'>[]) => void;
  setBuses: (buses: Bus[]) => void;
}

export const useBusStore = create<BusState>()(
  persist(
    (set, get) => ({
      buses: initialBuses,
      setBuses: (buses) => set({ buses }),
      updateBusStatus: (busNumber, status, currentStop) => {
        socket.emit('updateBus', { busNumber, status, currentStop });
        set((state) => ({
          buses: state.buses.map((bus) => {
            if (bus.busNumber === busNumber) {
              return {
                ...bus,
                status,
                lastUpdated: new Date().toISOString(),
                stops: bus.stops.map((stop) => ({
                  ...stop,
                  status:
                    stop.name === currentStop
                      ? 'Current'
                      : stop.status === 'Current'
                      ? 'Completed'
                      : stop.status,
                })),
              };
            }
            return bus;
          }),
        }));
      },
      filterBuses: (query) => {
        const buses = get().buses;
        if (!query) return buses;
        return buses.filter(
          (bus) =>
            bus.busNumber.toLowerCase().includes(query.toLowerCase()) ||
            bus.route.toLowerCase().includes(query.toLowerCase())
        );
      },
      addBus: (busData) => {
        const newBus: Bus = {
          id: Date.now().toString(),
          ...busData,
          status: 'On Time',
          lastUpdated: new Date().toISOString(),
          stops: busData.stops.map((stop, index) => ({
            ...stop,
            status: index === 0 ? 'Current' : 'Upcoming',
          })),
        };
        socket.emit('addBus', newBus);
        set((state) => ({
          buses: [...state.buses, newBus],
        }));
      },
      deleteBus: (busId) => {
        socket.emit('deleteBus', busId);
        set((state) => ({
          buses: state.buses.filter((bus) => bus.id !== busId),
        }));
      },
      updateBusStops: (busId, stops) => {
        set((state) => ({
          buses: state.buses.map((bus) => {
            if (bus.id === busId) {
              return {
                ...bus,
                stops: stops.map((stop, index) => ({
                  ...stop,
                  status: index === 0 ? 'Current' : 'Upcoming',
                })),
                lastUpdated: new Date().toISOString(),
              };
            }
            return bus;
          }),
        }));
      },
    }),
    {
      name: 'bus-store',
      version: 1,
    }
  )
);