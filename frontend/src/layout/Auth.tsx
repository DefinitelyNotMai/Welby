// lib
import { useToast } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthProps = {
  children: ReactNode;
};

export const Auth = ({ children }: AuthProps) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      if (localStorage.getItem("userId")) {
        setIsLoggedIn(true);
      } else {
        toast({
          title: "ERROR",
          description: "Access Denied. Please log in to proceed.",
          status: "error",
          position: "top",
          duration: 10000,
          isClosable: true,
        });
        setIsLoggedIn(false);
        navigate("/");
      }
    };

    checkAuthentication();
  }, [toast, navigate]);

  return isLoggedIn ? <>{children}</> : null;
};
