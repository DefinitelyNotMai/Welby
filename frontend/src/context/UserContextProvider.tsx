import { ReactNode, useState } from "react";
import { UserContext } from "../context/UserContext";

type UserContextProviderProps = {
  children: ReactNode;
};

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [companyId, setCompanyId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  return (
    <UserContext.Provider
      value={{ companyId, setCompanyId, userId, setUserId }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
