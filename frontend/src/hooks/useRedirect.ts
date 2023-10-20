import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserContext from "./useUserContext";

const useRedirect = () => {
  const { isLoggedIn } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
};

export default useRedirect;
