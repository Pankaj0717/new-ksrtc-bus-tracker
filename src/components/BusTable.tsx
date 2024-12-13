import { useState } from 'react';
import { Bus } from '../types';
import BusDetailsModal from './BusDetailsModal';
import StatusBadge from './status/StatusBadge';

interface Props {
  buses: Bus[];
}

export default function BusTable({ buses }: Props) {
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bus Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Route
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {buses.map((bus) => (
              <tr
                key={bus.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedBus(bus)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-blue-600 hover:text-blue-800">
                  {bus.busNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{bus.route}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={bus.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(bus.lastUpdated).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedBus && (
        <BusDetailsModal bus={selectedBus} onClose={() => setSelectedBus(null)} />
      )}
    </div>
  );
}