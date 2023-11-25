// lib
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

// local
import { Tab } from "../../../components/DataDisplay/Tab";
import { Button, Flex } from "@chakra-ui/react";

export const MyDashboardPage = () => {
  document.title = "My Dashboard | Welby";

  const navigate = useNavigate();
  const location = useLocation();

  const [selectedItem, setSelectedItem] = useState<string>("");

  const handleItemClick = (item: string, route: string) => {
    setSelectedItem(item);
    navigate(route);
  };

  useEffect(() => {
    setSelectedItem(
      location.pathname.replace("/dashboard/my-dashboard/", "").split("/")[0],
    );
  }, [location.pathname]);

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
      <Flex flex={1} marginTop={4}>
        <Outlet />
      </Flex>
    </>
  );
};
