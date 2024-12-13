import { Bus, Shield } from 'lucide-react';

interface Props {
  onAdminClick: () => void;
}

export default function Header({ onAdminClick }: Props) {
  return (
    <header className="bg-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bus size={32} />
            <h1 className="text-2xl font-bold">KSRTC Bus Tracker</h1>
          </div>
          <nav>
            <ul className="flex space-x-6 items-center">
              <li><a href="#home" className="hover:text-red-200">Home</a></li>
              <li><a href="#status" className="hover:text-red-200">Bus Status</a></li>
              <li><a href="#about" className="hover:text-red-200">About</a></li>
              <li>
                <button
                  onClick={onAdminClick}
                  className="flex items-center space-x-1 bg-white/10 px-4 py-2 rounded-md hover:bg-white/20 transition-colors"
                >
                  <Shield size={16} />
                  <span>Admin</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}