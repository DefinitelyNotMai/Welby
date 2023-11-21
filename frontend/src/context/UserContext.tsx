// lib
import { ReactNode, createContext, useState } from "react";

type UserContextType = {
  companyId: string;
  email: string;
  phone: string;
  setCompanyId: (id: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
};

type UserContextProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [companyId, setCompanyId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  return (
    <UserContext.Provider
      value={{
        companyId,
        email,
        phone,
        setCompanyId,
        setEmail,
        setPhone,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
