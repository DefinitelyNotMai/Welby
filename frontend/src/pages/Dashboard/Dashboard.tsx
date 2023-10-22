import { Flex } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineTeam } from "react-icons/ai";
import { LuLayout } from "react-icons/lu";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import Sidebar from "../../components/Sidebar";
import SidebarItem from "../../components/SidebarItem";
import useUserContext from "../../hooks/useUserContext";

const Dashboard = () => {
  const { isLoggedIn } = useUserContext();
  const [selectedItem, setSelectedItem] = useState<string | null>();
  const { userId, setCompanyId } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userUrl = "https://localhost:44373/api/GetEmployee";
      let result = null;
      const param = {
        EmployeeId: userId,
      };
      axios
        .get(userUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: param,
        })
        .then((response) => {
          result = response.data;
          if (result != null) {
            if (result.length > 0) {
              setCompanyId(result[0].CompanyId);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchUserData();
    setSelectedItem(location.pathname.replace("/dashboard/", "").split("/")[0]);
  }, [location.pathname, userId, setCompanyId]);

  const handleItemClick = (itemName: string, route: string) => {
    setSelectedItem(itemName);
    navigate(route);
  };

  return (
    <Flex flexDirection="column" height="100vh">
      <DashboardHeader />
      <Flex backgroundColor="#f2f2f2" flexDirection="row" flex={1}>
        <Sidebar>
          <SidebarItem
            borderLeft={
              selectedItem === "my-dashboard"
                ? "5px solid #24a2f0"
                : "5px solid #ffffff"
            }
            color={selectedItem === "my-dashboard" ? "#89b4fa" : "#bcbcbc"}
            icon={LuLayout}
            onClick={() =>
              handleItemClick(
                "my-dashboard",
                "/dashboard/my-dashboard/overview",
              )
            }
          >
            My Dashboard
          </SidebarItem>
          <SidebarItem
            borderLeft={
              selectedItem === "my-team"
                ? "5px solid #24a2f0"
                : "5px solid #ffffff"
            }
            color={selectedItem === "my-team" ? "#89b4fa" : "#bcbcbc"}
            icon={AiOutlineTeam}
            onClick={() => handleItemClick("my-team", "/dashboard/my-team")}
          >
            My Team
          </SidebarItem>
          <SidebarItem
            borderLeft={
              selectedItem === "our-company"
                ? "5px solid #24a2f0"
                : "5px solid #ffffff"
            }
            color={selectedItem === "our-company" ? "#89b4fa" : "#bcbcbc"}
            icon={MdOutlineBusinessCenter}
            onClick={() =>
              handleItemClick(
                "our-company",
                "/dashboard/our-company/mission-and-vision",
              )
            }
          >
            Our Company
          </SidebarItem>
        </Sidebar>
        <Flex flex={1} marginLeft={4} marginTop={4}>
          <Outlet />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
