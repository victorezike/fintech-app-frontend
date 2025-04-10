import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getBalance, transfer } from "../../services/api";

const Transfer: React.FC = () => {
  const { user, updateBalance } = useAuth();
  const navigate = useNavigate();
  const [balance, setBalance] = useState<number>(user?.balance || 0);
  const [transferAmount, setTransferAmount] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balanceData = await getBalance();
        setBalance(balanceData);
        updateBalance(balanceData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch balance");
      }
    };
    fetchBalance();
  }, [updateBalance]);

  const handleTransfer = async () => {
    if (!transferAmount || Number(transferAmount) <= 0) {
      setError("Please enter a valid transfer amount");
      return;
    }
    if (!recipientEmail) {
      setError("Please enter a recipient email");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const response = await transfer(Number(transferAmount), recipientEmail);
      setBalance(response.senderNewBalance);
      updateBalance(response.senderNewBalance);
      setTransferAmount("");
      setRecipientEmail("");
    } catch (err: any) {
      setError(err.message || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Transfer Funds</h1>
        <button
          onClick={() => navigate("/dashboard/wallet")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm sm:text-base"
        >
          Back to Wallet
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-medium">
          Current Balance:{" "}
          <span className="font-bold text-gray-800">${balance.toFixed(2)}</span>
        </h2>
      </div>

      {error && (
        <div className="text-red-500 mb-4 text-sm sm:text-base">{error}</div>
      )}

      <div className="bg-white shadow rounded-xl p-4 sm:p-6 w-full">
        <h3 className="text-lg font-semibold mb-4">Send Money</h3>
        <div className="space-y-4">
          <input
            type="number"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <input
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            placeholder="Recipient email"
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            onClick={handleTransfer}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
            disabled={loading}
          >
            {loading ? "Processing..." : "Transfer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
