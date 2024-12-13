import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BusSearch from './components/BusSearch';
import BusTable from './components/BusTable';
import About from './components/About';
import LoginForm from './components/admin/LoginForm';
import AdminDashboard from './components/admin/AdminDashboard';
import { useAuthStore } from './stores/authStore';
import { useBusStore } from './stores/busStore';

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { filterBuses } = useBusStore();
  const [searchQuery, setSearchQuery] = useState('');
  const filteredBuses = filterBuses(searchQuery);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (showAdmin) {
    return isAuthenticated ? (
      <AdminDashboard onExit={() => setShowAdmin(false)} />
    ) : (
      <LoginForm onCancel={() => setShowAdmin(false)} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onAdminClick={() => setShowAdmin(true)} />
      <main>
        <Hero />
        <div id="status" className="py-12">
          <BusSearch onSearch={handleSearch} />
          <BusTable buses={filteredBuses} />
        </div>
        <About />
      </main>
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} KSRTC Bus Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}