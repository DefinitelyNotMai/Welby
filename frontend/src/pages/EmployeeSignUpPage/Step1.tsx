import { Flex, Grid, GridItem } from "@chakra-ui/react";
import FormItem from "../../components/Form/FormItem";
import Input from "../../components/Form/Input";
import { SelectCountry, SelectGender } from "../../components/Form/Select";
import UploadPhoto from "../../components/Form/UploadPhoto";
import Heading from "../../components/Typography/Heading";

type Step1Data = {
  First_Name: string;
  Middle_Name: string;
  Birthday: string;
  Nickname: string;
  Last_Name: string;
  GenderId: string;
  Phone_Number: string;
  CountryId: string;
  Instagram: string;
  TikTok: string;
  Linkedin: string;
  Facebook: string;
  ProfilePhoto: string;
};

type Step1Props = Step1Data & {
  updateFields: (fields: Partial<Step1Data>) => void;
};

const Step1 = ({
  First_Name,
  Middle_Name,
  Birthday,
  Nickname,
  Last_Name,
  GenderId,
  Phone_Number,
  CountryId,
  Instagram,
  TikTok,
  Linkedin,
  Facebook,
  ProfilePhoto,
  updateFields,
}: Step1Props) => {
  return (
    <Grid gap={4} templateColumns={["2fr 1fr"]} padding={[8, 16]}>
      <GridItem colSpan={3} textAlign="center">
        <Heading color="white">Welcome to</Heading>
        <Heading color="white" fontSize={["4xl", "5xl"]} marginBottom={8}>
          COMPANY NAME!
        </Heading>
        <Heading color="white" marginBottom={4}>
          Please introduce yourself.
        </Heading>
      </GridItem>
      <Grid gap={4} templateColumns={["1fr 1fr"]}>
        <Flex flexDirection="column" gap={4}>
          <FormItem htmlFor="first-name" label="First Name" isRequired>
            <Input
              autoComplete="off"
              id="first-name"
              name="first-name"
              onChange={(e) => updateFields({ First_Name: e.target.value })}
              placeholder="First Name"
              type="text"
              value={First_Name}
            />
          </FormItem>
          <FormItem htmlFor="middle-name" label="Middle Name" isRequired>
            <Input
              id="middle-name"
              name="middle-name"
              onChange={(e) => updateFields({ Middle_Name: e.target.value })}
              placeholder="Middle Name"
              type="text"
              value={Middle_Name}
            />
          </FormItem>
          <FormItem htmlFor="birthdate" label="Birthdate" isRequired>
            <Input
              id="birthdate"
              name="birthdate"
              onChange={(e) => updateFields({ Birthday: e.target.value })}
              placeholder="yyyy-mm-dd"
              type="date"
              value={Birthday}
            />
          </FormItem>
        </Flex>
        <Flex flexDirection="column" gap={4}>
          <FormItem htmlFor="nickname" label="Nickname" isRequired>
            <Input
              id="nickname"
              name="nickname"
              onChange={(e) => updateFields({ Nickname: e.target.value })}
              placeholder="Nickname"
              type="text"
              value={Nickname}
            />
          </FormItem>
          <FormItem htmlFor="last-name" label="Last Name" isRequired>
            <Input
              id="last-name"
              name="last-name"
              onChange={(e) => updateFields({ Last_Name: e.target.value })}
              placeholder="Last Name"
              type="text"
              value={Last_Name}
            />
          </FormItem>
          <FormItem htmlFor="gender" label="Gender" isRequired>
            <SelectGender
              id="gender"
              name="gender"
              onChange={(e) => updateFields({ GenderId: e.target.value })}
              value={GenderId}
            />
          </FormItem>
        </Flex>
        <GridItem colSpan={2}>
          <FormItem htmlFor="phone-number" label="Phone Number" isRequired>
            <Input
              id="phone-number"
              name="phone-number"
              onChange={(e) => updateFields({ Phone_Number: e.target.value })}
              placeholder="09123456789"
              type="text"
              value={Phone_Number}
            />
          </FormItem>
        </GridItem>
        <GridItem colSpan={2}>
          <FormItem htmlFor="location" label="Location" isRequired>
            <SelectCountry
              id="location"
              name="location"
              onChange={(e) => updateFields({ CountryId: e.target.value })}
              value={CountryId}
            />
          </FormItem>
        </GridItem>
        <Flex flexDirection="column" gap={4}>
          <FormItem htmlFor="instagram" label="Instagram">
            <Input
              id="instagram"
              name="instagram"
              onChange={(e) => updateFields({ Instagram: e.target.value })}
              placeholder="Instagram"
              type="text"
              value={Instagram}
            />
          </FormItem>
          <FormItem htmlFor="tiktok" label="TikTok">
            <Input
              id="tiktok"
              name="tiktok"
              onChange={(e) => updateFields({ TikTok: e.target.value })}
              placeholder="TikTok"
              type="text"
              value={TikTok}
            />
          </FormItem>
        </Flex>
        <Flex flexDirection="column" gap={4}>
          <FormItem htmlFor="linked-in" label="LinkedIn">
            <Input
              id="linked-in"
              name="linked-in"
              onChange={(e) => updateFields({ Linkedin: e.target.value })}
              placeholder="LinkedIn"
              type="text"
              value={Linkedin}
            />
          </FormItem>
          <FormItem htmlFor="facebook" label="Facebook">
            <Input
              id="facebook"
              name="facebook"
              onChange={(e) => updateFields({ Facebook: e.target.value })}
              placeholder="Facebook"
              type="text"
              value={Facebook}
            />
          </FormItem>
        </Flex>
      </Grid>
      <FormItem htmlFor="profile-photo">
        <UploadPhoto
          buttonWidth={["50%", "50%"]}
          id="profile-photo"
          label="Profile Photo"
          name="profile-photo"
          onChange={(e) => updateFields({ ProfilePhoto: e })}
          value={ProfilePhoto}
        />
      </FormItem>
    </Grid>
  );
};

export default Step1;
