import { X, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useBusStore } from '../../stores/busStore';
import { NewBusData } from '../../types';

interface Props {
  onClose: () => void;
}

export default function AddBusForm({ onClose }: Props) {
  const addBus = useBusStore((state) => state.addBus);
  const [formData, setFormData] = useState<NewBusData>({
    busNumber: '',
    route: '',
    stops: [{ name: '', arrivalTime: '', departureTime: '' }],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBus(formData);
    onClose();
  };

  const addStop = () => {
    setFormData({
      ...formData,
      stops: [...formData.stops, { name: '', arrivalTime: '', departureTime: '' }],
    });
  };

  const removeStop = (index: number) => {
    setFormData({
      ...formData,
      stops: formData.stops.filter((_, i) => i !== index),
    });
  };

  const updateStop = (index: number, field: keyof Omit<Stop, 'status'>, value: string) => {
    setFormData({
      ...formData,
      stops: formData.stops.map((stop, i) =>
        i === index ? { ...stop, [field]: value } : stop
      ),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 className="text-2xl font-bold">Add New Bus</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="busNumber">
                Bus Number
              </label>
              <input
                id="busNumber"
                type="text"
                value={formData.busNumber}
                onChange={(e) =>
                  setFormData({ ...formData, busNumber: e.target.value })
                }
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="route">
                Route
              </label>
              <input
                id="route"
                type="text"
                value={formData.route}
                onChange={(e) =>
                  setFormData({ ...formData, route: e.target.value })
                }
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Stops</h3>
              <button
                type="button"
                onClick={addStop}
                className="flex items-center text-red-600 hover:text-red-700"
              >
                <Plus className="w-5 h-5 mr-1" />
                Add Stop
              </button>
            </div>

            {formData.stops.map((stop, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Stop Name</label>
                    <input
                      type="text"
                      value={stop.name}
                      onChange={(e) => updateStop(index, 'name', e.target.value)}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Arrival Time</label>
                    <input
                      type="time"
                      value={stop.arrivalTime}
                      onChange={(e) => updateStop(index, 'arrivalTime', e.target.value)}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Departure Time</label>
                    <input
                      type="time"
                      value={stop.departureTime}
                      onChange={(e) => updateStop(index, 'departureTime', e.target.value)}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                </div>
                {formData.stops.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStop(index)}
                    className="mt-2 text-red-600 hover:text-red-700 flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove Stop
                  </button>
                )}
              </div>
            ))}
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
              Add Bus
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}