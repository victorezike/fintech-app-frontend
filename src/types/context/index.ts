import { Dispatch } from "react";

export type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<boolean>;
};
