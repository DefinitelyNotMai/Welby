import { Flex } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DashboardTab from "../../../components/Dashboard/DashboardTab";
import DashboardTabItem from "../../../components/Dashboard/DashboardTabItem";

const OurCompany = () => {
  const [selectedItem, setSelectedItem] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();

  const getSelectedItemFromPath = useCallback(() => {
    return location.pathname
      .replace("/dashboard/our-company/", "")
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
          borderBottom={
            selectedItem === "mission-and-vision" ? "5px solid #24a2f0" : ""
          }
          color={selectedItem === "mission-and-vision" ? "#89b4fa" : "#bcbcbc"}
          onClick={() =>
            handleItemClick(
              "mission-and-vision",
              "/dashboard/our-company/mission-and-vision",
            )
          }
        >
          Mission & Vision
        </DashboardTabItem>
        <DashboardTabItem
          borderBottom={
            selectedItem === "company-goals" ? "5px solid #24a2f0" : ""
          }
          color={selectedItem === "company-goals" ? "#89b4fa" : "#bcbcbc"}
          onClick={() =>
            handleItemClick(
              "company-goals",
              "/dashboard/our-company/company-goals",
            )
          }
        >
          Company Goals
        </DashboardTabItem>
        <DashboardTabItem
          borderBottom={
            selectedItem === "core-values" ? "5px solid #24a2f0" : ""
          }
          color={selectedItem === "core-values" ? "#89b4fa" : "#bcbcbc"}
          onClick={() =>
            handleItemClick("core-values", "/dashboard/our-company/core-values")
          }
        >
          Core Values
        </DashboardTabItem>
      </DashboardTab>
      <Flex flex={1} marginTop={4}>
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default OurCompany;
