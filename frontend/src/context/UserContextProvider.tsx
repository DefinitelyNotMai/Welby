import { ReactNode, useState } from "react";
import { UserContext } from "./UserContext";

type UserContextProviderProps = {
  children: ReactNode;
};

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [companyId, setCompanyId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  return (
    <UserContext.Provider
      value={{
        companyId,
        userId,
        setCompanyId,
        setUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
