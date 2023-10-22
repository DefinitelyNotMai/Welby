import { Grid } from "@chakra-ui/react";
import CompanyValuesList from "../../../components/Dashboard/CompanyValuesList";
import DashboardSection from "../../../components/Dashboard/DashboardSection";

const OurCompanyCoreValues = () => {
  return (
    <Grid templateColumns="1fr 2fr" gap={4} width="full">
      <DashboardSection title="Core Values" borderRadius="1rem 1rem 0 0">
        <CompanyValuesList />
      </DashboardSection>
      <DashboardSection title="Core Value Title" borderRadius="1rem 0 0 0">
        Core Value Description
      </DashboardSection>
    </Grid>
  );
};

export default OurCompanyCoreValues;
