import { X } from 'lucide-react';
import { Bus } from '../types';
import StatusBadge from './status/StatusBadge';

interface Props {
  bus: Bus;
  onClose: () => void;
}

export default function BusDetailsModal({ bus, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Bus Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Bus Information</h3>
            <p><strong>Bus Number:</strong> {bus.busNumber}</p>
            <p><strong>Route:</strong> {bus.route}</p>
            <p><strong>Status:</strong> <StatusBadge status={bus.status} /></p>
          </div>
          {bus.status !== 'Cancelled' && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Route Details</h3>
              <div className="space-y-4">
                {bus.stops.map((stop, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      stop.status === 'Completed'
                        ? 'bg-green-50'
                        : stop.status === 'Current'
                        ? 'bg-blue-50'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{stop.name}</p>
                        <p className="text-sm text-gray-600">
                          Arrival: {stop.arrivalTime} | Departure: {stop.departureTime}
                        </p>
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          stop.status === 'Completed'
                            ? 'text-green-600'
                            : stop.status === 'Current'
                            ? 'text-blue-600'
                            : 'text-gray-600'
                        }`}
                      >
                        {stop.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}