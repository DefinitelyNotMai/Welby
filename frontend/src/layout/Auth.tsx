// lib
import { useToast } from "@chakra-ui/react";
import { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// local
import { UserContext } from "../context/UserContext";
import { fetchData } from "../api/fetchData";
import { fetchAccessToken } from "../api/tokenService";

type AuthProps = {
  children: ReactNode;
};

export const Auth = ({ children }: AuthProps) => {
  const toast = useToast();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchContext = async () => {
      const employeeUrl = "https://localhost:44373/api/GetEmployee";

      try {
        const result = await fetchData(employeeUrl, {
          EmployeeId: userId,
        });
        if (userId && userId.length > 0) {
          userContext.setCompanyId(result[0].CompanyId);
          userContext.setEmail(result[0].Email);
          userContext.setPhone(result[0].Phone_Number);
        } else {
          toast({
            title: "ERROR",
            description: "Access Denied. Please log in to proceed.",
            status: "error",
            position: "top",
            duration: 10000,
            isClosable: true,
          });
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    const fetchRole = async () => {
      const roleUrl = "";

      try {
        const token = fetchAccessToken(); // token

        /*
        const response = axios call




             method: "GET",
             headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
             },
             userContext.setRole(result[0].id)
        */
        userContext.setRole;
      } catch (error) {
        console.error("Error fetching role: ", error);
      }
    };

    fetchContext();
  }, [navigate, toast, userContext]);

  console.log(userContext.role);
  return userContext.companyId && userContext.email && userContext.phone ? (
    <>{children}</>
  ) : null;
};
