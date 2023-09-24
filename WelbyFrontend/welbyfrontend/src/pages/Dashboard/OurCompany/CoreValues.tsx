import { Grid } from "@chakra-ui/react";
import Section from "../../../components/Dashboard/Section";

const CoreValues = () => {
    return (
        <Grid templateColumns="1fr 2fr" gap="4" mt="4" minH="full">
            <Section title="Core Values" borderRadius="1rem 1rem 0 0" minH="full" >
            </Section>
            <Section title="Core Value Title" borderRadius="1rem 0 0 1rem" minH="full">
            </Section>
        </Grid>
    );
}

export default CoreValues;
