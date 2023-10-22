import { Flex, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import CustomBar from "../../../components/Charts/CustomBar";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import DashboardSection from "../../../components/Dashboard/DashboardSection";
import DailyCheckIn from "../../../components/Modals/DailyCheckIn";
import QuarterlyAssessment from "../../../components/Modals/QuarterlyAssessment";

const MyDashboardWellBeing = () => {
  document.title = "Well-being | Welby";

  const [isDailyCheckInOpen, setIsDailyCheckInOpen] = useState(false);
  const [isQuarterlyAssessmentOpen, setIsQuarterlyAssessmentOpen] =
    useState(false);

  const toggleDailyCheckIn = () => {
    setIsDailyCheckInOpen(!isDailyCheckInOpen);
  };

  const toggleQuarterlyAssessment = () => {
    setIsQuarterlyAssessmentOpen(!isQuarterlyAssessmentOpen);
  };

  return (
    <Flex flexDirection="column" width="full">
      <DashboardSection
        headerComponents={[
          <CustomButton
            key={1}
            onClick={toggleDailyCheckIn}
            type="button"
            width={["100%"]}
          >
            <CustomText>Do Daily Check-in</CustomText>
          </CustomButton>,
          <Icon
            as={AiOutlineQuestionCircle}
            boxSize={8}
            color="#24a2f0"
            key={2}
            marginRight={32}
          />,
        ]}
        marginBottom={4}
        title="Well-being Journey Details"
      >
        <CustomBar />
      </DashboardSection>
      <DashboardSection
        headerComponents={[
          <CustomButton
            key={1}
            onClick={toggleQuarterlyAssessment}
            type="button"
            width={["100%"]}
          >
            <CustomText>Take Welby Assessment</CustomText>
          </CustomButton>,
          <Icon
            as={AiOutlineQuestionCircle}
            boxSize={8}
            color="#24a2f0"
            key={2}
            marginRight={32}
          />,
        ]}
        marginBottom={4}
        title="The Pillars of Your Ability to Thrive"
      >
        <Flex flexDirection="column">
          <Flex
            flexDirection="row"
            justifyContent="space-between"
            marginBottom={4}
          ></Flex>
          <Flex flexDirection="row" justifyContent="space-between"></Flex>
        </Flex>
      </DashboardSection>
      {isDailyCheckInOpen && (
        <DailyCheckIn
          isOpen={isDailyCheckInOpen}
          onClose={toggleDailyCheckIn}
        />
      )}
      {isQuarterlyAssessmentOpen && (
        <QuarterlyAssessment
          isOpen={isQuarterlyAssessmentOpen}
          onClose={toggleQuarterlyAssessment}
        />
      )}
    </Flex>
  );
};

export default MyDashboardWellBeing;
