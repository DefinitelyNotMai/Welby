// lib
import { Button, Grid, Modal } from "@chakra-ui/react";
import { useState } from "react";

// local
import { Section } from "../../../components/DataDisplay/Section";
import { DailyCheckin } from "../../../components/Modal/DailyCheckin";
import { QuarterlyAssessment } from "../../../components/Modal/QuarterlyAssessment";

export const MyDashboardWellbeingPage = () => {
  document.title = "Well-Being | Welby";

  const [modalOpen, setModalOpen] = useState<string>("");

  return (
    <Grid templateRows="1fr 1fr" gap={4} width="full" marginBottom={4}>
      <Section
        title="Well-Being Journey Details"
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
        HELLO
      </Section>
      <Section
        title="The Pillars of your Ability to Thrive"
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
        <Modal
          isOpen={modalOpen === "quarterly-assessment"}
          onClose={() => setModalOpen("")}
          isCentered
          closeOnEsc={false}
          closeOnOverlayClick={false}
        >
          <QuarterlyAssessment />
        </Modal>
      )}
    </Grid>
  );
};
