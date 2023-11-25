// lib
import { BsPerson } from "react-icons/bs";
import { Button, Flex, Grid } from "@chakra-ui/react";
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
import { MdPeople } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";
import { useEffect, useState } from "react";

// local
import { ChartDoughnut } from "../../../components/Charts/ChartDoughnut";
import { DAILYCHECKIN_DATA, DailyCheckIn } from "../../../data/dailyCheckIn";
import { DailyCheckin } from "../../../components/Modal/DailyCheckin";
import { QuarterlyAssessment } from "../../../components/Modal/QuarterlyAssessment";
import { Section } from "../../../components/DataDisplay/Section";
import { TISE, TISE_DATA } from "../../../data/tise";
import { WellBeingCard } from "../../../components/DataDisplay/WellBeingCard";

export const MyDashboardOverviewPage = () => {
  document.title = "Dashboard Overview | Welby";

  const [tiseData, setTiseData] = useState<TISE>(TISE_DATA);
  const [dailyCheckInData, setDailyCheckInData] =
    useState<DailyCheckIn>(DAILYCHECKIN_DATA);
  const [modal, setModal] = useState<string>("");

  // NOTE: calls for fetching daily checkin and tise data goes here
  useEffect(() => {
    // setDailyCheckInData(result)
    // setTiseData(result)
    //}, [dailyCheckInData, tiseData]);
  });

  return (
    <Flex flexDirection="column" gap={4} width="full" marginBottom={4}>
      <Section
        title="How is your well-being at work?"
        headerComponents={[
          <Button
            key={1}
            marginRight={16}
            onClick={() => setModal("daily-checkin")}
          >
            Do Daily Check-In
          </Button>,
        ]}
      >
        <Flex flexDirection="row" justifyContent="space-between" height="full">
          <WellBeingCard
            icon={BsPerson}
            onClick={() =>
              alert(
                "TEST: onClick this will display result of this well-being factor of the day.",
              )
            }
            title="Energy At Work"
            valueInt={dailyCheckInData.EnergyAtWork_int}
            valueString={dailyCheckInData.EnergyAtWork_value}
          />
          <WellBeingCard
            icon={TbTargetArrow}
            onClick={() =>
              alert(
                "TEST: onClick this will display result of this well-being factor of the day.",
              )
            }
            title="Focus At Work"
            valueInt={dailyCheckInData.FocusAtWork_int}
            valueString={dailyCheckInData.FocusAtWork_value}
          />
          <WellBeingCard
            icon={FaRegThumbsUp}
            onClick={() =>
              alert(
                "TEST: onClick this will display result of this well-being factor of the day.",
              )
            }
            title="Positive Emotions"
            valueInt={dailyCheckInData.PositiveEmotions_int}
            valueString={dailyCheckInData.PositiveEmotions_value}
          />
          <WellBeingCard
            icon={FaRegThumbsDown}
            onClick={() =>
              alert(
                "TEST: onClick this will display result of this well-being factor of the day.",
              )
            }
            title="Negative Emotions"
            valueInt={dailyCheckInData.NegativeEmotions_int}
            valueString={dailyCheckInData.NegativeEmotions_value}
          />
        </Flex>
      </Section>
      <Section
        title="How are the pillars of your ability to thrive at work?"
        headerComponents={[
          <Button
            key={1}
            marginRight={16}
            onClick={() => setModal("quarterly-assessment")}
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
      {modal === "daily-checkin" && (
        <DailyCheckin
          isOpen={modal === "daily-checkin"}
          onClose={() => setModal("")}
        />
      )}
      {modal === "quarterly-assessment" && (
        <QuarterlyAssessment
          isOpen={modal === "quarterly-assessment"}
          onClose={() => setModal("")}
        />
      )}
    </Flex>
  );
};
