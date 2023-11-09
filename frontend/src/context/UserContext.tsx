// lib
import { ReactNode, createContext, useState } from "react";

type UserContextType = {
  userId: string;
  companyId: string;
  isLoggedIn: boolean;
  setCompanyId: (id: string) => void;
  setIsLoggedIn: (e: boolean) => void;
  setUserId: (id: string) => void;
};

type UserContextProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [userId, setUserId] = useState<string>("");
  const [companyId, setCompanyId] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <UserContext.Provider
      value={{
        userId,
        companyId,
        isLoggedIn,
        setUserId,
        setCompanyId,
        setIsLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
