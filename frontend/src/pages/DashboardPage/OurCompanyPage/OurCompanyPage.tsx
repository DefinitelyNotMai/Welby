// lib
import { Button, Flex } from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// local
import { Tab } from "../../../components/DataDisplay/Tab";

export const OurCompanyPage = () => {
  const [selectedItem, setSelectedItem] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();

  const handleItemClick = (item: string, route: string) => {
    setSelectedItem(item);
    navigate(route);
  };

  useEffect(() => {
    setSelectedItem(
      location.pathname.replace("/dashboard/our-company/", "").split("/")[0],
    );
  }, [location.pathname]);
  return (
    <>
      <Tab>
        <Button
          borderBottom={
            selectedItem === "mission-and-vision"
              ? "5px solid #24a2f0"
              : "5px solid #ffffff"
          }
          color={selectedItem === "mission-and-vision" ? "#24a2f0" : "#bcbcbc"}
          fontWeight={
            selectedItem === "mission-and-vision" ? "medium" : "normal"
          }
          onClick={() =>
            handleItemClick("mission-and-vision", "mission-and-vision")
          }
          variant="tab"
        >
          Mission and Vision
        </Button>
        <Button
          borderBottom={
            selectedItem === "company-goals"
              ? "5px solid #24a2f0"
              : "5px solid #ffffff"
          }
          color={selectedItem === "company-goals" ? "#24a2f0" : "#bcbcbc"}
          fontWeight={selectedItem === "company-goals" ? "medium" : "normal"}
          onClick={() => handleItemClick("company-goals", "company-goals")}
          variant="tab"
        >
          Company Goals
        </Button>
        <Button
          borderBottom={
            selectedItem === "core-values"
              ? "5px solid #24a2f0"
              : "5px solid #ffffff"
          }
          color={selectedItem === "core-values" ? "#24a2f0" : "#bcbcbc"}
          fontWeight={selectedItem === "core-values" ? "medium" : "normal"}
          onClick={() => handleItemClick("core-values", "core-values")}
          variant="tab"
        >
          Core Values
        </Button>
      </Tab>
      <Flex flex={1} marginTop={4}>
        <Outlet />
      </Flex>
    </>
  );
};
