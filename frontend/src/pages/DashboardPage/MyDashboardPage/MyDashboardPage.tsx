// lib
import { Button, Flex } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

// local
import { Tab } from "../../../components/DataDisplay/Tab";

export const MyDashboardPage = () => {
  document.title = "My Dashboard | Welby";
  const [selectedItem, setSelectedItem] = useState<string>("overview");

  const navigate = useNavigate();
  const handleItemClick = (item: string, route: string) => {
    setSelectedItem(item);
    navigate(route);
  };

  return (
    <>
      <Tab>
        <Button
          borderBottom={
            selectedItem === "overview"
              ? "5px solid #24a2f0"
              : "5px solid #ffffff"
          }
          color={selectedItem === "overview" ? "#24a2f0" : "#bcbcbc"}
          fontWeight={selectedItem === "overview" ? "medium" : "normal"}
          onClick={() => handleItemClick("overview", "overview")}
          variant="tab"
        >
          Overview
        </Button>
        <Button
          borderBottom={
            selectedItem === "well-being"
              ? "5px solid #24a2f0"
              : "5px solid #ffffff"
          }
          color={selectedItem === "well-being" ? "#24a2f0" : "#bcbcbc"}
          fontWeight={selectedItem === "well-being" ? "medium" : "normal"}
          onClick={() => handleItemClick("well-being", "well-being")}
          variant="tab"
        >
          Well-Being
        </Button>
      </Tab>
      <Flex flex={1}>
        <Outlet />
      </Flex>
    </>
  );
};
