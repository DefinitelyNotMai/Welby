import {
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  Icon,
  Image,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import CustomText from "../../../components/CustomText";
import DashboardSection from "../../../components/Dashboard/DashboardSection";
import EditMission from "../../../components/Modals/EditMission";
import EditVision from "../../../components/Modals/EditVision";

const OurCompanyMissionAndVision = () => {
  const [isEditMissionOpen, setIsEditMissionOpen] = useState(false);
  const [isEditVisionOpen, setIsEditVisionOpen] = useState(false);

  const toggleEditMission = () => {
    setIsEditMissionOpen(!isEditMissionOpen);
  };

  const toggleEditVision = () => {
    setIsEditVisionOpen(!isEditVisionOpen);
  };

  return (
    <Grid templateColumns="1fr 2fr" gap={4} width="full">
      <DashboardSection title="Profile" borderRadius="1rem 1rem 0 0">
        <Flex flexDirection="column">
          <Center
            display="flex"
            flexDirection="column"
            fontSize="lg"
            fontWeight="bold"
            gap={4}
            marginBottom={8}
          >
            <Image borderRadius="full" boxSize={48} boxShadow="lg" />
            <CustomText color="#000000">Welby, Inc.</CustomText>
          </Center>
          <Divider />
          <Grid
            templateColumns="1fr 2fr"
            display="flex"
            fontSize="md"
            justifyContent="center"
            marginY={4}
            gap={8}
          >
            <VStack display="flex" alignItems="flex-end">
              <CustomText color="#bcbcbc">Headquarters</CustomText>
              <CustomText color="#bcbcbc">Company Size</CustomText>
            </VStack>
            <VStack display="flex" alignItems="flex-start">
              <CustomText color="#000000">Iloilo City, Philippines</CustomText>
              <CustomText color="#000000">5 - 10 employees</CustomText>
            </VStack>
          </Grid>
          <Divider />
          <Box marginLeft={4} marginTop={4}>
            <CustomText color="#bcbcbc">Company Size</CustomText>
          </Box>
          <Grid
            templateColumns="1fr 2fr"
            display="flex"
            justifyContent="center"
            marginY={4}
            gap={8}
          >
            <VStack display="flex" alignItems="flex-end">
              <CustomText color="#bcbcbc">Phone</CustomText>
              <CustomText color="#bcbcbc">Email Address</CustomText>
              <CustomText color="#bcbcbc">Website</CustomText>
            </VStack>
            <VStack display="flex" alignItems="flex-start">
              <CustomText color="#000000">+639692097239</CustomText>
              <CustomText color="#000000">hello@welbyatwork.com</CustomText>
              <CustomText color="#000000">welbyatwork.com</CustomText>
            </VStack>
          </Grid>
          <Divider />
          <Box marginLeft={4} marginTop={4}>
            <CustomText color="#bcbcbc">Custom Information</CustomText>
          </Box>
          <Grid
            templateColumns="1fr 2fr"
            display="flex"
            fontSize="md"
            justifyContent="center"
            marginY={4}
            gap={8}
          >
            <VStack display="flex" alignItems="flex-end">
              <CustomText color="#bcbcbc">Industry</CustomText>
              <CustomText color="#bcbcbc">Type</CustomText>
              <CustomText color="#bcbcbc">Founded</CustomText>
            </VStack>
            <VStack display="flex" alignItems="flex-start">
              <CustomText color="#000000">Business Consultant</CustomText>
              <CustomText color="#000000">Private Company</CustomText>
              <CustomText color="#000000">February 2021</CustomText>
            </VStack>
          </Grid>
        </Flex>
      </DashboardSection>
      <Grid templateRows="1fr 2fr" gap={4}>
        <DashboardSection
          title="Mission"
          borderRadius="1rem 0 0 1rem"
          headerComponents={[
            <Icon
              as={BsPencilSquare}
              boxSize={4}
              color="#24a2f0"
              cursor="pointer"
              key={1}
              onClick={toggleEditMission}
            />,
            <CustomText key={2}>Edit</CustomText>,
          ]}
        >
          Mission statement here.
        </DashboardSection>
        <DashboardSection
          title="Vision"
          borderRadius="1rem 0 0 0"
          headerComponents={[
            <Icon
              as={BsPencilSquare}
              boxSize={4}
              color="#24a2f0"
              cursor="pointer"
              key={1}
              onClick={toggleEditVision}
            />,
            <CustomText key={2}>Edit</CustomText>,
          ]}
        >
          Vision statement here.
        </DashboardSection>
      </Grid>
      {isEditMissionOpen && (
        <EditMission isOpen={isEditMissionOpen} onClose={toggleEditMission} />
      )}
      {isEditVisionOpen && (
        <EditVision isOpen={isEditVisionOpen} onClose={toggleEditVision} />
      )}
    </Grid>
  );
};

export default OurCompanyMissionAndVision;
