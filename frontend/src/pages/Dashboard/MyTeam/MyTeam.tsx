import { Flex, Grid, Icon } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CustomText from "../../../components/CustomText";
//import AddEmployee from '../../../components/Dashboard/Modal/AddEmployee';
import DashboardSection from "../../../components/Dashboard/DashboardSection";
import DashboardTab from "../../../components/Dashboard/DashboardTab";
import DashboardTabItem from "../../../components/Dashboard/DashboardTabItem";
import TeamMembersList from "../../../components/Dashboard/TeamMembersList";
import AddEmployee from "../../../components/Modals/AddEmployee";
//import Label from '../../../components/Label';

type EmployeeFormData = {
  Email: string;
  Password: string;
  Role: string;
};

const EMPLOYEE_DATA: EmployeeFormData = {
  Email: "",
  Password: "",
  Role: "",
};

const MyTeam = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [employeeData, setEmployeeData] =
    useState<EmployeeFormData>(EMPLOYEE_DATA);

  const location = useLocation();
  const navigate = useNavigate();

  const getSelectedItemFromPath = useCallback(() => {
    return location.pathname.replace("/dashboard/my-team/", "").split("/")[0];
  }, [location.pathname]);

  useEffect(() => {
    setSelectedItem(getSelectedItemFromPath());
  }, [location.pathname, getSelectedItemFromPath]);

  const handleItemClick = (itemName: string, route: string) => {
    setSelectedItem(itemName);
    navigate(route);
  };

  const updateEmployeeData = (fields: Partial<EmployeeFormData>) => {
    setEmployeeData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const toggleAddEmployee = () => {
    setIsAddEmployeeOpen(!isAddEmployeeOpen);
  };

  const handleMemberSelect = (userId: string) => {
    setSelectedUserId(userId);
    navigate("/dashboard/my-team/profile");
  };

  return (
    <Flex flexDirection="column" width="full">
      <Grid templateColumns="1fr 2fr" height="full">
        <DashboardSection
          borderRadius="1rem 1rem 0 0"
          headerComponents={[
            <Flex key={1} flexDirection="row" alignItems="center">
              <CustomText color="#000000">Add Employee</CustomText>
              <Icon
                as={AiOutlinePlusCircle}
                boxSize={8}
                color="#24a2f0"
                cursor="pointer"
                marginLeft={4}
                onClick={toggleAddEmployee}
              />
            </Flex>,
          ]}
          title="Team"
        >
          <TeamMembersList handleMemberSelect={handleMemberSelect} />
        </DashboardSection>
        <Flex flexDirection="column" marginLeft={4}>
          <DashboardTab>
            <DashboardTabItem
              borderBottom={
                selectedItem === "overview" ? "5px solid #24a2f0" : ""
              }
              color={selectedItem === "overview" ? "#89b4fa" : "#bcbcbc"}
              onClick={() =>
                handleItemClick("overview", "/dashboard/my-team/overview")
              }
            >
              Overview
            </DashboardTabItem>
            {selectedUserId && (
              <DashboardTabItem
                borderBottom={
                  selectedItem === "profile" ? "5px solid #24a2f0" : ""
                }
                color={selectedItem === "profile" ? "#89b4fa" : "#bcbcbc"}
                onClick={() =>
                  handleItemClick("profile", "/dashboard/my-team/profile")
                }
              >
                Profile
              </DashboardTabItem>
            )}
          </DashboardTab>
          <Flex flex={1} marginTop={4}>
            <Outlet context={selectedUserId} />
          </Flex>
        </Flex>
        {isAddEmployeeOpen && (
          <AddEmployee
            isOpen={isAddEmployeeOpen}
            onClose={toggleAddEmployee}
            {...employeeData}
            updateFields={updateEmployeeData}
          />
        )}
      </Grid>
    </Flex>
  );
};

export default MyTeam;
