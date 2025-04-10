import { TransactionType } from "../types/data";

export const transactions: TransactionType[] = Array.from(
  { length: 30 },
  (_, i) => {
    const types = [
      "Liquidation",
      "Awaiting Approval",
      "Withdrawal",
      "Collateral",
      "Approved",
      "Stock Investment",
    ];
    const statuses = [{ label: "Approved" }, { label: "Liquidated" }];

    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    return {
      transactionId: "TXN0012345",
      transactionType: randomType,
      amount: "₦200,000.00",
      status: randomStatus.label,
      date: "2024-09-12",
      action: "View",
    };
  }
);
