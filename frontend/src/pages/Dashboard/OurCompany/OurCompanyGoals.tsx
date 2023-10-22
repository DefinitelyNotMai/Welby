import { Grid } from "@chakra-ui/react";
import CompanyGoalsList from "../../../components/Dashboard/CompanyGoalsList";
import DashboardSection from "../../../components/Dashboard/DashboardSection";

const OurCompanyGoals = () => {
  return (
    <Grid templateColumns="1fr 2fr" gap={4} width="full">
      <DashboardSection title="Company Goals" borderRadius="1rem 1rem 0 0">
        <CompanyGoalsList />
      </DashboardSection>
      <DashboardSection title="Goal Title" borderRadius="1rem 0 0 0">
        Goal Description
      </DashboardSection>
    </Grid>
  );
};

export default OurCompanyGoals;
