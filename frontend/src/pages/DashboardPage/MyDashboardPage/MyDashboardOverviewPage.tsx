// lib
import { BsPerson } from "react-icons/bs";
import { Button, Flex, Grid, Modal } from "@chakra-ui/react";
import {
  FaDumbbell,
  FaEye,
  FaHands,
  FaHandshake,
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaWalking,
} from "react-icons/fa";
import { GiHummingbird } from "react-icons/gi";
import { IoMdGitNetwork } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";
import { useEffect, useState } from "react";

// local
import { ChartDoughnut } from "../../../components/Charts/ChartDoughnut";
import {
  DAILY_CHECKIN_INITIAL_DATA,
  TISE_INITIAL_DATA,
} from "../../../data/initForm";
import { DailyCheckInFormData, TISE } from "../../../data/typesForm";
import { DailyCheckin } from "../../../components/Modal/DailyCheckin";
import { QuarterlyAssessment } from "../../../components/Modal/QuarterlyAssessment";
import { Section } from "../../../components/DataDisplay/Section";
import { WellBeingCard } from "../../../components/DataDisplay/WellBeingCard";
import { MdPeople } from "react-icons/md";

/*
 * NOTE: add a conditional to set Buttons for assessments to be disabled or not.
 */
export const MyDashboardOverviewPage = () => {
  document.title = "Overview | Welby";

  const [dailyCheckinData, setDailyCheckinData] =
    useState<DailyCheckInFormData>(DAILY_CHECKIN_INITIAL_DATA);
  const [tiseData, setTiseData] = useState<TISE>(TISE_INITIAL_DATA);

  const [modalOpen, setModalOpen] = useState<string>("");

  // NOTE: add calls for fetching dailycheckindata and tise values here
  useEffect(() => {
    // setDailyCheckinData(result)
    // setTiseData(result)
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
        <Grid gap={4} templateRows="1fr 1fr 1fr">
          <Flex
            flexDirection="row"
            gap={4}
            height="full"
            justifyContent="center"
          >
            <ChartDoughnut
              title="Social Mutualism"
              icon={GiHummingbird}
              dataValue={tiseData.Factor_1}
            />
            <ChartDoughnut
              title="Sense of Being Valued"
              icon={FaDumbbell}
              dataValue={tiseData.Factor_2}
            />
            <ChartDoughnut
              title="Nurtured Psychological Needs"
              icon={IoMdGitNetwork}
              dataValue={tiseData.Factor_3}
            />
          </Flex>
          <Flex
            flexDirection="row"
            gap={4}
            height="full"
            justifyContent="center"
          >
            <ChartDoughnut
              title="Positive Work Relationships"
              icon={MdPeople}
              dataValue={tiseData.Factor_4}
            />
            <ChartDoughnut
              title="Subjective Well Being"
              icon={FaHands}
              dataValue={tiseData.Factor_5}
            />
            <ChartDoughnut
              title="Organizational Commitment"
              icon={FaHandshake}
              dataValue={tiseData.Factor_6}
            />
          </Flex>
          <Flex
            flexDirection="row"
            gap={4}
            height="full"
            justifyContent="center"
          >
            <ChartDoughnut
              title="Intent To Quit"
              icon={FaWalking}
              dataValue={tiseData.Factor_7}
            />
            <ChartDoughnut
              title="Presenteeism"
              icon={FaEye}
              dataValue={tiseData.Factor_8}
            />
          </Flex>
        </Grid>
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
