import { X } from 'lucide-react';
import { useState } from 'react';
import { Bus } from '../../types';
import { useBusStore } from '../../stores/busStore';

interface Props {
  onClose: () => void;
}

export default function BusUpdateForm({ onClose }: Props) {
  const updateBusStatus = useBusStore((state) => state.updateBusStatus);
  const buses = useBusStore((state) => state.buses);
  const [formData, setFormData] = useState({
    busNumber: '',
    status: 'On Time' as Bus['status'],
    currentStop: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusStatus(formData.busNumber, formData.status, formData.currentStop);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Update Bus Status</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="busNumber">
              Bus Number
            </label>
            <select
              id="busNumber"
              value={formData.busNumber}
              onChange={(e) =>
                setFormData({ ...formData, busNumber: e.target.value })
              }
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Select a bus</option>
              {buses.map((bus) => (
                <option key={bus.id} value={bus.busNumber}>
                  {bus.busNumber} - {bus.route}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as Bus['status'],
                })
              }
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="On Time">On Time</option>
              <option value="Delayed">Delayed</option>
              <option value="Arrived">Arrived</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="currentStop">
              Current Stop
            </label>
            <select
              id="currentStop"
              value={formData.currentStop}
              onChange={(e) =>
                setFormData({ ...formData, currentStop: e.target.value })
              }
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              disabled={formData.status === 'Cancelled'}
            >
              <option value="">Select current stop</option>
              {formData.busNumber &&
                buses
                  .find((bus) => bus.busNumber === formData.busNumber)
                  ?.stops.map((stop, index) => (
                    <option key={index} value={stop.name}>
                      {stop.name}
                    </option>
                  ))}
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Update Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}