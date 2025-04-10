// src/types.ts
export interface User {
    id: number;
    name: string;
    email: string;
    balance: number;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
  }
  
  export interface Transaction {
    id: number;
    amount: number;
    transaction_type: 'deposit' | 'withdrawal' | 'transfer_sent' | 'transfer_received';
    created_at: string;
    recipient: { id: number; name: string } | null;
  }
  
  export interface AuthContextType {
    token: string | null;
    user: User | null;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
    updateBalance: (newBalance: number) => void;
  }