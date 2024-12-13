export interface User {
  id: string;
  username: string;
  depotId: string;
  role: 'admin' | 'depot-staff';
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}