import { Flex, Grid, GridItem } from "@chakra-ui/react";
import FormItem from "../../components/Form/FormItem";
import Input from "../../components/Form/Input";
import { SelectCountry, SelectGender } from "../../components/Form/Select";
import UploadPhoto from "../../components/Form/UploadPhoto";
import Heading from "../../components/Typography/Heading";

interface Step1Data {
  firstName: string;
  middleName: string;
  birthDate: string;
  nickname: string;
  lastName: string;
  genderId: string;
  phoneNumber: string;
  countryId: string;
  instagram: string;
  tiktok: string;
  linkedIn: string;
  facebook: string;
  profilePhoto: string;
}

interface Step1Props extends Step1Data {
  updateFields: (fields: Partial<Step1Data>) => void;
}

const Step1 = ({
  firstName,
  middleName,
  birthDate,
  nickname,
  lastName,
  genderId,
  phoneNumber,
  countryId,
  instagram,
  tiktok,
  linkedIn,
  facebook,
  profilePhoto,
  updateFields,
}: Step1Props) => {
  return (
    <Grid gap={4} templateColumns={["2fr 1fr"]} padding={[8, 16]}>
      <GridItem colSpan={3} textAlign="center">
        <Heading variant="white">Welcome to</Heading>
        <Heading fontSize={["4xl", "5xl"]} marginBottom={8} variant="white">
          COMPANY NAME!
        </Heading>
        <Heading marginBottom={4} variant="white">
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
              onChange={(e) => updateFields({ firstName: e.target.value })}
              placeholder="First Name"
              type="text"
              value={firstName}
            />
          </FormItem>
          <FormItem htmlFor="middle-name" label="Middle Name" isRequired>
            <Input
              id="middle-name"
              name="middle-name"
              onChange={(e) => updateFields({ middleName: e.target.value })}
              placeholder="Middle Name"
              type="text"
              value={middleName}
            />
          </FormItem>
          <FormItem htmlFor="birthdate" label="Birthdate" isRequired>
            <Input
              id="birthdate"
              name="birthdate"
              onChange={(e) => updateFields({ birthDate: e.target.value })}
              placeholder="yyyy-mm-dd"
              type="date"
              value={birthDate}
            />
          </FormItem>
        </Flex>
        <Flex flexDirection="column" gap={4}>
          <FormItem htmlFor="nickname" label="Nickname" isRequired>
            <Input
              id="nickname"
              name="nickname"
              onChange={(e) => updateFields({ nickname: e.target.value })}
              placeholder="Nickname"
              type="text"
              value={nickname}
            />
          </FormItem>
          <FormItem htmlFor="last-name" label="Last Name" isRequired>
            <Input
              id="last-name"
              name="last-name"
              onChange={(e) => updateFields({ lastName: e.target.value })}
              placeholder="Last Name"
              type="text"
              value={lastName}
            />
          </FormItem>
          <FormItem htmlFor="gender" label="Gender" isRequired>
            <SelectGender
              id="gender"
              name="gender"
              onChange={(e) => updateFields({ genderId: e.target.value })}
              value={genderId}
            />
          </FormItem>
        </Flex>
        <GridItem colSpan={2}>
          <FormItem htmlFor="phone-number" label="Phone Number" isRequired>
            <Input
              id="phone-number"
              name="phone-number"
              onChange={(e) => updateFields({ phoneNumber: e.target.value })}
              placeholder="09123456789"
              type="text"
              value={phoneNumber}
            />
          </FormItem>
        </GridItem>
        <GridItem colSpan={2}>
          <FormItem htmlFor="location" label="Location" isRequired>
            <SelectCountry
              id="location"
              name="location"
              onChange={(e) => updateFields({ countryId: e.target.value })}
              value={countryId}
            />
          </FormItem>
        </GridItem>
        <Flex flexDirection="column" gap={4}>
          <FormItem htmlFor="instagram" label="Instagram">
            <Input
              id="instagram"
              name="instagram"
              onChange={(e) => updateFields({ instagram: e.target.value })}
              placeholder="Instagram"
              type="text"
              value={instagram}
            />
          </FormItem>
          <FormItem htmlFor="tiktok" label="TikTok">
            <Input
              id="tiktok"
              name="tiktok"
              onChange={(e) => updateFields({ tiktok: e.target.value })}
              placeholder="TikTok"
              type="text"
              value={tiktok}
            />
          </FormItem>
        </Flex>
        <Flex flexDirection="column" gap={4}>
          <FormItem htmlFor="linked-in" label="LinkedIn">
            <Input
              id="linked-in"
              name="linked-in"
              onChange={(e) => updateFields({ linkedIn: e.target.value })}
              placeholder="LinkedIn"
              type="text"
              value={linkedIn}
            />
          </FormItem>
          <FormItem htmlFor="facebook" label="Facebook">
            <Input
              id="facebook"
              name="facebook"
              onChange={(e) => updateFields({ facebook: e.target.value })}
              placeholder="Facebook"
              type="text"
              value={facebook}
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
          onChange={(e) => updateFields({ profilePhoto: e })}
          value={profilePhoto}
        />
      </FormItem>
    </Grid>
  );
};

export default Step1;
