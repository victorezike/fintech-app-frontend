export type MenuItemType = {
  title: string;
  image: string;
};
export type TransactionType = {
  transactionId: string;
  transactionType: string; // 👈 Strict union type
  amount: string;
  status: string;
  date: string;
  action: "View";
};


