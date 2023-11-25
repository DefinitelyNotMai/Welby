// lib
import { Box, Flex, Grid, Heading, Image, Input, Text } from "@chakra-ui/react";

// local
import {
  SelectCompanySize,
  SelectCountry,
  SelectIndustryType,
} from "../../components/Form/Select";
import WelbyLogo from "../../assets/images/welby_logo_and_name_primary_1_flat.svg";
import { FormItem } from "../../components/Form/FormItem";
import { UploadPhoto } from "../../components/Form/UploadPhoto";

type Step1Data = {
  Name: string;
  companyEmail: string;
  Logo: string;
  Website: string;
  CompanySize: string;
  Phone_Number: string;
  FoundingDate: string;
  CountryId: number;
  IndustryTypeId: number;
};

type Step1Props = Step1Data & {
  updateFields: (fields: Partial<Step1Data>) => void;
};

export const Step1 = ({
  Name,
  companyEmail,
  Logo,
  Website,
  CompanySize,
  Phone_Number,
  FoundingDate,
  CountryId,
  IndustryTypeId,
  updateFields,
}: Step1Props) => {
  return (
    <Grid templateColumns={["1fr", "1fr", "1fr 2fr"]}>
      <Flex
        alignItems="center"
        backgroundColor="#ffffff"
        borderRadius={["0.75rem 0.75rem 0 0", "0.75rem 0 0 0"]}
        flexDirection="row"
        justifyContent="center"
      >
        <Image src={WelbyLogo} boxSize={64} />
      </Flex>
      <Flex flexDirection="column" padding={[8, 16]} paddingBottom={[8, 4]}>
        <Heading fontSize="1.5rem">
          First of all, thank you for choosing Welby!
        </Heading>
        <Heading fontSize="1.5rem" fontWeight="medium" marginBottom={10}>
          Let&apos;s start your <b>registration.</b>
        </Heading>
        <Box>
          <Grid
            templateColumns={["1fr", "1fr", "2fr 1.5fr"]}
            gap={8}
            marginBottom={4}
          >
            <Flex flexDirection="column" justifyContent="flex-end" gap={4}>
              <Text>Fields marked with * are required</Text>
              <FormItem htmlFor="company-name" label="Company Name" isRequired>
                <Input
                  id="company-name"
                  name="company-name"
                  onChange={(e) => {
                    updateFields({ Name: e.target.value });
                  }}
                  placeholder="Name"
                  value={Name}
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
                    updateFields({ Logo: e });
                  }}
                  value={Logo}
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
              <FormItem htmlFor="company-website" label="Company Website">
                <Input
                  id="company-website"
                  onChange={(e) => {
                    updateFields({ Website: e.target.value });
                  }}
                  name="company-website"
                  placeholder="www.website.com"
                  value={Website}
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
                    updateFields({ Phone_Number: e.target.value });
                  }}
                  placeholder="09123456789"
                  value={Phone_Number}
                />
              </FormItem>
              <FormItem htmlFor="company-location" label="Location" isRequired>
                <SelectCountry
                  id="company-location"
                  name="company-location"
                  onChange={(e) => {
                    updateFields({ CountryId: parseInt(e.target.value, 10) });
                  }}
                  value={CountryId}
                />
              </FormItem>
            </Flex>
            <Flex flexDirection="column" gap={4}>
              <FormItem htmlFor="company-size" label="Company Size" isRequired>
                <SelectCompanySize
                  id="company-size"
                  name="company-size"
                  onChange={(e) => {
                    updateFields({ CompanySize: e.target.value });
                  }}
                  value={CompanySize}
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
                    updateFields({ FoundingDate: e.target.value });
                  }}
                  placeholder="09123456789"
                  type="date"
                  value={FoundingDate}
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
                    updateFields({
                      IndustryTypeId: parseInt(e.target.value, 10),
                    });
                  }}
                  value={IndustryTypeId}
                />
              </FormItem>
            </Flex>
          </Grid>
        </Box>
      </Flex>
    </Grid>
  );
};
