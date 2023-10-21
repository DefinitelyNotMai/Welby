import { createContext } from "react";

export type UserContextType = {
  companyId: string;
  setCompanyId: (id: string) => void;
  userId: string;
  setUserId: (id: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
};

export const UserContext = createContext<UserContextType>({
  companyId: "",
  setCompanyId: () => {},
  userId: "",
  setUserId: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});
