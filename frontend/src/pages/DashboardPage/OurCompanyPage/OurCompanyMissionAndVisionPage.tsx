// lib
import { Button, Grid } from "@chakra-ui/react";
import { BsPencilSquare } from "react-icons/bs";

// local
import { CompanyMission } from "../../../components/Dashboard/CompanyMission";
import { CompanyProfile } from "../../../components/Dashboard/CompanyProfile";
import { CompanyVision } from "../../../components/Dashboard/CompanyVision";
import { Section } from "../../../components/DataDisplay/Section";
import { useContext, useState } from "react";
import { EditMission } from "../../../components/Modal/EditMission";
import { UserContext } from "../../../context/UserContext";
import { EditVision } from "../../../components/Modal/EditVision";

export const OurCompanyMissionAndVisionPage = () => {
  document.title = "Mission and Vision | Welby";

  const userContext = useContext(UserContext);

  const [editModal, setEditModal] = useState<string>("");
  const [mission, setMission] = useState<string>("");
  const [vision, setVision] = useState<string>("");

  return (
    <Grid gap={4} templateColumns="1fr 2fr" width="full">
      <Section borderRadius="1rem 1rem 0 0" title="Profile">
        <CompanyProfile />
      </Section>
      <Grid gap={4} marginBottom={4} templateRows="1fr 1fr">
        <Section
          title="Mission"
          headerComponents={
            userContext.role === "Company Admin"
              ? [
                  <Button
                    key={1}
                    leftIcon={<BsPencilSquare style={{ color: "#24a2f0 " }} />}
                    onClick={() => setEditModal("Mission")}
                    variant="section-secondary"
                  >
                    Edit
                  </Button>,
                ]
              : []
          }
        >
          <CompanyMission onDataReceived={(data: string) => setMission(data)} />
        </Section>
        <Section
          title="Vision"
          headerComponents={
            userContext.role === "Company Admin"
              ? [
                  <Button
                    key={1}
                    leftIcon={<BsPencilSquare style={{ color: "#24a2f0 " }} />}
                    onClick={() => setEditModal("Vision")}
                    variant="section-secondary"
                  >
                    Edit
                  </Button>,
                ]
              : []
          }
        >
          <CompanyVision onDataReceived={(data: string) => setVision(data)} />
        </Section>
      </Grid>
      {editModal === "Mission" && (
        <EditMission
          isOpen={editModal === "Mission"}
          missionData={mission}
          onClose={() => setEditModal("")}
        />
      )}
      {editModal === "Vision" && (
        <EditVision
          isOpen={editModal === "Vision"}
          visionData={vision}
          onClose={() => setEditModal("")}
        />
      )}
    </Grid>
  );
};
