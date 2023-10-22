import { Flex, Grid, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { CiDumbbell } from "react-icons/ci";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { GiHummingbird, GiMeshNetwork } from "react-icons/gi";
import { LuHeartHandshake } from "react-icons/lu";
import { MdPersonOutline } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";
import CustomDoughnut from "../../../components/Charts/CustomDoughnut";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import DashboardSection from "../../../components/Dashboard/DashboardSection";
import WellBeingCard from "../../../components/Dashboard/WellBeingCard";
import DailyCheckIn from "../../../components/Modals/DailyCheckIn";
import QuarterlyAssessment from "../../../components/Modals/QuarterlyAssessment";

const MyDashboardOverview = () => {
  document.title = "Overview | Welby";

  const [isDailyCheckInOpen, setIsDailyCheckInOpen] = useState(false);
  const [isQuarterlyAssessmentOpen, setIsQuarterlyAssessmentOpen] =
    useState(false);

  const [autonomyData, setAutonomyData] = useState(0);
  const [focusAtWorkData, setFocusAtWorkData] = useState(0);
  const [positiveEmotionData, setPositiveEmotionData] = useState(0);
  const [negativeEmotionData, setNegativeEmotionData] = useState(0);
  const [autonomyPillarData, setAutonomyPillarData] = useState(0);
  const [competencePillarData, setCompetencePillarData] = useState(0);
  const [connectionPillarData, setConnectionPillarData] = useState(0);

  const toggleDailyCheckIn = () => {
    setIsDailyCheckInOpen(!isDailyCheckInOpen);
  };

  const toggleQuarterlyAssessment = () => {
    setIsQuarterlyAssessmentOpen(!isQuarterlyAssessmentOpen);
  };

  return (
    <Flex flexDirection="column" width="full">
      <DashboardSection
        marginBottom={4}
        title="How is your well-being at work?"
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
      >
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          paddingY={8}
          paddingX={16}
        >
          <WellBeingCard icon={BsPerson} dataValue={80} title="Autonomy" />
          <WellBeingCard
            icon={TbTargetArrow}
            dataValue={70}
            title="Focus At Work"
          />
          <WellBeingCard
            icon={FaRegThumbsUp}
            dataValue={55}
            title="Positive Emotion"
          />
          <WellBeingCard
            icon={FaRegThumbsDown}
            dataValue={25}
            title="Negative Emotion"
          />
        </Flex>
      </DashboardSection>
      <DashboardSection
        borderRadius="1rem 0 0 0"
        headerComponents={[
          <CustomButton
            key={1}
            onClick={toggleQuarterlyAssessment}
            type="button"
            width={["100%"]}
          >
            <CustomText>Take Quarterly Assessment</CustomText>
          </CustomButton>,
          <Icon
            as={AiOutlineQuestionCircle}
            boxSize={8}
            color="#24a2f0"
            key={2}
            marginRight={32}
          />,
        ]}
        title="How are the pillars of your ability to thrive at this work?"
      >
        <Grid templateRows="1fr 1fr">
          <Flex flexDirection="row" justifyContent="space-between">
            <CustomDoughnut
              dataValue={27}
              icon={GiHummingbird}
              title="Autonomy"
            />
            <CustomDoughnut
              dataValue={64}
              icon={CiDumbbell}
              title="Competence"
            />
            <CustomDoughnut
              dataValue={42}
              icon={GiMeshNetwork}
              title="Relatedness"
            />
          </Flex>
          <Flex flexDirection="row" justifyContent="space-between">
            <CustomDoughnut
              dataValue={89}
              icon={LuHeartHandshake}
              title="Engagement"
            />
            <CustomDoughnut
              dataValue={18}
              icon={FaRegThumbsUp}
              title="Commitment"
            />
            <CustomDoughnut
              dataValue={76}
              icon={MdPersonOutline}
              title="Motivation"
            />
          </Flex>
        </Grid>
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

export default MyDashboardOverview;
