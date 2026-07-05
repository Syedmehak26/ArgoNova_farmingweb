// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  state: string;
  district: string;
  town: string;
  crops: string[];
  growingMethod: 'organic' | 'chemical' | 'mixed';
  role: 'farmer' | 'home_grower' | 'terrace_gardener';
  language: 'en' | 'hi' | 'te';
  createdAt: string;
}

interface StoredUser extends User {
  password: string; // stored for demo, never expose
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (data: Omit<User, 'id' | 'createdAt'> & { password: string }) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = 'argnova_users';
const CURRENT_USER_KEY = 'argnova_current_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load current user on mount
  useEffect(() => {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
    setLoading(false);
  }, []);

  // Get all users from localStorage
  const getUsers = (): StoredUser[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  };

  // Save users array
  const saveUsers = (users: StoredUser[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  // Register
  const register = async (data: Omit<User, 'id' | 'createdAt'> & { password: string }) => {
    const users = getUsers();
    // Check if email already exists
    if (users.some(u => u.email === data.email)) {
      throw new Error('Email already registered. Please login.');
    }

    const newUser: StoredUser = {
      id: Date.now().toString(),
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      password: data.password,
      state: data.state,
      district: data.district,
      town: data.town,
      crops: data.crops,
      growingMethod: data.growingMethod,
      role: data.role,
      language: data.language,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    // Auto-login after registration
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
  };

  // Login
  const login = async (email: string, password: string) => {
    const users = getUsers();
    const found = users.find(u => u.email === email);
    if (!found) {
      throw new Error('User not found. Please register.');
    }
    if (found.password !== password) {
      throw new Error('Incorrect password.');
    }

    const { password: _, ...userWithoutPassword } = found;
    setUser(userWithoutPassword);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  // Update user
  const updateUser = async (data: Partial<User>) => {
    if (!user) return;

    // Update in users array
    const users = getUsers();
    const index = users.findIndex(u => u.email === user.email);
    if (index === -1) throw new Error('User not found in storage.');

    const updatedUser = { ...users[index], ...data };
    users[index] = updatedUser;
    saveUsers(users);

    // Update current user (remove password)
    const { password: _, ...userWithoutPassword } = updatedUser;
    setUser(userWithoutPassword);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};