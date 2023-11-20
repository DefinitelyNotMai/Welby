// lib
import { Grid } from "@chakra-ui/react";

// local
import { Section } from "../../../components/DataDisplay/Section";

export const OurCompanyCoreValuesPage = () => {
  document.title = "Core Values | Welby";

  return (
    <Grid gap={4} templateColumns="1.25fr 2fr" width="full">
      <Section borderRadius="1rem 1rem 0 0" title="Core Values">
        HELLO
      </Section>
      <Section borderRadius="1rem 0 0 0" title="Value Name">
        HELLO
      </Section>
    </Grid>
  );
};
