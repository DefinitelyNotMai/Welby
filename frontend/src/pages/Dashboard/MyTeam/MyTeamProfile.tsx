import {
  Center,
  Divider,
  Flex,
  Grid,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import DashboardSection from "../../../components/Dashboard/DashboardSection";

const MyTeamProfile = () => {
  const selectedUserId = useOutletContext();

  const [profilePhoto, setProfilePhoto] = useState();
  const [nickname, setNickname] = useState();

  const [firstName, setFirstName] = useState();
  const [middleName, setMiddleName] = useState();
  const [lastName, setLastName] = useState();
  const [birthdate, setBirthdate] = useState();
  const [address, setAddress] = useState();

  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();

  const [linkedIn, setLinkedIn] = useState();
  const [facebook, setFacebook] = useState();
  const [instagram, setInstagram] = useState();
  const [tiktok, setTiktok] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      const userUrl = "https://localhost:44373/api/GetEmployee";
      let result = null;
      const param = {
        EmployeeId: selectedUserId,
      };
      axios
        .get(userUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: param,
        })
        .then((response) => {
          result = response.data;
          console.log(response.data);
          if (result != null) {
            if (result.length > 0) {
              setNickname(result[0].Nickname);
              setFirstName(result[0].First_Name);
              setMiddleName(result[0].Middle_Name);
              setLastName(result[0].Last_Name);
              setProfilePhoto(result[0].ProfilePhoto);
              setBirthdate(result[0].Birthday);
              setAddress(result[0].Address);
              setPhoneNumber(result[0].Phone_Number);
              setEmail(result[0].Email);
              setLinkedIn(result[0].Linkedin);
              setFacebook(result[0].Facebook);
              setInstagram(result[0].Instagram);
              setTiktok(result[0].TikTok);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchUserData();
  }, [selectedUserId]);

  return (
    <Flex flexDirection="column" width="full">
      <DashboardSection
        borderRadius="1rem 0 0 0"
        title={`${firstName} ${middleName} ${lastName}`}
        marginBottom={0}
      >
        <Flex flexDirection="column">
          <Center display="flex" flexDirection="column">
            <Image
              borderRadius="full"
              boxSize={48}
              boxShadow="lg"
              src={profilePhoto}
            />
            <Text
              color="#34313a"
              fontFamily="Montserrat"
              fontWeight="600"
              fontSize="18"
              my="4"
            >
              {nickname}
            </Text>
          </Center>
          <Divider />
          <Text
            color="#bcbcbc"
            fontFamily="Montserrat"
            fontWeight="500"
            fontSize="16"
            my="4"
          >
            Personal Information
          </Text>
          <Grid templateColumns="1fr 2fr" mb="4" gap="8">
            <VStack display="flex" alignItems="flex-end">
              <Text
                color="#bcbcbc"
                fontFamily="Montserrat"
                fontWeight="500"
                fontSize="16"
              >
                Name:
              </Text>
              <Text
                color="#bcbcbc"
                fontFamily="Montserrat"
                fontWeight="500"
                fontSize="16"
              >
                Birthday:
              </Text>
              <Text
                color="#bcbcbc"
                fontFamily="Montserrat"
                fontWeight="500"
                fontSize="16"
              >
                Address:
              </Text>
              <Text
                color="#bcbcbc"
                fontFamily="Montserrat"
                fontWeight="500"
                fontSize="16"
              >
                Location:
              </Text>
            </VStack>
            <VStack display="flex" alignItems="flex-start">
              <Text fontFamily="Montserrat" fontWeight="500" fontSize="16">
                {firstName} - {middleName} - {lastName}
              </Text>
              <Text fontFamily="Montserrat" fontWeight="500" fontSize="16">
                {birthdate}
              </Text>
              <Text fontFamily="Montserrat" fontWeight="500" fontSize="16">
                {address}
              </Text>
              <Text fontFamily="Montserrat" fontWeight="500" fontSize="16">
                City, Country
              </Text>
            </VStack>
          </Grid>
          <Divider />
          <Text
            color="#bcbcbc"
            fontFamily="Montserrat"
            fontWeight="500"
            fontSize="16"
            my="4"
          >
            Contact Information
          </Text>
          <Grid templateColumns="1fr 2fr" mb="4" gap="8">
            <VStack display="flex" alignItems="flex-end">
              <Text
                color="#bcbcbc"
                fontFamily="Montserrat"
                fontWeight="500"
                fontSize="16"
              >
                Phone Number:
              </Text>
              <Text
                color="#bcbcbc"
                fontFamily="Montserrat"
                fontWeight="500"
                fontSize="16"
              >
                Email:
              </Text>
            </VStack>
            <VStack display="flex" alignItems="flex-start">
              <Text fontFamily="Montserrat" fontWeight="500" fontSize="16">
                {phoneNumber}
              </Text>
              <Text fontFamily="Montserrat" fontWeight="500" fontSize="16">
                {email}
              </Text>
            </VStack>
          </Grid>
          <Divider />
          <Text
            color="#bcbcbc"
            fontFamily="Montserrat"
            fontWeight="500"
            fontSize="16"
            my="4"
          >
            Socials
          </Text>
          <Grid templateColumns="1fr 2fr" mb="4" gap="8">
            <VStack display="flex" alignItems="flex-end">
              <Text
                color="#bcbcbc"
                fontFamily="Montserrat"
                fontWeight="500"
                fontSize="16"
              >
                LinkedIn:
              </Text>
              <Text
                color="#bcbcbc"
                fontFamily="Montserrat"
                fontWeight="500"
                fontSize="16"
              >
                Facebook:
              </Text>
              <Text
                color="#bcbcbc"
                fontFamily="Montserrat"
                fontWeight="500"
                fontSize="16"
              >
                TikTok:
              </Text>
              <Text
                color="#bcbcbc"
                fontFamily="Montserrat"
                fontWeight="500"
                fontSize="16"
              >
                Instagram:
              </Text>
            </VStack>
            <VStack display="flex" alignItems="flex-start">
              <Text fontFamily="Montserrat" fontWeight="500" fontSize="16">
                https://www.linkedin.com/{linkedIn}
              </Text>
              <Text fontFamily="Montserrat" fontWeight="500" fontSize="16">
                https://www.facebook.com/{facebook}
              </Text>
              <Text fontFamily="Montserrat" fontWeight="500" fontSize="16">
                https://www.tiktok.com/{tiktok}
              </Text>
              <Text fontFamily="Montserrat" fontWeight="500" fontSize="16">
                https://www.instagram.com/{instagram}
              </Text>
            </VStack>
          </Grid>
          <Center display="flex" flexDirection="column" my="4">
            <CustomButton onClick={() => console.log("e")} type="button">
              <CustomText fontWeight="medium">See Full Profile</CustomText>
            </CustomButton>
          </Center>
        </Flex>
      </DashboardSection>
    </Flex>
  );
};

export default MyTeamProfile;
