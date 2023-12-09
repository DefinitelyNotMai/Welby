import { Button, Flex, Grid } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Section } from "../../../components/DataDisplay/Section";
import { ChartBar } from "../../../components/Charts/ChartBar";
import { PredictionChart } from "../../../components/Charts/PredictionChart";
import { DailyCheckin } from "../../../components/Modal/DailyCheckin";
import { QuarterlyAssessment } from "../../../components/Modal/QuarterlyAssessment";
import { UserContext } from "../../../context/UserContext";

export const MyDashboardWellbeingPage = () => {
  document.title = "Well-Being | Welby";

  const userContext = useContext(UserContext);
  const [modal, setModal] = useState<string>("");

  return (
    <Grid templateRows="1fr 1fr" gap={4} width="full" marginBottom={4}>
      <Section
        title="Well-Being Journey Details"
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
        <Flex flexDirection="column" gap={8}>
          <ChartBar />
        </Flex>
      </Section>
      <Section
        title="The Pillars of your Ability to Thrive"
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
        {userContext.role === "Company Admin" ||
        userContext.role === "Leader" ? (
          <></>
        ) : (
          <PredictionChart />
        )}
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
    </Grid>
  );
};
