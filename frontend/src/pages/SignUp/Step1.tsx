import { Box, Flex, Grid, Heading, Image } from "@chakra-ui/react";
import WelbyLogo from "../../assets/images/welby_logo_and_name_primary_1_flat.svg";
import CustomText from "../../components/CustomText";
import {
  CustomTextbox,
  DateTimePicker,
  UploadPhoto,
} from "../../components/Form/CustomInput";
import {
  SelectCompanySize,
  SelectCountry,
  SelectIndustryType,
} from "../../components/Form/CustomSelect";
import FormItem from "../../components/Form/FormItem";

type Step1Data = {
  Name: string;
  Email: string;
  Logo: string;
  Website: string;
  Phone_Number: string;
  CountryId: string;
  IndustryTypeId: string;
  FoundingDate: string;
  CompanySize: string;
};

type Step1Props = Step1Data & {
  updateFields: (fields: Partial<Step1Data>) => void;
};

const Step1 = ({
  Name,
  Email,
  Logo,
  Website,
  Phone_Number,
  CountryId,
  IndustryTypeId,
  FoundingDate,
  CompanySize,
  updateFields,
}: Step1Props) => {
  return (
    <Grid templateColumns={["1fr", "1fr 2fr"]}>
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
        <Heading as="h1" marginBottom={10} fontSize={["lg", "3xl"]}>
          <CustomText fontWeight="medium">
            First of all, thank you for choosing Welby!
          </CustomText>
          <CustomText fontWeight="medium">
            Let&apos;s start your <b>registration.</b>
          </CustomText>
        </Heading>
        <Box>
          <Grid templateColumns={["1fr", "2fr 1.5fr"]} gap={8} marginBottom={4}>
            <Flex flexDirection="column" justifyContent="flex-end" gap={4}>
              <Box fontSize={["sm", "md"]}>
                <CustomText>Fields marked with * are required.</CustomText>
              </Box>
              <FormItem htmlFor="company-name" label="Company Name" isRequired>
                <CustomTextbox
                  autoComplete="organization"
                  id="company-name"
                  name="company-name"
                  onChange={(e) => updateFields({ Name: e.target.value })}
                  placeholder="Name"
                  type="text"
                  value={Name}
                />
              </FormItem>
              <FormItem
                htmlFor="company-email"
                label="Company Email Address"
                isRequired
              >
                <CustomTextbox
                  autoComplete="email"
                  id="company-email"
                  name="company-email"
                  onChange={(e) => updateFields({ Email: e.target.value })}
                  placeholder="hello@email.com"
                  type="email"
                  value={Email}
                />
              </FormItem>
            </Flex>
            <Flex flexDirection="column">
              <FormItem htmlFor="company-logo">
                <UploadPhoto
                  id="company-logo"
                  label="Company Logo"
                  name="company-logo"
                  onChange={(e) => updateFields({ Logo: e ?? "" })}
                  value={Logo}
                />
              </FormItem>
            </Flex>
          </Grid>
          <Grid templateColumns={["1fr", "2fr 1.5fr"]} gap={8} marginBottom={4}>
            <Flex flexDirection="column" gap={4}>
              <FormItem
                htmlFor="company-website"
                label="Company Website"
                isRequired
              >
                <CustomTextbox
                  autoComplete="off"
                  id="company-website"
                  onChange={(e) => updateFields({ Website: e.target.value })}
                  name="company-website"
                  placeholder="www.website.com"
                  type="text"
                  value={Website}
                />
              </FormItem>
              <FormItem
                htmlFor="company-number"
                label="Company Phone Number"
                isRequired
              >
                <CustomTextbox
                  autoComplete="off"
                  id="company-number"
                  name="company-number"
                  onChange={(e) =>
                    updateFields({ Phone_Number: e.target.value })
                  }
                  placeholder="09123456789"
                  type="text"
                  value={Phone_Number}
                />
              </FormItem>
              <FormItem htmlFor="company-location" label="Location" isRequired>
                <SelectCountry
                  onClick={(e) => updateFields({ CountryId: e })}
                  value={CountryId}
                />
              </FormItem>
            </Flex>
            <Flex flexDirection="column" gap={4}>
              <FormItem htmlFor="company-size" label="Company Size" isRequired>
                <SelectCompanySize
                  onClick={(e) => updateFields({ CompanySize: e })}
                  value={CompanySize}
                />
              </FormItem>
              <FormItem
                htmlFor="company-founding-year"
                label="Founding Year"
                isRequired
              >
                <DateTimePicker
                  id="company-founding-year"
                  name="company-founding-year"
                  onChange={(e) =>
                    updateFields({ FoundingDate: e.target.value })
                  }
                  value={FoundingDate}
                />
              </FormItem>
              <FormItem
                htmlFor="company-industry-type"
                label="Industry Type"
                isRequired
              >
                <SelectIndustryType
                  onClick={(e) => updateFields({ IndustryTypeId: e })}
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

export default Step1;
