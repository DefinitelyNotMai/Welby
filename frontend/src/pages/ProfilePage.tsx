// lib
import {
  Avatar,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Icon,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import {
  FaChevronLeft,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaSave,
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
import { UserContext } from "../context/UserContext";
import { SelectCountry, SelectStrength } from "../components/Form/Select";
import { InterestCheckbox } from "../components/Form/InterestCheckbox";
import { GiCancel } from "react-icons/gi";
import axios from "axios";

type FormatOptions = {
  month: "long";
  day: "numeric";
  year: "numeric";
};

export const ProfilePage = () => {
  const [employeeData, setEmployeeData] = useState<Employee>(EMPLOYEE_DATA);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [realizedStrengths, setRealizedStrengths] = useState<Strength[]>([]);
  const [unrealizedStrengths, setUnrealizedStrengths] = useState<Strength[]>(
    [],
  );
  const [learnedBehaviors, setLearnedBehaviors] = useState<Strength[]>([]);
  const [modal, setModal] = useState<string>("");
  const [fetched, setFetched] = useState<boolean>(true);
  const [age, setAge] = useState<number>(0);
  const [edit, setEdit] = useState<boolean>(false);

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
          if (interests.length > 0) {
            setSelectedInterests(
              interests.map((interest) => interest.InterestId),
            );
          }
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
  }, [
    employeeData.CompanyId,
    fetched,
    navigate,
    toast,
    userContext.companyId,
    userId,
  ]);

  useEffect(() => {
    setAge(calculateAge(employeeData.Birthday) || 0);
  }, [employeeData.Birthday]);
  const updateEmployeeFields = (fields: Partial<Employee>) => {
    setEmployeeData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const formatBirthday = (birthdayString: string): string => {
    const options: FormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const birthdayDate = new Date(birthdayString);
    return birthdayDate.toLocaleDateString("en-US", options);
  };

  const formatEditedBirthday = (birthdayString: string): string => {
    const date = new Date(birthdayString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const calculateAge = (birthdayString: string): number | null => {
    const birthdayDate = new Date(birthdayString);
    const currentDate = new Date();
    const ageDiff = currentDate.getFullYear() - birthdayDate.getFullYear();

    // Adjust age if birthday hasn't occurred yet this year
    if (
      currentDate.getMonth() < birthdayDate.getMonth() ||
      (currentDate.getMonth() === birthdayDate.getMonth() &&
        currentDate.getDate() < birthdayDate.getDate())
    ) {
      return ageDiff - 1;
    }

    return ageDiff;
  };

  const handleRealizedStrengthChange = (index: number, strengthId: number) => {
    setRealizedStrengths((prevRealizedStrengths) => {
      const updatedRealizedStrengths = [...prevRealizedStrengths];
      updatedRealizedStrengths[index].StrengthId = strengthId;
      return updatedRealizedStrengths;
    });
  };

  const handleUnrealizedStrengthChange = (
    index: number,
    strengthId: number,
  ) => {
    setUnrealizedStrengths((prevUnrealizedStrengths) => {
      const updatedUnrealizedStrengths = [...prevUnrealizedStrengths];
      updatedUnrealizedStrengths[index].StrengthId = strengthId;
      return updatedUnrealizedStrengths;
    });
  };

  const handleLearnedBehaviorChange = (index: number, strengthId: number) => {
    setLearnedBehaviors((prevLearnedBehaviors) => {
      const updatedLearnedBehaviors = [...prevLearnedBehaviors];
      updatedLearnedBehaviors[index].StrengthId = strengthId;
      return updatedLearnedBehaviors;
    });
  };

  const handleEdit = () => {
    setEdit(true);
    toast({
      title: "INFO",
      description: "Entered Edit mode",
      position: "top",
      status: "info",
      isClosable: true,
      duration: 5000,
    });
  };

  const handleSave = () => {
    const updateEmployeeUrl = "https://localhost:44373/api/UpdateEmployee";

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const employee = {
      EmployeeId: employeeData.EmployeeId,
      ProfilePhoto: employeeData.ProfilePhoto,
      First_Name: employeeData.First_Name,
      Middle_Name: employeeData.Middle_Name,
      Last_Name: employeeData.Last_Name,
      Nickname: employeeData.Nickname,
      Email: employeeData.Email,
      Phone_Number: employeeData.Phone_Number,
      Address: employeeData.Address,
      Birthday: employeeData.Birthday,
      CompanyId: employeeData.CompanyId,
      CompanyPosition: employeeData.CompanyPosition,
      CompanyRole: employeeData.CompanyRole,
      CountryId: employeeData.CountryId,
      GenderId: employeeData.GenderId,
      TikTok: employeeData.TikTok,
      LinkedIn: employeeData.Linkedin,
      Facebook: employeeData.Facebook,
      Instagram: employeeData.Instagram,
      Work: employeeData.Work,
      Connect: employeeData.Connect,
      Support: employeeData.Support,
      Other_Notes: employeeData.Other_Notes,
      Active: true,
      FirstLogIn: true,
      Encoded_By: localStorage.getItem("userId"),
    };

    axios
      .patch(updateEmployeeUrl, employee, config)
      .then(() => {
        toast({
          title: "SUCCESS",
          description: "Successfully updated information.",
          position: "top",
          status: "success",
          isClosable: true,
          duration: 5000,
        });
      })
      .catch((error) => {
        console.error("An error occurred: ", error);
        toast({
          title: "ERROR",
          description: "Failed to update information.",
          position: "top",
          status: "error",
          isClosable: true,
          duration: 5000,
        });
      });
    handleClose();
  };

  const handleClose = () => {
    setFetched(true);
    setEdit(false);
  };

  if (employeeData.CompanyId === userContext.companyId) {
    if (!edit) {
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
              {userContext.role === "Company Admin" ||
              employeeData.Email === userContext.email ? (
                <Button
                  leftIcon={<Icon as={FaPencil} color="#24a2f0" />}
                  margin={4}
                  onClick={handleEdit}
                  variant="masterCrud"
                  width="10%"
                >
                  EDIT
                </Button>
              ) : (
                <></>
              )}
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
                      {formatBirthday(employeeData.Birthday)} (Age{" "}
                      {age !== 0 ? `${age} years old` : "unknown"})
                    </Text>
                  </Flex>
                  <Flex flexDirection="column">
                    <Flex
                      flex={1}
                      gap={8}
                      justifyContent="center"
                      marginTop={4}
                    >
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
        </>
      );
    } else {
      return (
        <>
          <DashboardHeader />
          <Flex backgroundColor="#f2f2f2" flex={1} flexDirection="column">
            <Flex justifyContent="space-between">
              <Button
                leftIcon={<Icon as={FaChevronLeft} />}
                margin={4}
                onClick={() => navigate("/dashboard/my-team")}
                variant="masterCrud"
                width="10%"
              >
                BACK
              </Button>
              <Flex justifyContent="flex-end" flex={1}>
                <Button
                  leftIcon={<Icon as={GiCancel} color="#d95555" />}
                  margin={4}
                  onClick={() => {
                    setEdit(!edit);
                  }}
                  variant="masterCrud"
                  width="10%"
                >
                  CANCEL
                </Button>
                <Button
                  leftIcon={<Icon as={FaSave} color="#24a2f0" />}
                  margin={4}
                  onClick={handleSave}
                  variant="masterCrud"
                  width="10%"
                >
                  SAVE
                </Button>
              </Flex>
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
                <Grid templateColumns="1fr 1fr 1.25fr" gap={4} width="full">
                  <Flex />
                  <Flex
                    flexDirection="column"
                    gap={1}
                    justifyContent="flex-end"
                    marginY={2}
                  >
                    <Input
                      id="employee-first-name"
                      name="employee-first-name"
                      onChange={(e) =>
                        updateEmployeeFields({ First_Name: e.target.value })
                      }
                      value={employeeData.First_Name}
                    />
                    <Input
                      id="employee-middle-name"
                      name="employee-middle-name"
                      onChange={(e) =>
                        updateEmployeeFields({ Middle_Name: e.target.value })
                      }
                      value={employeeData.Middle_Name}
                    />
                    <Input
                      id="employee-last-name"
                      name="employee-last-name"
                      onChange={(e) =>
                        updateEmployeeFields({ Last_Name: e.target.value })
                      }
                      value={employeeData.Last_Name}
                    />
                    <Input
                      id="employee-birthday"
                      name="employee-birthday"
                      onChange={(e) =>
                        updateEmployeeFields({ Birthday: e.target.value })
                      }
                      type="date"
                      value={formatEditedBirthday(employeeData.Birthday)}
                    />
                  </Flex>
                  <Flex flexDirection="column" marginY={4}>
                    <Flex
                      flex={1}
                      flexDirection="column"
                      gap={1}
                      marginRight={20}
                      marginY={4}
                      textAlign="right"
                    >
                      <Input
                        id="employee-email"
                        name="employee-email"
                        onChange={(e) =>
                          updateEmployeeFields({ Email: e.target.value })
                        }
                        value={employeeData.Email}
                      />
                      <SelectCountry
                        id="employee-country"
                        onChange={(e) =>
                          updateEmployeeFields({
                            CountryId: parseInt(e.target.value),
                          })
                        }
                        name="employee-country"
                        value={employeeData.CountryId}
                      />
                      <Input
                        id="employee-phone-number"
                        name="employee-phone-number"
                        onChange={(e) =>
                          updateEmployeeFields({ Phone_Number: e.target.value })
                        }
                        value={employeeData.Phone_Number}
                      />
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
                <Card border="2px solid #24a2f0" variant="profile" margin={4}>
                  <Grid templateColumns="1fr 1fr 1fr">
                    <Flex
                      alignItems="center"
                      borderRight="2px dashed #000000"
                      flex={1}
                      flexDirection="column"
                      gap={1}
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
                        <SelectStrength
                          key={index}
                          id={`employee-realized-strength-${index}`}
                          name={`employee-realized-strength-${index}`}
                          onChange={(e) =>
                            handleRealizedStrengthChange(
                              index,
                              parseInt(e.target.value),
                            )
                          }
                          value={realizedStrength.StrengthId}
                        />
                      ))}
                    </Flex>
                    <Flex
                      alignItems="center"
                      borderLeft="2px dashed #000000"
                      borderRight="2px dashed #000000"
                      flex={1}
                      flexDirection="column"
                      gap={1}
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
                        <SelectStrength
                          key={index}
                          id={`employee-unrealized-strength-${index}`}
                          name={`employee-unrealized-strength-${index}`}
                          onChange={(e) =>
                            handleUnrealizedStrengthChange(
                              index,
                              parseInt(e.target.value),
                            )
                          }
                          value={unrealizedStrength.StrengthId}
                        />
                      ))}
                    </Flex>
                    <Flex
                      borderLeft="2px dashed #000000"
                      alignItems="center"
                      flex={1}
                      flexDirection="column"
                      gap={1}
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
                        <SelectStrength
                          key={index}
                          id={`employee-learned-behavior-${index}`}
                          name={`employee-learned-behavior-${index}`}
                          onChange={(e) =>
                            handleLearnedBehaviorChange(
                              index,
                              parseInt(e.target.value),
                            )
                          }
                          value={learnedBehavior.StrengthId}
                        />
                      ))}
                    </Flex>
                  </Grid>
                </Card>
                <Heading marginLeft={8} marginTop={8} variant="profile">
                  {employeeData.Nickname}&apos;s Interests
                </Heading>
                <Card
                  alignItems="center"
                  border="2px solid #24a2f0"
                  variant="profile"
                  margin={4}
                >
                  <InterestCheckbox
                    onChange={(e) => {
                      setSelectedInterests(e);
                      console.log(selectedInterests);
                    }}
                    value={selectedInterests}
                  />
                </Card>
                <Heading marginLeft={8} marginTop={8} variant="profile">
                  {employeeData.Nickname}&apos;s Other Notes
                </Heading>
                <Card border="2px solid #24a2f0" variant="profile" margin={4}>
                  <Flex
                    alignItems="center"
                    flex={1}
                    flexDirection="column"
                    gap={4}
                    padding={4}
                  >
                    <Textarea
                      id="employee-other-notes"
                      name="employee-other-notes"
                      onChange={(e) =>
                        updateEmployeeFields({ Other_Notes: e.target.value })
                      }
                      value={employeeData.Other_Notes}
                    />
                  </Flex>
                </Card>
                <Grid gap={8} margin={4} templateColumns="1fr 1fr 1fr">
                  <Flex flexDirection="column" gap={2}>
                    <Heading textAlign="center" variant="profile">
                      How I work
                    </Heading>
                    <Card
                      border="2px solid #24a2f0"
                      height="20rem"
                      overflowY="auto"
                      padding={4}
                      textAlign="center"
                      variant="profile"
                    >
                      <Textarea
                        id="employee-work"
                        height="full"
                        name="employee-work"
                        onChange={(e) =>
                          updateEmployeeFields({ Work: e.target.value })
                        }
                        value={employeeData.Work}
                      />
                    </Card>
                  </Flex>
                  <Flex flexDirection="column" gap={2}>
                    <Heading textAlign="center" variant="profile">
                      How I connect and learn
                    </Heading>
                    <Card
                      border="2px solid #24a2f0"
                      height="20rem"
                      overflowY="auto"
                      padding={4}
                      textAlign="center"
                      variant="profile"
                    >
                      <Textarea
                        id="employee-connect"
                        height="full"
                        name="employee-connect"
                        onChange={(e) =>
                          updateEmployeeFields({ Connect: e.target.value })
                        }
                        value={employeeData.Connect}
                      />
                    </Card>
                  </Flex>
                  <Flex flexDirection="column" gap={2}>
                    <Heading textAlign="center" variant="profile">
                      What I need support in
                    </Heading>
                    <Card
                      border="2px solid #24a2f0"
                      height="20rem"
                      overflowY="auto"
                      padding={4}
                      textAlign="center"
                      variant="profile"
                    >
                      <Textarea
                        id="employee-support"
                        height="full"
                        name="employee-support"
                        onChange={(e) =>
                          updateEmployeeFields({ Support: e.target.value })
                        }
                        value={employeeData.Support}
                      />
                    </Card>
                  </Flex>
                </Grid>
              </Flex>
            </Flex>
          </Flex>
        </>
      );
    }
  } else {
    return (
      <>
        <DashboardHeader />
      </>
    );
  }
};
