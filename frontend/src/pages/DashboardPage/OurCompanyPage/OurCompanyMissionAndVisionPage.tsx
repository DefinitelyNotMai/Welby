// lib
import { Button, Grid, Modal } from "@chakra-ui/react";
import { BsPencilSquare } from "react-icons/bs";

// local
import { CompanyMission } from "../../../components/Dashboard/CompanyMission";
import { CompanyProfile } from "../../../components/Dashboard/CompanyProfile";
import { CompanyVision } from "../../../components/Dashboard/CompanyVision";
import { Section } from "../../../components/DataDisplay/Section";
import { useState } from "react";
import { EditMission } from "../../../components/Modal/EditMission";

export const OurCompanyMissionAndVisionPage = () => {
  document.title = "Mission and Vision | Welby";

  const [editModal, setEditModal] = useState<string>("");
  const [receivedData, setReceivedData] = useState<string>("");

  const handleData = (data: string) => {
    setReceivedData(data);
  };

  const handleCloseModal = () => {
    setEditModal("");
  };

  return (
    <Grid gap={4} templateColumns="1fr 2fr" width="full">
      <Section borderRadius="1rem 1rem 0 0" title="Profile">
        <CompanyProfile />
      </Section>
      <Grid gap={4} marginBottom={4} templateRows="1fr 1fr">
        <Section
          title="Mission"
          headerComponents={[
            <Button
              key={1}
              leftIcon={<BsPencilSquare style={{ color: "#24a2f0 " }} />}
              onClick={() => setEditModal("Mission")}
              variant="section-secondary"
            >
              Edit
            </Button>,
          ]}
        >
          <CompanyMission onDataReceived={handleData} />
        </Section>
        <Section
          title="Vision"
          headerComponents={[
            <Button
              key={1}
              leftIcon={<BsPencilSquare style={{ color: "#24a2f0 " }} />}
              onClick={() => setEditModal("Vision")}
              variant="section-secondary"
            >
              Edit
            </Button>,
          ]}
        >
          <CompanyVision />
        </Section>
      </Grid>
      {editModal === "Mission" && (
        <Modal
          isOpen={editModal === "Mission"}
          onClose={handleCloseModal}
          isCentered
          closeOnOverlayClick={false}
          closeOnEsc={false}
        >
          <EditMission missionData={receivedData} />
        </Modal>
      )}
      {editModal === "Vision" && (
        <Modal
          isOpen={editModal === "Vision"}
          onClose={handleCloseModal}
          isCentered
          closeOnOverlayClick={false}
          closeOnEsc={false}
        ></Modal>
      )}
    </Grid>
  );
};
