import { useContext } from "react";
import { UserContext, UserContextType } from "../context/UserContext";

const useUserContext: () => UserContextType = () => useContext(UserContext);

export default useUserContext;
