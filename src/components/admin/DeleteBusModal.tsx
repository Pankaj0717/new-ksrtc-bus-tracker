import { X } from 'lucide-react';
import { Bus } from '../../types';

interface Props {
  bus: Bus;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteBusModal({ bus, onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Delete Bus</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete bus <span className="font-semibold">{bus.busNumber}</span> ({bus.route})?
            This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete Bus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}