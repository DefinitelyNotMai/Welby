// lib
import {
  Avatar,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Icon,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  FaChevronLeft,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa";

// local
import { DashboardHeader } from "../components/Dashboard/DashboardHeader";
import { useContext, useEffect, useState } from "react";
import { EMPLOYEE_DATA, Employee } from "../data/employee";
import { fetchData } from "../api/fetchData";
import { Interest } from "../data/interest";
import { Strength } from "../data/strength";
import { useNavigate, useParams } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import { EmployeeUpdate } from "../components/Modal/AdminView/EmployeeModal";
import { UserContext } from "../context/UserContext";

export const ProfilePage = () => {
  const [employeeData, setEmployeeData] = useState<Employee>(EMPLOYEE_DATA);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [realizedStrengths, setRealizedStrengths] = useState<Strength[]>([]);
  const [unrealizedStrengths, setUnrealizedStrengths] = useState<Strength[]>(
    [],
  );
  const [learnedBehaviors, setLearnedBehaviors] = useState<Strength[]>([]);
  const [modal, setModal] = useState<string>("");
  const [fetched, setFetched] = useState<boolean>(true);

  const { userId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const userContext = useContext(UserContext);

  const employeeUrl = "https://localhost:44373/api/GetEmployees";
  const interestUrl = "https://localhost:44373/api/GetEmployeeInterest";
  const realizedStrengthUrl =
    "https://localhost:44373/api/GetEmployeeRealizedStrengths";
  const unrealizedStrengthUrl =
    "https://localhost:44373/api/GetEmployeeUnrealizedStrengths";
  const learnedBehaviorUrl =
    "https://localhost:44373/api/GetEmployeeLearnedBehaviors";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await fetchData(employeeUrl, {
          EmployeeId: userId,
          CompanyId: userContext.companyId,
        });
        if (result && result.length > 0) {
          setEmployeeData(result[0]);
        } else {
          toast({
            description:
              "You are not allowed to view employees from other companies",
            title: "ERROR",
            duration: 5000,
            isClosable: true,
            position: "top",
            status: "error",
          });
          navigate("/dashboard/my-dashboard/overview");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    const fetchInterests = async () => {
      try {
        const result = await fetchData(interestUrl, {
          EmployeeInterestId: 0,
          EmployeeId: userId,
          InterestId: 0,
          Active: true,
        });
        if (result) {
          setInterests(result);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    const fetchRealizedStrengths = async () => {
      try {
        const result = await fetchData(realizedStrengthUrl, {
          RealizedStrengthsId: 0,
          EmployeeId: userId,
          StrengthId: 0,
          Active: true,
        });
        if (result) {
          setRealizedStrengths(result);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    const fetchUnrealizedStrengths = async () => {
      try {
        const result = await fetchData(unrealizedStrengthUrl, {
          UnrealizedStrengthsId: 0,
          EmployeeId: userId,
          StrengthId: 0,
          Active: true,
        });
        if (result) {
          setUnrealizedStrengths(result);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    const fetchLearnedBehaviors = async () => {
      try {
        const result = await fetchData(learnedBehaviorUrl, {
          LearnedBehaviorsId: 0,
          EmployeeId: userId,
          StrengthId: 0,
          Active: true,
        });
        if (result) {
          setLearnedBehaviors(result);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    if (fetched) {
      fetchUserData();
      fetchInterests();
      fetchRealizedStrengths();
      fetchUnrealizedStrengths();
      fetchLearnedBehaviors();
      setFetched(false);
    }
  }, [employeeData.CompanyId, userContext.companyId, userId, fetched]);

  const updateEmployeeFields = (fields: Partial<Employee>) => {
    setEmployeeData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const handleClose = () => {
    setFetched(true);
    setModal("");
  };

  if (employeeData.CompanyId === userContext.companyId) {
    return (
      <>
        <DashboardHeader />
        <Flex backgroundColor="#f2f2f2" flex={1} flexDirection="column">
          <Flex justifyContent="space-between">
            <Button
              leftIcon={<Icon as={FaChevronLeft} color="#24a2f0" />}
              margin={4}
              onClick={() => navigate("/dashboard/my-team")}
              variant="masterCrud"
              width="10%"
            >
              BACK
            </Button>
            <Button
              leftIcon={<Icon as={FaPencil} color="#24a2f0" />}
              margin={4}
              onClick={() => setModal("edit")}
              variant="masterCrud"
              width="10%"
            >
              EDIT
            </Button>
          </Flex>
          <Flex
            alignSelf="center"
            backgroundColor="#ffffff"
            border="1px solid #ebebeb"
            borderRadius="0.5em"
            boxShadow="2xl"
            flex={1}
            flexDirection="column"
            width="60%"
          >
            <Flex
              backgroundColor="#24a2f0"
              borderTopLeftRadius="0.5em"
              borderTopRightRadius="0.5em"
              position="relative"
              height="12em"
              flexDirection="row"
            >
              <Grid templateColumns="1fr 1fr 1.25fr" width="full">
                <Flex />
                <Flex
                  flexDirection="column"
                  justifyContent="flex-end"
                  marginBottom={4}
                >
                  <Text color="#000000" fontSize="2rem" fontWeight="bold">
                    {employeeData.EmployeeFullName}
                  </Text>
                  <Text color="#000000" fontSize="0.875rem">
                    {employeeData.Birthday} (Age years old)
                  </Text>
                </Flex>
                <Flex flexDirection="column">
                  <Flex flex={1} gap={8} justifyContent="center" marginTop={4}>
                    <Icon
                      as={FaLinkedin}
                      backgroundColor="#d9d9d9"
                      borderRadius="100%"
                      boxSize={12}
                      color="#000000"
                      padding={1}
                    />
                    <Icon
                      as={FaFacebook}
                      backgroundColor="#d9d9d9"
                      borderRadius="100%"
                      boxSize={12}
                      color="#000000"
                      padding={1}
                    />
                    <Icon
                      as={FaInstagram}
                      backgroundColor="#d9d9d9"
                      borderRadius="100%"
                      boxSize={12}
                      color="#000000"
                      padding={1}
                    />
                    <Icon
                      as={FaTiktok}
                      backgroundColor="#d9d9d9"
                      borderRadius="100%"
                      boxSize={12}
                      color="#000000"
                      padding={1}
                    />
                  </Flex>
                  <Flex
                    flex={1}
                    flexDirection="column"
                    marginRight={20}
                    textAlign="right"
                  >
                    <Text color="#000000">{employeeData.Email}</Text>
                    <Text color="#000000">{employeeData.CountryDisplay}</Text>
                    <Text color="#000000">{employeeData.Phone_Number}</Text>
                  </Flex>
                </Flex>
              </Grid>
              <Avatar
                boxSize={52}
                marginTop={16}
                marginLeft={28}
                position="absolute"
                src={employeeData.ProfilePhoto}
              />
            </Flex>
            <Flex
              alignSelf="center"
              flex={1}
              flexDirection="column"
              marginTop="6em"
              width="90%"
            >
              <Heading marginLeft={8} variant="profile">
                {employeeData.Nickname}&apos;s Strengths
              </Heading>
              <Card variant="profile" margin={4}>
                <Grid templateColumns="1fr 1fr 1fr">
                  <Flex
                    alignItems="center"
                    borderRight="2px dashed #000000"
                    flex={1}
                    flexDirection="column"
                    gap={4}
                    paddingY={4}
                  >
                    <Text
                      variant="profile"
                      fontSize="1.125rem"
                      fontWeight="semibold"
                    >
                      Realized Strengths
                    </Text>
                    {realizedStrengths.map((realizedStrength, index) => (
                      <Text key={index} variant="profile">
                        {realizedStrength.RealizedStrengthDisplay}
                      </Text>
                    ))}
                  </Flex>
                  <Flex
                    alignItems="center"
                    borderLeft="2px dashed #000000"
                    borderRight="2px dashed #000000"
                    flex={1}
                    flexDirection="column"
                    gap={4}
                    paddingY={4}
                  >
                    <Text
                      variant="profile"
                      fontSize="1.125rem"
                      fontWeight="semibold"
                    >
                      Unrealized Strengths
                    </Text>
                    {unrealizedStrengths.map((unrealizedStrength, index) => (
                      <Text key={index} variant="profile">
                        {unrealizedStrength.UnrealizedStrengthDisplay}
                      </Text>
                    ))}
                  </Flex>
                  <Flex
                    borderLeft="2px dashed #000000"
                    alignItems="center"
                    flex={1}
                    flexDirection="column"
                    gap={4}
                    paddingY={4}
                  >
                    <Text
                      variant="profile"
                      fontSize="1.125rem"
                      fontWeight="semibold"
                    >
                      Learned Behaviors
                    </Text>
                    {learnedBehaviors.map((learnedBehavior, index) => (
                      <Text key={index} variant="profile">
                        {learnedBehavior.LearnedBehaviorDisplay}
                      </Text>
                    ))}
                  </Flex>
                </Grid>
              </Card>
              <Heading marginLeft={8} marginTop={8} variant="profile">
                {employeeData.Nickname}&apos;s Interests
              </Heading>
              <Card variant="profile" margin={4}>
                <Grid templateColumns="1fr 1fr 1fr">
                  {interests.map((interest, index) => (
                    <Flex
                      key={index}
                      alignItems="center"
                      flexDirection="column"
                      gap={4}
                      paddingY={4}
                    >
                      <Text variant="profile">
                        {interest.InterestNameDisplay}
                      </Text>
                    </Flex>
                  ))}
                </Grid>
              </Card>
              <Heading marginLeft={8} marginTop={8} variant="profile">
                {employeeData.Nickname}&apos;s Other Notes
              </Heading>
              <Card variant="profile" margin={4}>
                <Flex
                  alignItems="center"
                  flex={1}
                  flexDirection="column"
                  gap={4}
                  padding={4}
                >
                  {employeeData.Other_Notes}
                </Flex>
              </Card>
              <Grid gap={8} margin={4} templateColumns="1fr 1fr 1fr">
                <Flex flexDirection="column" gap={2}>
                  <Heading textAlign="center" variant="profile">
                    How I work
                  </Heading>
                  <Card
                    height="20rem"
                    overflowY="auto"
                    padding={4}
                    textAlign="center"
                    variant="profile"
                  >
                    <Text variant="profile">{employeeData.Work}</Text>
                  </Card>
                </Flex>
                <Flex flexDirection="column" gap={2}>
                  <Heading textAlign="center" variant="profile">
                    How I connect and learn
                  </Heading>
                  <Card
                    height="20rem"
                    overflowY="auto"
                    padding={4}
                    textAlign="center"
                    variant="profile"
                  >
                    <Text variant="profile">{employeeData.Connect}</Text>
                  </Card>
                </Flex>
                <Flex flexDirection="column" gap={2}>
                  <Heading textAlign="center" variant="profile">
                    What I need support in
                  </Heading>
                  <Card
                    height="20rem"
                    overflowY="auto"
                    padding={4}
                    textAlign="center"
                    variant="profile"
                  >
                    <Text variant="profile">{employeeData.Support}</Text>
                  </Card>
                </Flex>
              </Grid>
            </Flex>
          </Flex>
        </Flex>
        {modal === "edit" && (
          <EmployeeUpdate
            isOpen={modal === "edit"}
            onClose={handleClose}
            updateFields={updateEmployeeFields}
            {...employeeData}
          />
        )}
      </>
    );
  } else {
    return (
      <>
        <DashboardHeader />
      </>
    );
  }
};
