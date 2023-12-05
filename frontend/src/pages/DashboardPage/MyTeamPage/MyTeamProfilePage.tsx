import { useOutletContext } from "react-router-dom";
import { Section } from "../../../components/DataDisplay/Section";
import { useEffect, useState } from "react";
import { fetchData } from "../../../api/fetchData";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  Text,
} from "@chakra-ui/react";
import { RiErrorWarningLine } from "react-icons/ri";
import { EMPLOYEE_DATA, Employee } from "../../../data/employee";

type TeamMember = {
  CompanyId: string;
  EmployeeId: string;
  Nickname: string;
};

export const MyTeamProfilePage = () => {
  const [employeeData, setEmployeeData] = useState<Employee>(EMPLOYEE_DATA);
  const [selectedEmployee] = useOutletContext<TeamMember | undefined>();

  useEffect(() => {
    const fetchUserData = async () => {
      const employeeUrl = "https://localhost:44373/api/GetEmployees";

      try {
        const result = await fetchData(employeeUrl, {
          EmployeeId: selectedEmployee.EmployeeId,
        });
        if (result) {
          setEmployeeData(result[0]);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };
    fetchUserData();
  }, [selectedEmployee.EmployeeId]);

  if (employeeData.FirstLogIn === true) {
    return (
      <Section
        borderRadius="1rem 0 0 0"
        marginTop={4}
        title={`${employeeData.First_Name} ${employeeData.Middle_Name} ${employeeData.Last_Name}`}
        width="full"
      >
        <Flex flexDirection="column" gap={4} height="full">
          <Avatar
            alignSelf="center"
            boxShadow="xl"
            boxSize={48}
            src={employeeData.ProfilePhoto}
          />
          <Text
            alignSelf="center"
            color="black"
            fontSize="1.125rem"
            fontWeight="semibold"
          >
            {employeeData.Nickname}
          </Text>
          <Divider />
          <Flex
            alignSelf="center"
            flexDirection="column"
            fontWeight="medium"
            gap={4}
            width="50%"
          >
            <Text color="#bcbcbc">Personal Information</Text>
            <Grid gap={8} templateColumns="1fr 1fr" width="full">
              <Flex alignItems="flex-end" flexDirection="column" gap={2}>
                <Text color="#bcbcbc">First Name:</Text>
                <Text color="#bcbcbc">Middle Name:</Text>
                <Text color="#bcbcbc">Last Name:</Text>
                <Text color="#bcbcbc">Birthday:</Text>
                <Text color="#bcbcbc">Location:</Text>
              </Flex>
              <Flex alignItems="flex-start" flexDirection="column" gap={2}>
                <Text color="#34313a">{employeeData.First_Name}</Text>
                <Text color="#34313a">{employeeData.Middle_Name}</Text>
                <Text color="#34313a">{employeeData.Last_Name}</Text>
                <Text color="#34313a">{employeeData.Birthday}</Text>
                <Text color="#34313a">
                  {employeeData.Address}, {employeeData.CountryDisplay}
                </Text>
              </Flex>
            </Grid>
          </Flex>
          <Divider />
          <Flex
            alignSelf="center"
            flexDirection="column"
            fontWeight="medium"
            gap={4}
            width="50%"
          >
            <Text color="#bcbcbc">Contact Information</Text>
            <Grid gap={8} templateColumns="1fr 1fr" width="full">
              <Flex alignItems="flex-end" flexDirection="column" gap={2}>
                <Text color="#bcbcbc">Phone Number:</Text>
                <Text color="#bcbcbc">Email:</Text>
              </Flex>
              <Flex alignItems="flex-start" flexDirection="column" gap={2}>
                <Text color="#34313a">{employeeData.Phone_Number}</Text>
                <Text color="#34313a">{employeeData.Email}</Text>
              </Flex>
            </Grid>
          </Flex>
          <Divider />
          <Flex
            alignSelf="center"
            flexDirection="column"
            fontWeight="medium"
            gap={4}
            width="50%"
          >
            <Text color="#bcbcbc">Socials</Text>
            <Grid gap={8} templateColumns="1fr 1fr" width="full">
              <Flex alignItems="flex-end" flexDirection="column" gap={2}>
                <Text color="#bcbcbc">LinkedIn:</Text>
                <Text color="#bcbcbc">Facebook:</Text>
                <Text color="#bcbcbc">TikTok:</Text>
                <Text color="#bcbcbc">Instagram:</Text>
              </Flex>
              <Flex alignItems="flex-start" flexDirection="column" gap={2}>
                <Text color="#34313a">{employeeData.Linkedin}</Text>
                <Text color="#34313a">{employeeData.Facebook}</Text>
                <Text color="#34313a">{employeeData.TikTok}</Text>
                <Text color="#34313a">{employeeData.Instagram}</Text>
              </Flex>
            </Grid>
          </Flex>
          <Button alignSelf="center" marginTop={8} width="25%">
            See Full Profile
          </Button>
        </Flex>
      </Section>
    );
  } else {
    return (
      <Section
        borderRadius="1rem 0 0 0"
        marginTop={4}
        title="Employee Profile"
        width="full"
      >
        <Flex
          alignItems="center"
          flexDirection="column"
          height="full"
          justifyContent="center"
        >
          <Icon as={RiErrorWarningLine} boxSize="64" color="#24a2f0" />
          <Text color="#34313a" fontSize="1.25rem" fontWeight={700}>
            Employee has not logged in yet
          </Text>
        </Flex>
      </Section>
    );
  }
};
