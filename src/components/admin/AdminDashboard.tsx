import { useAuthStore } from '../../stores/authStore';
import { useBusStore } from '../../stores/busStore';
import { LogOut, Plus, ArrowLeft, Trash2 } from 'lucide-react';
import BusUpdateForm from './BusUpdateForm';
import AddBusForm from './AddBusForm';
import DeleteBusModal from './DeleteBusModal';
import { useState } from 'react';
import StatusBadge from '../status/StatusBadge';
import { Bus } from '../../types';

interface Props {
  onExit: () => void;
}

export default function AdminDashboard({ onExit }: Props) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [busToDelete, setBusToDelete] = useState<Bus | null>(null);
  const { user, logout } = useAuthStore();
  const { buses, deleteBus } = useBusStore();

  const handleLogout = () => {
    logout();
    onExit();
  };

  const handleDeleteBus = () => {
    if (busToDelete) {
      deleteBus(busToDelete.id);
      setBusToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={onExit}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-5 h-5 mr-1" />
                Back to Site
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Depot Dashboard</h1>
                <p className="text-gray-600">Welcome, {user?.username}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-red-600 hover:text-red-800"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Manage Buses</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowUpdateForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Update Status
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Bus
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Bus Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Current Stop
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {buses.map((bus) => (
                <tr key={bus.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{bus.busNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{bus.route}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={bus.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {bus.status !== 'Cancelled' 
                      ? bus.stops.find((stop) => stop.status === 'Current')?.name || '-'
                      : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(bus.lastUpdated).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setBusToDelete(bus)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Delete Bus"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {showUpdateForm && (
        <BusUpdateForm onClose={() => setShowUpdateForm(false)} />
      )}
      
      {showAddForm && (
        <AddBusForm onClose={() => setShowAddForm(false)} />
      )}

      {busToDelete && (
        <DeleteBusModal
          bus={busToDelete}
          onConfirm={handleDeleteBus}
          onCancel={() => setBusToDelete(null)}
        />
      )}
    </div>
  );
}