import { Box, Flex, Grid, Image } from "@chakra-ui/react";
import WelbyLogo from "../../assets/images/welby_logo_and_name_primary_1_flat.svg";
import FormItem from "../../components/Form/FormItem";
import Input from "../../components/Form/Input";
import {
  SelectCompanySize,
  SelectCountry,
  SelectIndustryType,
} from "../../components/Form/Select";
import UploadPhoto from "../../components/Form/UploadPhoto";
import Heading from "../../components/Typography/Heading";
import Text from "../../components/Typography/Text";

interface Step1Data {
  companyId: string;
  companyName: string;
  companyEmail: string;
  companyLogo: string;
  companyWebsite: string;
  companySize: string;
  companyPhoneNumber: string;
  companyFoundingDate: string;
  companyCountryId: string; // can be string because it is being converted in the backend
  companyIndustryTypeId: string;
}

interface Step1Props extends Step1Data {
  updateFields: (fields: Partial<Step1Data>) => void;
}

const Step1 = ({
  companyName,
  companyEmail,
  companyLogo,
  companyWebsite,
  companySize,
  companyPhoneNumber,
  companyFoundingDate,
  companyCountryId,
  companyIndustryTypeId,
  updateFields,
}: Step1Props) => {
  return (
    <Grid templateColumns={["1fr", "1fr", "1fr 2fr"]}>
      <Flex
        alignItems="center"
        backgroundColor="white"
        borderRadius={["0.75rem 0.75rem 0 0", "0.75rem 0 0 0"]}
        flexDirection="row"
        justifyContent="center"
      >
        <Image src={WelbyLogo} boxSize={64} />
      </Flex>
      <Flex flexDirection="column" padding={[8, 16]} paddingBottom={[8, 4]}>
        <Heading fontSize={["lg", "2xl"]} fontWeight="medium" variant="white">
          First of all, thank you for choosing Welby!
        </Heading>
        <Heading
          fontSize={["lg", "2xl"]}
          fontWeight="medium"
          marginBottom={10}
          variant="white"
        >
          Let&apos;s start your <b>registration.</b>
        </Heading>
        <Box>
          <Grid
            templateColumns={["1fr", "1fr", "2fr 1.5fr"]}
            gap={8}
            marginBottom={4}
          >
            <Flex flexDirection="column" justifyContent="flex-end" gap={4}>
              <Text variant="white">Fields marked with * are required</Text>
              <FormItem htmlFor="company-name" label="Company Name" isRequired>
                <Input
                  id="company-name"
                  name="company-name"
                  onChange={(e) => {
                    updateFields({ companyName: e.target.value });
                  }}
                  placeholder="Name"
                  type="text"
                  value={companyName}
                />
              </FormItem>
              <FormItem
                htmlFor="company-email"
                label="Company Email Address"
                isRequired
              >
                <Input
                  id="company-email"
                  name="company-email"
                  onChange={(e) => {
                    updateFields({ companyEmail: e.target.value });
                  }}
                  placeholder="hello@email.com"
                  type="email"
                  value={companyEmail}
                />
              </FormItem>
            </Flex>
            <Flex>
              <FormItem htmlFor="company-logo">
                <UploadPhoto
                  buttonWidth={["100%"]}
                  id="company-logo"
                  label="Company Logo"
                  name="company-logo"
                  onChange={(e) => {
                    updateFields({ companyLogo: e });
                  }}
                  value={companyLogo}
                />
              </FormItem>
            </Flex>
          </Grid>
          <Grid
            templateColumns={["1fr", "1fr", "2fr 1.5fr"]}
            gap={[4, 8]}
            marginBottom={4}
          >
            <Flex flexDirection="column" gap={4}>
              <FormItem
                htmlFor="company-website"
                label="Company Website"
                isRequired
              >
                <Input
                  id="company-website"
                  onChange={(e) => {
                    updateFields({ companyWebsite: e.target.value });
                  }}
                  name="company-website"
                  placeholder="www.website.com"
                  type="text"
                  value={companyWebsite}
                />
              </FormItem>
              <FormItem
                htmlFor="company-number"
                label="Company Phone Number"
                isRequired
              >
                <Input
                  id="company-number"
                  name="company-number"
                  onChange={(e) => {
                    updateFields({ companyPhoneNumber: e.target.value });
                  }}
                  placeholder="09123456789"
                  type="text"
                  value={companyPhoneNumber}
                />
              </FormItem>
              <FormItem htmlFor="company-location" label="Location" isRequired>
                <SelectCountry
                  id="company-location"
                  name="company-location"
                  onChange={(e) => {
                    updateFields({ companyCountryId: e.target.value });
                  }}
                  value={companyCountryId}
                />
              </FormItem>
            </Flex>
            <Flex flexDirection="column" gap={4}>
              <FormItem htmlFor="company-size" label="Company Size" isRequired>
                <SelectCompanySize
                  id="company-size"
                  name="company-size"
                  onChange={(e) => {
                    updateFields({ companySize: e.target.value });
                  }}
                  value={companySize}
                />
              </FormItem>
              <FormItem
                htmlFor="company-founding-year"
                label="Founding Year"
                isRequired
              >
                <Input
                  id="company-founding-year"
                  name="company-founding-year"
                  onChange={(e) => {
                    updateFields({ companyFoundingDate: e.target.value });
                  }}
                  placeholder="09123456789"
                  type="date"
                  value={companyFoundingDate}
                />
              </FormItem>
              <FormItem
                htmlFor="company-industry-type"
                label="Industry Type"
                isRequired
              >
                <SelectIndustryType
                  id="company-industry-type"
                  name="company-industry-type"
                  onChange={(e) => {
                    updateFields({ companyIndustryTypeId: e.target.value });
                  }}
                  value={companyIndustryTypeId}
                />
              </FormItem>
            </Flex>
          </Grid>
        </Box>
      </Flex>
    </Grid>
  );
};

export default Step1;
