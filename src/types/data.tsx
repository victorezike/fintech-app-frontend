export interface Recipient {
    id: number;
    name: string;
    email: string;
    password: string;
    balance: number;
  }
  
  export interface TransactionType {
    id: number;
    amount: string;
    transaction_type: string;
    recipient: Recipient | null;
    createdAt: string;
  }