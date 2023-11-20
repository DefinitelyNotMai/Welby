// lib
import { Box, Button, Flex, Grid, Modal } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";

// local
import { Tab } from "../../../components/DataDisplay/Tab";
import { Section } from "../../../components/DataDisplay/Section";
import { fetchData } from "../../../api/fetchData";
import { UserContext } from "../../../context/UserContext";
import { AddEmployee } from "../../../components/Modal/AddEmployee";

type TeamMember = {
  CompanyId: string;
  EmployeeId: string;
  Nickname: string;
};

export const MyTeamPage = () => {
  const [selectedItem, setSelectedItem] = useState<string>("overview");
  const [employees, setEmployees] = useState<TeamMember[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<
    TeamMember | undefined
  >(undefined);
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState<boolean>(false);

  const userContext = useContext(UserContext);
  const companyId = userContext.companyId;
  const email = userContext.email;
  const phone = userContext.phone;
  const navigate = useNavigate();

  const handleItemClick = (item: string, route: string) => {
    setSelectedItem(item);
    navigate(route);
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const employeesUrl = "https://localhost:44373/api/GetAllEmployees";

        const data = await fetchData(employeesUrl, {
          Email: email,
          Phone_Number: phone,
          CompanyId: companyId,
        });
        setEmployees(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMembers();
  }, [companyId, email, employees, phone]);

  return (
    <Grid templateColumns="1fr 2fr" flex={1} gap={4}>
      <Flex flexDirection="column">
        <Section
          borderRadius="1rem 1rem 0 0"
          title="My Team"
          height="full"
          headerComponents={[
            <Button
              key={1}
              onClick={() => setIsAddEmployeeOpen(!isAddEmployeeOpen)}
              variant="section-secondary"
            >
              Add Employee
              <Box
                as={FiPlusCircle}
                boxSize={6}
                color="#24a2f0"
                marginLeft={2}
              />
            </Button>,
          ]}
        >
          <Flex flexDirection="column">
            {employees.map((member) => (
              <Button
                bg={
                  selectedEmployee?.EmployeeId === member.EmployeeId
                    ? "#24a2f0"
                    : "#cccccc"
                }
                key={member.EmployeeId}
                onClick={() => {
                  if (selectedEmployee?.EmployeeId === member.EmployeeId) {
                    setSelectedEmployee(undefined);
                  } else {
                    setSelectedEmployee(member);
                  }
                }}
                variant="list"
              >
                {member.Nickname}
              </Button>
            ))}
          </Flex>
        </Section>
      </Flex>
      <Flex flexDirection="column">
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
              selectedItem === "member-profile"
                ? "5px solid #24a2f0"
                : "5px solid #ffffff"
            }
            color={selectedItem === "member-profile" ? "#24a2f0" : "#bcbcbc"}
            fontWeight={selectedItem === "member-profile" ? "medium" : "normal"}
            isDisabled={selectedEmployee === undefined ? true : false}
            onClick={() => handleItemClick("member-profile", "member-profile")}
            variant="tab"
          >
            Member Profile
          </Button>
        </Tab>
        <Flex flex={1}>
          <Outlet context={[selectedEmployee]} />
        </Flex>
      </Flex>
      {isAddEmployeeOpen && (
        <AddEmployee
          isOpen={isAddEmployeeOpen}
          onClose={() => setIsAddEmployeeOpen(!isAddEmployeeOpen)}
        />
      )}
    </Grid>
  );
};
