// lib
import { Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// local
import { Section } from "../../../components/DataDisplay/Section";

export const OurCompanyGoalsPage = () => {
  document.title = "Company Goals | Welby";

  const [goals, setGoals] = useState<[]>([]);

  useEffect(() => {}, []);

  return (
    <Grid gap={4} templateColumns="1.25fr 2fr" width="full">
      <Section borderRadius="1rem 1rem 0 0" title="Company Goals">
        HELLO
      </Section>
      <Section borderRadius="1rem 0 0 0" title="Goal Description">
        HELLO
      </Section>
    </Grid>
  );
};
