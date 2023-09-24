import { Icon, Flex, Grid, Spacer } from "@chakra-ui/react";
import { BsPencilSquare } from "react-icons/bs";
import Label from "../../../components/Form/Label";
import { useState } from "react";
import EditMission from "../../../components/Form/EditMission";
import EditVision from "../../../components/Form/EditVision";
import Section from "../../../components/Dashboard/Section";

const MissionAndVision = () => {
    const [isEditMissionOpen, setIsEditMissionOpen] = useState(false);
    const [isEditVisionOpen, setIsEditVisionOpen] = useState(false);

    const toggleEditMission = () => {
        setIsEditMissionOpen(!isEditMissionOpen);
    };

    const toggleEditVision = () => {
        setIsEditVisionOpen(!isEditVisionOpen);
    };

    return (
        <Grid templateColumns="1fr 2fr" gap="4" mt="4" minH="full">
            <Section title="Profile" borderRadius="1rem 1rem 0 0" minH="full" >
            </Section>
            <Grid templateRows="1fr 2fr">
                <Section
                    title="Mission"
                    borderRadius="1rem 0 0 0"
                    headerComponents={[<Icon as={BsPencilSquare} boxSize="4" color="#24a2f0" cursor="pointer" onClick={toggleEditMission} />, <Label color="#000000" name="Edit" />]}
                >
                    Mission statement here.
                </Section>
                <Section
                    title="Vision"
                    borderRadius="0"
                    headerComponents={[<Icon as={BsPencilSquare} boxSize="4" color="#24a2f0" cursor="pointer" onClick={toggleEditVision} />, <Label color="#000000" name="Edit" />]}
                >
                    Vision statement here.
                </Section>
            </Grid>
            {isEditMissionOpen && (
                <EditMission
                    isOpen={isEditMissionOpen}
                    onClose={toggleEditMission}
                />
            )}
            {isEditVisionOpen && (
                <EditVision
                    isOpen={isEditVisionOpen}
                    onClose={toggleEditVision}
                />
            )}
        </Grid>
    );
}

export default MissionAndVision;