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

type Step1Data = {
  name: string;
  email: string;
  logo: string;
  website: string;
  size: string;
  phoneNumber: string;
  foundingDate: string;
  countryId: string;
  industryTypeId: string;
};

type Step1Props = Step1Data & {
  updateFields: (fields: Partial<Step1Data>) => void;
};

const Step1 = ({
  name,
  email,
  logo,
  website,
  size,
  phoneNumber,
  foundingDate,
  countryId,
  industryTypeId,
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
                    updateFields({ name: e.target.value });
                  }}
                  placeholder="Name"
                  type="text"
                  value={name}
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
                    updateFields({ email: e.target.value });
                  }}
                  placeholder="hello@email.com"
                  type="email"
                  value={email}
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
                    updateFields({ logo: e });
                  }}
                  value={logo}
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
                    updateFields({ website: e.target.value });
                  }}
                  name="company-website"
                  placeholder="www.website.com"
                  type="text"
                  value={website}
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
                    updateFields({ phoneNumber: e.target.value });
                  }}
                  placeholder="09123456789"
                  type="text"
                  value={phoneNumber}
                />
              </FormItem>
              <FormItem htmlFor="company-location" label="Location" isRequired>
                <SelectCountry
                  id="company-location"
                  name="company-location"
                  onChange={(e) => {
                    updateFields({ countryId: e.target.value });
                  }}
                  value={countryId}
                />
              </FormItem>
            </Flex>
            <Flex flexDirection="column" gap={4}>
              <FormItem htmlFor="company-size" label="Company Size" isRequired>
                <SelectCompanySize
                  id="company-size"
                  name="company-size"
                  onChange={(e) => {
                    updateFields({ size: e.target.value });
                  }}
                  value={size}
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
                    updateFields({ foundingDate: e.target.value });
                  }}
                  placeholder="09123456789"
                  type="date"
                  value={foundingDate}
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
                    updateFields({ industryTypeId: e.target.value });
                  }}
                  value={industryTypeId}
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
