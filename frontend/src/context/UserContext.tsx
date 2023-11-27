// lib
import { ReactNode, createContext, useState } from "react";

type UserContextType = {
  companyId: number;
  email: string;
  phone: string;
  role: number;
  setCompanyId: (id: number) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setRole: (role: number) => void;
};

type UserContextProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [companyId, setCompanyId] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [role, setRole] = useState<number>(0);

  return (
    <UserContext.Provider
      value={{
        companyId,
        email,
        phone,
        role,
        setCompanyId,
        setEmail,
        setPhone,
        setRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
