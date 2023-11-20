// lib
import { AiOutlineTeam } from "react-icons/ai";
import { Button, Flex } from "@chakra-ui/react";
import { LuLayout } from "react-icons/lu";
import { MdBusinessCenter } from "react-icons/md";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

// local
import { DashboardHeader } from "../../components/Dashboard/DashboardHeader";
import { Sidebar } from "../../components/DataDisplay/Sidebar";
import { UserContext } from "../../context/UserContext";

export const DashboardPage = () => {
  const [selectedItem, setSelectedItem] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();
  const userContext = useContext(UserContext);

  useEffect(() => {
    const fetchUserData = async () => {
      const userUrl = "https:/localhost:44373/api/GetEmployee";
      const userId = localStorage.getItem("userId");

      if (userId) {
        const params = new URLSearchParams({ EmployeeId: userId });
        const urlWithParams = `${userUrl}?${params.toString()}`;

        try {
          const response = await fetch(urlWithParams, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const result = await response.json();
            if (result) {
              userContext.setCompanyId(result[0].CompanyId);
              userContext.setPhone(result[0].Phone_Number);
              userContext.setEmail(result[0].Email);
            }
          } else {
            console.error(
              `Failed to fetch user data. Status: ${response.status}`,
            );
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
    setSelectedItem(location.pathname.replace("/dashboard/", "").split("/")[0]);
  }, [location.pathname, userContext]);

  const handleItemClick = (item: string, route: string) => {
    setSelectedItem(item);
    navigate(route);
  };

  return (
    <>
      <DashboardHeader />
      <Flex backgroundColor="#f2f2f2" flex={1} flexDirection="row">
        <Sidebar>
          <Button
            borderLeft={
              selectedItem === "my-dashboard"
                ? "5px solid #24a2f0"
                : "5px solid #ffffff"
            }
            color={selectedItem === "my-dashboard" ? "#24a2f0" : "#bcbcbc"}
            fontWeight={selectedItem === "my-dashboard" ? "medium" : "normal"}
            leftIcon={<LuLayout />}
            onClick={() =>
              handleItemClick("my-dashboard", "my-dashboard/overview")
            }
            variant="sidebar"
          >
            My Dashboard
          </Button>
          <Button
            borderLeft={
              selectedItem === "my-team"
                ? "5px solid #24a2f0"
                : "5px solid #ffffff"
            }
            color={selectedItem === "my-team" ? "#24a2f0" : "#bcbcbc"}
            fontWeight={selectedItem === "my-team" ? "medium" : "normal"}
            leftIcon={<AiOutlineTeam />}
            onClick={() => handleItemClick("my-team", "my-team/overview")}
            variant="sidebar"
          >
            My Team
          </Button>
          <Button
            borderLeft={
              selectedItem === "our-company"
                ? "5px solid #24a2f0"
                : "5px solid #ffffff"
            }
            color={selectedItem === "our-company" ? "#24a2f0" : "#bcbcbc"}
            fontWeight={selectedItem === "our-company" ? "medium" : "normal"}
            leftIcon={<MdBusinessCenter />}
            onClick={() =>
              handleItemClick("our-company", "our-company/mission-and-vision")
            }
            variant="sidebar"
          >
            Our Company
          </Button>
        </Sidebar>
        <Flex
          flexDirection="column"
          flex={1}
          gap={4}
          marginLeft={4}
          marginTop={4}
        >
          <Outlet />
        </Flex>
      </Flex>
    </>
  );
};
