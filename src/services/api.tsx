import axios from 'axios';
import { LoginRequest, RegisterRequest, TransactionType } from '../types';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (data: LoginRequest) => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterRequest) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const getBalance = async () => {
  const response = await api.get('/transactions/balance');
  return response.data;
};

export const getTransactionHistory = async (): Promise<TransactionType[]> => {
    const response = await api.get('/transactions/history');
    return response.data;
  };

export const deposit = async (amount: number) => {
  const response = await api.post('/transactions/deposit', { amount });
  return response.data;
};

export const withdraw = async (amount: number) => {
  const response = await api.post('/transactions/withdrawal', { amount });
  return response.data;
};

export const transfer = async (amount: number, recipientEmail: string) => {
  const response = await api.post('/transactions/transfer', { amount, recipientEmail });
  return response.data;
};