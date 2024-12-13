export interface Bus {
  id: string;
  busNumber: string;
  route: string;
  status: 'On Time' | 'Delayed' | 'Arrived' | 'Cancelled';
  lastUpdated: string;
  stops: Stop[];
}

export interface Stop {
  name: string;
  arrivalTime: string;
  departureTime: string;
  status: 'Completed' | 'Current' | 'Upcoming';
}

export interface NewBusData {
  busNumber: string;
  route: string;
  stops: Omit<Stop, 'status'>[];
}