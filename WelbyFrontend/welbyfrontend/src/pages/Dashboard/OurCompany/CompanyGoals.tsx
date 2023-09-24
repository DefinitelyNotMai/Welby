import { Grid, Icon } from "@chakra-ui/react";
import Section from "../../../components/Dashboard/Section";

const CompanyGoals = () => {
    return (
        <Grid templateColumns="1fr 2fr" gap="4" mt="4" minH="full">
            <Section title="Company Goals" borderRadius="1rem 1rem 0 0">
            </Section>
            <Section title="Mission" borderRadius="1rem 0 0 1rem" minH="full">
                Mission and Vision
            </Section>
        </Grid>
    );
}

export default CompanyGoals;
