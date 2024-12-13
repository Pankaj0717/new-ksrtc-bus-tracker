import { create } from 'zustand';
import { AuthState, LoginCredentials, User } from '../types/auth';

// Mock user data - In a real app, this would come from an API
const mockUser: User = {
  id: '1',
  username: 'depot_admin',
  depotId: 'TVM001',
  role: 'depot-staff',
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (credentials: LoginCredentials) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock authentication - In a real app, validate against an API
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      set({ user: mockUser, isAuthenticated: true });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));