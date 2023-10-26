import { createContext } from "react";

export type UserContextType = {
  companyId: string;
  userId: string;
  setCompanyId: (id: string) => void;
  setUserId: (id: string) => void;
};

export const UserContext = createContext<UserContextType>({
  companyId: "",
  userId: "",
  setCompanyId: () => {},
  setUserId: () => {},
});
