// lib
import { Accordion, AccordionItem, Button, Flex } from "@chakra-ui/react";
import { AiOutlineFolder } from "react-icons/ai";
import { FaRegBuilding } from "react-icons/fa";
import {
  FaBook,
  FaBriefcase,
  FaCity,
  FaEarthAsia,
  FaFlagCheckered,
  FaGenderless,
  FaLock,
  FaMap,
  FaPersonWalking,
  FaScaleBalanced,
} from "react-icons/fa6";
import { GiFactory, GiMuscleUp, GiOrganigram } from "react-icons/gi";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// local
import { AccordionButton } from "../../components/Disclosure/Accordion";
import { AdminViewHeader } from "../../components/AdminView/AdminViewHeader";
import { Sidebar } from "../../components/DataDisplay/Sidebar";

export const AdminViewPage = () => {
  document.title = "Admin View | Welby";

  const navigate = useNavigate();
  const location = useLocation();

  const [selectedItem, setSelectedItem] = useState<string>("");

  useEffect(() => {
    setSelectedItem(
      location.pathname.replace("/admin-view/", "").split("/")[0],
    );
  }, [location.pathname]);

  const handleItemClick = (item: string, path: string) => {
    setSelectedItem(item);
    navigate(path);
  };

  return (
    <>
      <AdminViewHeader />
      <Flex flexDirection="row" flex={1}>
        <Sidebar paddingTop={0}>
          <Accordion allowMultiple defaultIndex={[0]}>
            <AccordionItem>
              <AccordionButton
                buttonName="Business and Organization"
                icon={FaRegBuilding}
              >
                <Button
                  borderLeftColor={
                    selectedItem === "companies" ? "#24a2f0" : "#ffffff"
                  }
                  color={selectedItem === "companies" ? "#24a2f0" : "#bcbcbc"}
                  fontWeight={selectedItem === "companies" ? "bold" : "normal"}
                  leftIcon={<HiBuildingOffice2 />}
                  onClick={() => handleItemClick("companies", "companies")}
                  variant="sidebar"
                  width="100%"
                >
                  Companies
                </Button>
                <Button
                  borderLeftColor={
                    selectedItem === "employees" ? "#24a2f0" : "#ffffff"
                  }
                  variant="sidebar"
                  color={selectedItem === "employees" ? "#24a2f0" : "#bcbcbc"}
                  fontWeight={selectedItem === "employees" ? "bold" : "normal"}
                  leftIcon={<GiOrganigram />}
                  width="100%"
                  onClick={() => handleItemClick("employees", "employees")}
                >
                  Employees
                </Button>
              </AccordionButton>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton
                buttonName="Company Attributes"
                icon={FaBriefcase}
              >
                <Button
                  borderLeftColor={
                    selectedItem === "goals" ? "#24a2f0" : "#ffffff"
                  }
                  color={selectedItem === "goals" ? "#24a2f0" : "#bcbcbc"}
                  fontWeight={selectedItem === "goals" ? "bold" : "normal"}
                  leftIcon={<FaFlagCheckered />}
                  onClick={() => handleItemClick("goals", "goals")}
                  variant="sidebar"
                  width="100%"
                >
                  Goals
                </Button>
                <Button
                  borderLeftColor={
                    selectedItem === "industry-types" ? "#24a2f0" : "#ffffff"
                  }
                  color={
                    selectedItem === "industry-types" ? "#24a2f0" : "#bcbcbc"
                  }
                  fontWeight={
                    selectedItem === "industry-types" ? "bold" : "normal"
                  }
                  leftIcon={<GiFactory />}
                  onClick={() =>
                    handleItemClick("industry-types", "industry-types")
                  }
                  variant="sidebar"
                  width="100%"
                >
                  Industry Types
                </Button>
                <Button
                  borderLeftColor={
                    selectedItem === "values" ? "#24a2f0" : "#ffffff"
                  }
                  color={selectedItem === "values" ? "#24a2f0" : "#bcbcbc"}
                  fontWeight={selectedItem === "values" ? "bold" : "normal"}
                  leftIcon={<FaScaleBalanced />}
                  onClick={() => handleItemClick("values", "values")}
                  variant="sidebar"
                  width="100%"
                >
                  Values
                </Button>
              </AccordionButton>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton buttonName="Geographical" icon={FaEarthAsia}>
                <Button
                  borderLeftColor={
                    selectedItem === "countries" ? "#24a2f0" : "#ffffff"
                  }
                  color={selectedItem === "countries" ? "#24a2f0" : "#bcbcbc"}
                  fontWeight={selectedItem === "countries" ? "bold" : "normal"}
                  leftIcon={<FaMap />}
                  onClick={() => handleItemClick("countries", "countries")}
                  variant="sidebar"
                >
                  Countries
                </Button>
              </AccordionButton>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton buttonName="Personal" icon={FaPersonWalking}>
                <Button
                  borderLeftColor={
                    selectedItem === "genders" ? "#24a2f0" : "#ffffff"
                  }
                  color={selectedItem === "genders" ? "#24a2f0" : "#bcbcbc"}
                  fontWeight={selectedItem === "genders" ? "bold" : "normal"}
                  leftIcon={<FaGenderless />}
                  onClick={() => handleItemClick("genders", "genders")}
                  variant="sidebar"
                >
                  Genders
                </Button>
                <Button
                  borderLeftColor={
                    selectedItem === "interests" ? "#24a2f0" : "#ffffff"
                  }
                  color={selectedItem === "interests" ? "#24a2f0" : "#bcbcbc"}
                  fontWeight={selectedItem === "interests" ? "bold" : "normal"}
                  leftIcon={<FaBook />}
                  onClick={() => handleItemClick("interests", "interests")}
                  variant="sidebar"
                >
                  Interests
                </Button>
                <Button
                  borderLeftColor={
                    selectedItem === "strengths" ? "#24a2f0" : "#ffffff"
                  }
                  color={selectedItem === "strengths" ? "#24a2f0" : "#bcbcbc"}
                  fontWeight={selectedItem === "strengths" ? "bold" : "normal"}
                  leftIcon={<GiMuscleUp />}
                  onClick={() => handleItemClick("strengths", "strengths")}
                  variant="sidebar"
                >
                  Strengths
                </Button>
              </AccordionButton>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton buttonName="OWS" icon={FaLock}>
                <Button
                  borderLeftColor={
                    selectedItem === "groups" ? "#24a2f0" : "#ffffff"
                  }
                  color={selectedItem === "groups" ? "#24a2f0" : "#bcbcbc"}
                  fontWeight={selectedItem === "groups" ? "bold" : "normal"}
                  leftIcon={<AiOutlineFolder />}
                  onClick={() => handleItemClick("groups", "groups")}
                  variant="sidebar"
                >
                  Groups
                </Button>
                <Button
                  borderLeftColor={
                    selectedItem === "users" ? "#24a2f0" : "#ffffff"
                  }
                  color={selectedItem === "users" ? "#24a2f0" : "#bcbcbc"}
                  fontWeight={selectedItem === "users" ? "bold" : "normal"}
                  leftIcon={<AiOutlineFolder />}
                  onClick={() => handleItemClick("users", "users")}
                  variant="sidebar"
                >
                  Users
                </Button>
                <Button
                  borderLeftColor={
                    selectedItem === "user-to-group" ? "#24a2f0" : "#ffffff"
                  }
                  color={
                    selectedItem === "user-to-group" ? "#24a2f0" : "#bcbcbc"
                  }
                  fontWeight={
                    selectedItem === "user-to-group" ? "bold" : "normal"
                  }
                  leftIcon={<AiOutlineFolder />}
                  onClick={() =>
                    handleItemClick("user-to-group", "user-to-group")
                  }
                  variant="sidebar"
                >
                  User To Group
                </Button>
              </AccordionButton>
            </AccordionItem>
          </Accordion>
        </Sidebar>
        <Flex
          backgroundColor="#f2f2f2"
          flexDirection="column"
          flex={1}
          overflow="hidden"
        >
          <Outlet />
        </Flex>
      </Flex>
    </>
  );
};
