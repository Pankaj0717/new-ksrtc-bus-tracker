import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { LogIn, X } from 'lucide-react';

interface Props {
  onCancel: () => void;
}

export default function LoginForm({ onCancel }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login({ username, password });
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <LogIn className="w-8 h-8 text-red-600 mr-2" />
            <h2 className="text-2xl font-bold">Depot Staff Login</h2>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-colors"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}