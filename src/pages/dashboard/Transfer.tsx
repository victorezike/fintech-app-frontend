// src/pages/dashboard/Transfer.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getBalance, transfer } from '../../services/api';

const Transfer: React.FC = () => {
  const { user, updateBalance } = useAuth();
  const navigate = useNavigate();
  const [balance, setBalance] = useState<number>(user?.balance || 0);
  const [transferAmount, setTransferAmount] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balanceData = await getBalance();
        setBalance(balanceData);
        updateBalance(balanceData);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch balance');
      }
    };
    fetchBalance();
  }, [updateBalance]);

  const handleTransfer = async () => {
    if (!transferAmount || Number(transferAmount) <= 0) {
      setError('Please enter a valid transfer amount');
      return;
    }
    if (!recipientEmail) {
      setError('Please enter a recipient email');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const response = await transfer(Number(transferAmount), recipientEmail);
      setBalance(response.senderNewBalance);
      updateBalance(response.senderNewBalance);
      setTransferAmount('');
      setRecipientEmail('');
    } catch (err: any) {
      setError(err.message || 'Transfer failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Transfer Funds</h1>
        <button
          onClick={() => navigate('/dashboard/wallet')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back to Wallet
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Current Balance: ${balance.toFixed(2)}</h2>
      </div>

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      <div className="border p-4 rounded max-w-md">
        <h3 className="text-xl font-semibold mb-4">Transfer</h3>
        <input
          type="number"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
          placeholder="Enter amount"
          className="border p-2 w-full mb-4"
          disabled={loading}
        />
        <input
          type="email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          placeholder="Recipient email"
          className="border p-2 w-full mb-4"
          disabled={loading}
        />
        <button
          onClick={handleTransfer}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Transfer'}
        </button>
      </div>
    </div>
  );
};

export default Transfer;