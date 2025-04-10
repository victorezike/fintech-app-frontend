import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthContextType, LoginRequest, RegisterRequest, User } from '../types';
import { login, register } from '../services/api';

interface AuthContextValue extends AuthContextType {
  user: User | null;
  updateBalance: (newBalance: number) => void;
  isAuthenticated: boolean; 
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async (data: LoginRequest) => {
    const response = await login(data);
    setToken(response.access_token);
    setUser(response.user);
    localStorage.setItem('token', response.access_token);
    return response;
  };

  const handleRegister = async (data: RegisterRequest) => {
    const response = await register(data);
    setToken(response.access_token);
    setUser(response.user);
    localStorage.setItem('token', response.access_token);
    return response;
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const updateBalance = (newBalance: number) => {
    if (user) {
      setUser({ ...user, balance: newBalance });
    }
  };

  const isAuthenticated = !!token;

  const contextValue: AuthContextValue = {
    token,
    user,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateBalance,
    isAuthenticated, 
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};