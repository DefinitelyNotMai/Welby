import { Accordion, AccordionItem, Button, Icon } from "@chakra-ui/react";
import { Sidebar } from "../../components/DataDisplay/Sidebar";
import { AccordionButton } from "../../components/Disclosure/Accordion";
import { useState } from "react";
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

export const AdminViewPage = () => {
  document.title = "Admin View | Welby";

  const [selectedItem, setSelectedItem] = useState<string>("");

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <Sidebar>
      <Accordion allowMultiple defaultIndex={[0]}>
        <AccordionItem>
          <AccordionButton
            buttonName="Business and Organization"
            icon={FaRegBuilding}
          >
            <Button
              borderLeftColor={
                selectedItem === "Companies" ? "#24a2f0" : "#ffffff"
              }
              variant="sidebar"
              color={selectedItem === "Companies" ? "#24a2f0" : "#bcbcbc"}
              fontWeight={selectedItem === "Companies" ? "bold" : "normal"}
              leftIcon={<HiBuildingOffice2 />}
              width="100%"
              onClick={() => handleItemClick("Companies")}
            >
              Companies
            </Button>
            <Button
              borderLeftColor={
                selectedItem === "Employees" ? "#24a2f0" : "#ffffff"
              }
              variant="sidebar"
              color={selectedItem === "Employees" ? "#24a2f0" : "#bcbcbc"}
              fontWeight={selectedItem === "Employees" ? "bold" : "normal"}
              leftIcon={<GiOrganigram />}
              width="100%"
              onClick={() => handleItemClick("Employees")}
            >
              Employees
            </Button>
          </AccordionButton>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton buttonName="Company Attributes" icon={FaBriefcase}>
            <Button
              borderLeftColor={selectedItem === "Goals" ? "#24a2f0" : "#ffffff"}
              variant="sidebar"
              color={selectedItem === "Goals" ? "#24a2f0" : "#bcbcbc"}
              fontWeight={selectedItem === "Goals" ? "bold" : "normal"}
              leftIcon={<FaFlagCheckered />}
              width="100%"
              onClick={() => handleItemClick("Goals")}
            >
              Goals
            </Button>
            <Button
              borderLeftColor={
                selectedItem === "IndustryTypes" ? "#24a2f0" : "#ffffff"
              }
              variant="sidebar"
              color={selectedItem === "IndustryTypes" ? "#24a2f0" : "#bcbcbc"}
              fontWeight={selectedItem === "IndustryTypes" ? "bold" : "normal"}
              leftIcon={<GiFactory />}
              width="100%"
              onClick={() => handleItemClick("IndustryTypes")}
            >
              Industry Types
            </Button>
            <Button
              borderLeftColor={
                selectedItem === "Values" ? "#24a2f0" : "#ffffff"
              }
              variant="sidebar"
              color={selectedItem === "Values" ? "#24a2f0" : "#bcbcbc"}
              fontWeight={selectedItem === "Values" ? "bold" : "normal"}
              leftIcon={<FaScaleBalanced />}
              width="100%"
              onClick={() => handleItemClick("Values")}
            >
              Values
            </Button>
          </AccordionButton>
        </AccordionItem>
      </Accordion>
    </Sidebar>
  );
};
// <AccordionItem></AccordionItem>
// <AccordionItem></AccordionItem>
// <AccordionItem></AccordionItem>
