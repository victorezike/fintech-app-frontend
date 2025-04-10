import overview from "../assets/icons/dashboard/overview.svg";
import customers from "../assets/icons/dashboard/customers.svg";
import spotOrders from "../assets/icons/dashboard/spot orders.svg";
import marginOrders from "../assets/icons/dashboard/margin orders.svg";
import transactions from "../assets/icons/dashboard/transactions.svg";
import wallet from "../assets/icons/dashboard/wallet.svg";
import notification from "../assets/icons/dashboard/notification.svg";
import settings from "../assets/icons/dashboard/settings.svg";
import logout from "../assets/icons/dashboard/logout.svg";
import help from "../assets/icons/dashboard/help.svg";
import { MenuItemType } from "../types/data";

export const MainMenuItems: MenuItemType[] = [
  { title: "Overview", image: overview },
  { title: "Customers", image: customers },
  { title: "Spot Orders", image: spotOrders },
  { title: "Margin Orders", image: marginOrders },
  { title: "Transactions", image: transactions },
  { title: "Wallet", image: wallet },
];

export const OtherMenuItems: MenuItemType[] = [
  { title: "Notification", image: notification },
  { title: "Settings", image: settings },
  { title: "Logout", image: logout },
  { title: "Help", image: help },
];
