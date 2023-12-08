import { Flex, Grid, Icon, Text } from "@chakra-ui/react";
import { Section } from "../../../components/DataDisplay/Section";
import { useContext, useEffect, useState } from "react";
import { fetchData } from "../../../api/fetchData";
import { UserContext } from "../../../context/UserContext";
import { getDateToday } from "../../../api/getDates";
import { TISE, TISE_DATA } from "../../../data/tise";
import { DAILYCHECKIN_DATA, DailyCheckIn } from "../../../data/dailyCheckIn";
import { WellBeingCard } from "../../../components/DataDisplay/WellBeingCard";
import { BsPerson } from "react-icons/bs";
import { TbTargetArrow } from "react-icons/tb";
import {
  FaDumbbell,
  FaEye,
  FaHands,
  FaHandshake,
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaWalking,
} from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";
import { useOutletContext } from "react-router-dom";
import { ChartDoughnut } from "../../../components/Charts/ChartDoughnut";
import { GiHummingbird } from "react-icons/gi";
import { IoMdGitNetwork } from "react-icons/io";
import { MdPeople } from "react-icons/md";

type TeamMember = {
  CompanyId: string;
  EmployeeId: string;
  Nickname: string;
};

export const MyTeamOverviewPage = () => {
  document.title = "Team Overview | Welby";

  const dailyCheckInUrl = "https://localhost:44373/api/GetAllDailyCheckIn";
  const tiseUrl = "https://localhost:44373/api/GetAllTise";
  const userContext = useContext(UserContext);

  const [selectedEmployee] = useOutletContext<TeamMember>();
  const [tiseData, setTiseData] = useState<TISE>(TISE_DATA);
  const [dailyCheckInData, setDailyCheckInData] =
    useState<DailyCheckIn>(DAILYCHECKIN_DATA);
  const [checkInTaken, setCheckInTaken] = useState<boolean>(false);
  const [tiseTaken, setTiseTaken] = useState<boolean>(false);

  useEffect(() => {
    const checkIfCheckInTaken = async () => {
      const data = await fetchData(dailyCheckInUrl, {
        DailyCheckInId: 0,
        EmployeeId: selectedEmployee.EmployeeId,
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
    };
    console.log(selectedEmployee.EmployeeId);
    checkIfCheckInTaken();
  }, [selectedEmployee.EmployeeId, userContext.companyId]);

  useEffect(() => {
    const checkIfTiseTaken = async () => {
      const tdata = await fetchData(tiseUrl, {
        TiseId: 0,
        EmployeeId: selectedEmployee.EmployeeId,
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
    console.log(selectedEmployee.EmployeeId);
    checkIfTiseTaken();
  }, [selectedEmployee.EmployeeId, userContext.companyId]);

  return (
    <Flex flexDirection="column" gap={4} width="full" marginBottom={4}>
      <Section title="Team Well-Being at Work">
        {checkInTaken === true ? (
          <Flex
            flexDirection="row"
            gap={4}
            height="full"
            justifyContent="space-between"
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
              Employee hasn&apos;t taken their Daily Check In yet.
            </Text>
          </Flex>
        )}
      </Section>
      <Section title="Team Pillars to Thrive at Work">
        <Grid gap={4} templateRows={tiseTaken === true ? "1fr 1fr" : "1fr"}>
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
                  onClick={() => {}}
                  min={2}
                  avg={4}
                  max={7}
                />
                <ChartDoughnut
                  title="Sense of Being Valued"
                  icon={FaDumbbell}
                  dataValue={tiseData.Factor_2}
                  onClick={() => {}}
                  min={2}
                  avg={4}
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
                  title="Nurtured Psychological Needs"
                  icon={IoMdGitNetwork}
                  dataValue={tiseData.Factor_3}
                  onClick={() => {}}
                  min={2}
                  avg={4}
                  max={7}
                />
                <ChartDoughnut
                  title="Positive Work Relationships"
                  icon={MdPeople}
                  dataValue={tiseData.Factor_4}
                  onClick={() => {}}
                  min={2}
                  avg={4}
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
                  title="Subjective Well Being"
                  icon={FaHands}
                  dataValue={tiseData.Factor_5}
                  onClick={() => {}}
                  min={6}
                  avg={15}
                  max={21}
                />
                <ChartDoughnut
                  title="Organizational Commitment"
                  icon={FaHandshake}
                  dataValue={tiseData.Factor_6}
                  onClick={() => {}}
                  min={8}
                  avg={20}
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
                  onClick={() => {}}
                  min={6}
                  avg={15}
                  max={21}
                />
                <ChartDoughnut
                  title="Presenteeism"
                  icon={FaEye}
                  dataValue={tiseData.Factor_8 + 3}
                  onClick={() => {}}
                  min={0}
                  avg={1.5}
                  max={3}
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
                Employee hasn&apos;t taken their Quarterly Assesment yet.
              </Text>
            </Flex>
          )}
        </Grid>
      </Section>
    </Flex>
  );
};
