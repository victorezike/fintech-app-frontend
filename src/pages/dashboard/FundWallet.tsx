import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getBalance, deposit, withdraw } from '../../services/api';

const FundWallet: React.FC = () => {
  const { user, updateBalance } = useAuth();
  const navigate = useNavigate();
  const [balance, setBalance] = useState<number>(user?.balance || 0);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
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

  const handleDeposit = async () => {
    if (!depositAmount || Number(depositAmount) <= 0) {
      setError('Please enter a valid deposit amount');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const response = await deposit(Number(depositAmount));
      setBalance(response.newBalance);
      updateBalance(response.newBalance);
      setDepositAmount('');
    } catch (err: any) {
      setError(err.message || 'Deposit failed');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || Number(withdrawAmount) <= 0) {
      setError('Please enter a valid withdrawal amount');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const response = await withdraw(Number(withdrawAmount));
      setBalance(response.newBalance);
      updateBalance(response.newBalance);
      setWithdrawAmount('');
    } catch (err: any) {
      setError(err.message || 'Withdrawal failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Fund Wallet</h1>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-4 rounded">
          <h3 className="text-xl font-semibold mb-4">Deposit</h3>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Enter amount"
            className="border p-2 w-full mb-4"
            disabled={loading}
          />
          <button
            onClick={handleDeposit}
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Deposit'}
          </button>
        </div>

        <div className="border p-4 rounded">
          <h3 className="text-xl font-semibold mb-4">Withdraw</h3>
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="Enter amount"
            className="border p-2 w-full mb-4"
            disabled={loading}
          />
          <button
            onClick={handleWithdraw}
            className="bg-yellow-500 text-white px-4 py-2 rounded w-full"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Withdraw'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundWallet;