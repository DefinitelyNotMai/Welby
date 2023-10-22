import { Flex } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DashboardTab from "../../../components/Dashboard/DashboardTab";
import DashboardTabItem from "../../../components/Dashboard/DashboardTabItem";

const MyDashboard = () => {
  const [selectedItem, setSelectedItem] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();

  const getSelectedItemFromPath = useCallback(() => {
    return location.pathname
      .replace("/dashboard/my-dashboard/", "")
      .split("/")[0];
  }, [location.pathname]);

  useEffect(() => {
    setSelectedItem(getSelectedItemFromPath());
  }, [location.pathname, getSelectedItemFromPath]);

  const handleItemClick = (itemName: string, route: string) => {
    setSelectedItem(itemName);
    navigate(route);
  };

  return (
    <Flex flexDirection="column" width="full">
      <DashboardTab>
        <DashboardTabItem
          borderBottom={selectedItem === "overview" ? "5px solid #24a2f0" : ""}
          color={selectedItem === "overview" ? "#89b4fa" : "#bcbcbc"}
          onClick={() =>
            handleItemClick("overview", "/dashboard/my-dashboard/overview")
          }
        >
          Overview
        </DashboardTabItem>
        <DashboardTabItem
          borderBottom={
            selectedItem === "well-being" ? "5px solid #24a2f0" : ""
          }
          color={selectedItem === "well-being" ? "#89b4fa" : "#bcbcbc"}
          onClick={() =>
            handleItemClick("well-being", "/dashboard/my-dashboard/well-being")
          }
        >
          Well-being
        </DashboardTabItem>
      </DashboardTab>
      <Flex flex={1} marginTop={4}>
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default MyDashboard;
