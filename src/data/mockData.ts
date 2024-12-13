import { Bus } from '../types';

export const buses: Bus[] = [
  {
    id: '1',
    busNumber: 'KA-22-A-1234',
    route: 'Belagavi - Hubballi',
    status: 'On Time',
    lastUpdated: new Date().toISOString(),
    stops: [
      {
        name: 'Belagavi',
        arrivalTime: '06:00',
        departureTime: '06:15',
        status: 'Completed'
      },
      {
        name: 'Dharwad',
        arrivalTime: '08:00',
        departureTime: '08:15',
        status: 'Current'
      },
      {
        name: 'Hubballi',
        arrivalTime: '09:30',
        departureTime: '09:45',
        status: 'Upcoming'
      }
    ]
  },
  {
    id: '2',
    busNumber: 'KA-22-B-5678',
    route: 'Belagavi - Bengaluru',
    status: 'Delayed',
    lastUpdated: new Date().toISOString(),
    stops: [
      {
        name: 'Belagavi',
        arrivalTime: '07:00',
        departureTime: '07:15',
        status: 'Completed'
      },
      {
        name: 'Hubballi',
        arrivalTime: '10:00',
        departureTime: '10:15',
        status: 'Current'
      },
      {
        name: 'Bengaluru',
        arrivalTime: '15:30',
        departureTime: '15:45',
        status: 'Upcoming'
      }
    ]
  },
  {
    id: '3',
    busNumber: 'KA-22-C-8901',
    route: 'Belagavi - Vijayapura',
    status: 'On Time',
    lastUpdated: new Date().toISOString(),
    stops: [
      {
        name: 'Belagavi',
        arrivalTime: '05:30',
        departureTime: '05:45',
        status: 'Completed'
      },
      {
        name: 'Bagalkot',
        arrivalTime: '08:00',
        departureTime: '08:15',
        status: 'Current'
      },
      {
        name: 'Vijayapura',
        arrivalTime: '10:00',
        departureTime: '10:15',
        status: 'Upcoming'
      }
    ]
  },
  {
    id: '4',
    busNumber: 'KA-22-D-3456',
    route: 'Belagavi - Kolhapur',
    status: 'On Time',
    lastUpdated: new Date().toISOString(),
    stops: [
      {
        name: 'Belagavi',
        arrivalTime: '06:30',
        departureTime: '06:45',
        status: 'Completed'
      },
      {
        name: 'Nipani',
        arrivalTime: '07:30',
        departureTime: '07:45',
        status: 'Current'
      },
      {
        name: 'Kolhapur',
        arrivalTime: '09:00',
        departureTime: '09:15',
        status: 'Upcoming'
      }
    ]
  },
  {
    id: '5',
    busNumber: 'KA-22-E-7890',
    route: 'Belagavi - Goa',
    status: 'On Time',
    lastUpdated: new Date().toISOString(),
    stops: [
      {
        name: 'Belagavi',
        arrivalTime: '08:00',
        departureTime: '08:15',
        status: 'Completed'
      },
      {
        name: 'Khanapur',
        arrivalTime: '09:00',
        departureTime: '09:15',
        status: 'Current'
      },
      {
        name: 'Panaji',
        arrivalTime: '11:30',
        departureTime: '11:45',
        status: 'Upcoming'
      }
    ]
  }
];