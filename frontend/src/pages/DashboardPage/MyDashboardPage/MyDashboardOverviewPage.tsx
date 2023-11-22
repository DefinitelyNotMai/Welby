// lib
import { BsPerson } from "react-icons/bs";
import { Button, Flex, Grid, Modal } from "@chakra-ui/react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { GiHummingbird } from "react-icons/gi";
import { TbTargetArrow } from "react-icons/tb";
import { useEffect, useState } from "react";

// local
import { ChartDoughnut } from "../../../components/Charts/ChartDoughnut";
import { DAILY_CHECKIN_INITIAL_DATA } from "../../../data/initForm";
import { DailyCheckInFormData } from "../../../data/typesForm";
import { DailyCheckin } from "../../../components/Modal/DailyCheckin";
import { QuarterlyAssessment } from "../../../components/Modal/QuarterlyAssessment";
import { Section } from "../../../components/DataDisplay/Section";
import { WellBeingCard } from "../../../components/DataDisplay/WellBeingCard";

/*
 * NOTE: add a conditional to set Buttons for assessments to be disabled or not.
 */
export const MyDashboardOverviewPage = () => {
  document.title = "Overview | Welby";

  const [dailyCheckinData, setDailyCheckinData] =
    useState<DailyCheckInFormData>(DAILY_CHECKIN_INITIAL_DATA);

  const [modalOpen, setModalOpen] = useState<string>("");

  // NOTE: add calls for fetching dailycheckindata here
  useEffect(() => {
    // setDailyCheckinData(result)
  });

  return (
    <Flex flexDirection="column" gap={4} width="full" marginBottom={4}>
      <Section
        title="How is your well-being at work?"
        headerComponents={[
          <Button
            key={1}
            marginRight={16}
            onClick={() => setModalOpen("daily-checkin")}
          >
            Do Daily Check-In
          </Button>,
        ]}
      >
        <Flex flexDirection="row" justifyContent="space-between" height="full">
          <WellBeingCard
            icon={BsPerson}
            valueInt={dailyCheckinData.EnergyAtWork.int}
            valueString={dailyCheckinData.EnergyAtWork.value}
            title="Energy At Work"
          />
          <WellBeingCard
            icon={TbTargetArrow}
            valueInt={dailyCheckinData.FocusAtWork.int}
            valueString={dailyCheckinData.FocusAtWork.value}
            title="Focus At Work"
          />
          <WellBeingCard
            icon={FaRegThumbsUp}
            valueInt={dailyCheckinData.PositiveEmotions.int}
            valueString={dailyCheckinData.PositiveEmotions.value}
            title="Positive Emotion"
          />
          <WellBeingCard
            icon={FaRegThumbsDown}
            valueInt={dailyCheckinData.NegativeEmotions.int}
            valueString={dailyCheckinData.NegativeEmotions.value}
            title="Negative Emotion"
          />
        </Flex>
      </Section>
      <Section
        title="How are the pillars of your ability to thrive at work?"
        headerComponents={[
          <Button
            key={1}
            marginRight={16}
            onClick={() => setModalOpen("quarterly-assessment")}
          >
            Take Quarterly Assessment
          </Button>,
        ]}
      >
        HELLO
      </Section>
      {modalOpen === "daily-checkin" && (
        <DailyCheckin
          isOpen={modalOpen === "daily-checkin"}
          onClose={() => setModalOpen("")}
        />
      )}
      {modalOpen === "quarterly-assessment" && (
        <QuarterlyAssessment
          isOpen={modalOpen === "quarterly-assessment"}
          onClose={() => setModalOpen("")}
        />
      )}
    </Flex>
  );
};
