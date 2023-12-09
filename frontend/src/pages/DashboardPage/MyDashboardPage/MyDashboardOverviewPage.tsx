// lib
import { BsPerson } from "react-icons/bs";
import { Button, Flex, Grid, Icon, Text } from "@chakra-ui/react";
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
import { useContext, useEffect, useState } from "react";

// local
import { ChartDoughnut } from "../../../components/Charts/ChartDoughnut";
import { DAILYCHECKIN_DATA, DailyCheckIn } from "../../../data/dailyCheckIn";
import { DailyCheckin } from "../../../components/Modal/DailyCheckin";
import { QuarterlyAssessment } from "../../../components/Modal/QuarterlyAssessment";
import { Section } from "../../../components/DataDisplay/Section";
import { TISE, TISE_DATA } from "../../../data/tise";
import { WellBeingCard } from "../../../components/DataDisplay/WellBeingCard";
import { fetchData } from "../../../api/fetchData";
import { UserContext } from "../../../context/UserContext";
import { DailyCheckInResult } from "../../../components/Modal/DailyCheckin/DailyCheckInResult";
import { RiErrorWarningLine } from "react-icons/ri";
import { getDateToday } from "../../../api/getDates";

export const MyDashboardOverviewPage = () => {
  document.title = "Dashboard Overview | Welby";

  const [tiseData, setTiseData] = useState<TISE>(TISE_DATA);
  const [dailyCheckInData, setDailyCheckInData] =
    useState<DailyCheckIn>(DAILYCHECKIN_DATA);
  const [modal, setModal] = useState<string>("");
  const [checkInTaken, setCheckInTaken] = useState<boolean>(true);
  const [tiseTaken, setTiseTaken] = useState<boolean>(true);
  const [stat, setStat] = useState<boolean>(true);

  // NOTE: calls for fetching daily checkin and tise data goes here
  const userId = localStorage.getItem("userId") || 0;
  const dailyCheckInUrl = "https://localhost:44373/api/GetAllDailyCheckIn";
  const tiseUrl = "https://localhost:44373/api/GetAllTise";
  const userContext = useContext(UserContext);

  useEffect(() => {
    const checkIfCheckInTaken = async () => {
      const data = await fetchData(dailyCheckInUrl, {
        DailyCheckInId: 0,
        EmployeeId: userId,
        CompanyId: userContext.companyId,
        Active: true,
        DateFrom: getDateToday(),
        DateTo: getDateToday(),
      });
      if (data.length > 0) {
        setCheckInTaken(true);
        setDailyCheckInData(data[0]);
        console.log(data[0]);
      } else {
        setCheckInTaken(false);
      }
      //console.log(data);
      //console.log(checkInTaken);
    };

    checkIfCheckInTaken();
    if (stat) {
      setStat(false);
      checkIfCheckInTaken();
    }
  }, [stat, userContext.companyId, userId]);

  useEffect(() => {
    const checkIfTiseTaken = async () => {
      const tdata = await fetchData(tiseUrl, {
        TiseId: 0,
        EmployeeId: userId,
        CompanyId: userContext.companyId,
        Active: true,
        DateFrom: getDateToday(),
        DateTo: getDateToday(),
      });
      if (tdata.length > 0) {
        setTiseTaken(true);
        setTiseData(tdata[0]);
        console.log(tdata[0]);
      } else {
        setTiseTaken(false);
      }
    };
    checkIfTiseTaken();
  }, [userContext.companyId, userId]);

  console.log(tiseData);
  return (
    <Flex flexDirection="column" gap={4} width="full" marginBottom={4}>
      <Section
        title="How is your well-being at work?"
        headerComponents={[
          <Button
            key={1}
            marginRight={16}
            onClick={() =>
              checkInTaken === true
                ? setModal("checkin-results")
                : setModal("daily-checkin")
            }
          >
            {checkInTaken === false ? "Do Daily Check In" : "Show Results"}
          </Button>,
        ]}
      >
        {checkInTaken === true ? (
          <Flex
            flexDirection="row"
            justifyContent="space-between"
            height="full"
          >
            <WellBeingCard
              icon={BsPerson}
              title="Energy At Work"
              valueInt={dailyCheckInData.EnergyAtWork_int}
              valueString={dailyCheckInData.EnergyAtWork_value}
            />
            <WellBeingCard
              icon={TbTargetArrow}
              title="Focus At Work"
              valueInt={dailyCheckInData.FocusAtWork_int}
              valueString={dailyCheckInData.FocusAtWork_value}
            />
            <WellBeingCard
              icon={FaRegThumbsUp}
              title="Positive Emotions"
              valueInt={dailyCheckInData.PositiveEmotions_int}
              valueString={dailyCheckInData.PositiveEmotions_value}
            />
            <WellBeingCard
              icon={FaRegThumbsDown}
              title="Negative Emotions"
              valueInt={dailyCheckInData.NegativeEmotions_int}
              valueString={dailyCheckInData.NegativeEmotions_value}
            />
          </Flex>
        ) : (
          <Flex
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            height="full"
          >
            <Icon as={RiErrorWarningLine} boxSize={32} color="#24a2f0" />
            <Text color="#34313a" fontSize="1.25rem" fontWeight={700}>
              You haven&apos;t taken your Daily Check In yet.
            </Text>
          </Flex>
        )}
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
        <Grid gap={4} templateRows={tiseTaken === true ? "1fr 1fr 1fr" : "1fr"}>
          {tiseTaken === true ? (
            <>
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
                  min={1}
                  avg={3}
                  max={7}
                />
                <ChartDoughnut
                  title="Sense of Being Valued"
                  icon={FaDumbbell}
                  dataValue={tiseData.Factor_2}
                  min={1}
                  avg={3}
                  max={7}
                />
                <ChartDoughnut
                  title="Nurtured Psychological Needs"
                  icon={IoMdGitNetwork}
                  dataValue={tiseData.Factor_3}
                  min={1}
                  avg={3}
                  max={7}
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
                  min={1}
                  avg={3}
                  max={7}
                />
                <ChartDoughnut
                  title="Subjective Well Being"
                  icon={FaHands}
                  dataValue={tiseData.Factor_5}
                  min={1}
                  avg={7}
                  max={21}
                />
                <ChartDoughnut
                  title="Organizational Commitment"
                  icon={FaHandshake}
                  dataValue={tiseData.Factor_6}
                  min={1}
                  avg={9}
                  max={28}
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
                  min={1}
                  avg={7}
                  max={21}
                />
                <ChartDoughnut
                  title="Presenteeism"
                  icon={FaEye}
                  dataValue={tiseData.Factor_8}
                  min={-3}
                  avg={-2}
                  max={0}
                />
              </Flex>
            </>
          ) : (
            <Flex
              alignItems="center"
              flexDirection="column"
              justifyContent="center"
              height="full"
            >
              <Icon as={RiErrorWarningLine} boxSize={32} color="#24a2f0" />
              <Text color="#34313a" fontSize="1.25rem" fontWeight={700}>
                You haven&apos;t taken your Quarterly Assesment yet.
              </Text>
            </Flex>
          )}
        </Grid>
      </Section>
      {modal === "daily-checkin" && (
        <DailyCheckin
          isOpen={modal === "daily-checkin"}
          onCancel={() => setModal("")}
          onClose={() => {
            setModal("checkin-results");
            setStat(true);
          }}
        />
      )}
      {modal === "quarterly-assessment" && (
        <QuarterlyAssessment
          isOpen={modal === "quarterly-assessment"}
          onClose={() => setModal("")}
        />
      )}
      {modal === "checkin-results" && (
        <DailyCheckInResult
          isOpen={modal === "checkin-results"}
          onClose={() => setModal("")}
        />
      )}
    </Flex>
  );
};
