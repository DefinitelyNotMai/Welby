import { ReactNode, useState } from "react";
import { UserContext } from "./UserContext";

type UserContextProviderProps = {
  children: ReactNode;
};

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [companyId, setCompanyId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <UserContext.Provider
      value={{
        companyId,
        setCompanyId,
        isLoggedIn,
        setIsLoggedIn,
        userId,
        setUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
