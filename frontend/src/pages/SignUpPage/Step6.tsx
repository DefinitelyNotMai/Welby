import { Flex, Grid } from "@chakra-ui/react";
import FormItem from "../../components/Form/FormItem";
import Input from "../../components/Form/Input";
import { SelectGender } from "../../components/Form/Select";
import UploadPhoto from "../../components/Form/UploadPhoto";
import Heading from "../../components/Typography/Heading";

type Step6Data = {
  profilePhoto: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  nickname: string;
  middleName: string;
  lastName: string;
  birthdate: string;
  genderId: string;
  phoneNumber: string;
  email: string;
  name: string;
};

type Step6Props = Step6Data & {
  updateFields: (fields: Partial<Step6Data>) => void;
};

const Step6 = ({
  profilePhoto,
  password,
  confirmPassword,
  firstName,
  nickname,
  middleName,
  lastName,
  birthdate,
  genderId,
  phoneNumber,
  email,
  name,
  updateFields,
}: Step6Props) => {
  return (
    <Flex flexDirection="column" padding={8}>
      <Flex flexDirection="column" marginBottom={10} textAlign="center">
        <Heading fontSize={["xl", "3xl"]} variant="white">
          Hello Company Admin of
        </Heading>
        <Heading fontSize={["2xl", "4xl"]} variant="white">
          {name}
        </Heading>
        <Heading fontSize={["xl", "3xl"]} variant="white">
          Please introduce yourself.
        </Heading>
      </Flex>
      <Flex flexDirection="column" alignItems="center" justifyContent="center">
        <FormItem htmlFor="company-admin-profile-photo">
          <UploadPhoto
            buttonWidth={["50%", "25%"]}
            id="company-admin-profile-photo"
            name="company-admin-profile-photo"
            label="Profile Photo"
            onChange={(e) => updateFields({ profilePhoto: e })}
            value={profilePhoto}
          />
        </FormItem>
        <Flex
          flexDirection="column"
          gap={4}
          width={["100%", "90%", "80%", "70%"]}
        >
          <FormItem htmlFor="company-admin-email" label="Email">
            <Input
              id="company-admin-email"
              isDisabled
              name="company-admin-email"
              onChange={() => {}}
              placeholder="Company Email"
              type="email"
              value={email}
            />
          </FormItem>
          <FormItem
            htmlFor="company-admin-password"
            label="Password"
            isRequired
          >
            <Input
              id="company-admin-password"
              name="company-admin-password"
              onChange={(e) => updateFields({ password: e.target.value })}
              placeholder="Password"
              type="password"
              value={password}
            />
          </FormItem>
          <FormItem
            htmlFor="company-admin-confirm-password"
            label="Confirm Password"
            isRequired
          >
            <Input
              id="company-admin-confirm-password"
              name="company-admin-confirm-password"
              onChange={(e) =>
                updateFields({ confirmPassword: e.target.value })
              }
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
            />
          </FormItem>
          <Grid templateColumns={["1fr", "1fr", "1fr 1fr"]} gap={8}>
            <Flex flexDirection="column" gap={4}>
              <FormItem
                htmlFor="company-admin-first-name"
                label="First Name"
                isRequired
              >
                <Input
                  id="company-admin-first-name"
                  name="company-admin-first-name"
                  onChange={(e) => updateFields({ firstName: e.target.value })}
                  placeholder="First Name"
                  type="text"
                  value={firstName}
                />
              </FormItem>
              <FormItem
                htmlFor="company-admin-middle-name"
                label="Middle Name"
                isRequired
              >
                <Input
                  id="company-admin-middle-name"
                  name="company-admin-middle-name"
                  onChange={(e) => updateFields({ middleName: e.target.value })}
                  placeholder="Middle Name"
                  type="text"
                  value={middleName}
                />
              </FormItem>
              <FormItem
                htmlFor="company-admin-birthdate"
                label="Birthdate"
                isRequired
              >
                <Input
                  id="company-admin-birthdate"
                  name="company-admin-birthdate"
                  onChange={(e) => updateFields({ birthdate: e.target.value })}
                  placeholder="yyyy-mm-dd"
                  type="date"
                  value={birthdate}
                />
              </FormItem>
            </Flex>
            <Flex flexDirection="column" gap={4}>
              <FormItem
                htmlFor="company-admin-nickname"
                label="Nickname"
                isRequired
              >
                <Input
                  id="company-admin-nickname"
                  name="company-admin-nickname"
                  onChange={(e) => updateFields({ nickname: e.target.value })}
                  placeholder="Nickname"
                  type="text"
                  value={nickname}
                />
              </FormItem>
              <FormItem
                htmlFor="company-admin-last-name"
                label="Last Name"
                isRequired
              >
                <Input
                  id="company-admin-last-name"
                  name="company-admin-last-name"
                  onChange={(e) => updateFields({ lastName: e.target.value })}
                  placeholder="Last Name"
                  type="text"
                  value={lastName}
                />
              </FormItem>
              <FormItem
                htmlFor="company-admin-gender"
                label="Gender"
                isRequired
              >
                <SelectGender
                  id="company-admin-gender"
                  name="company-admin-gender"
                  onChange={(e) => updateFields({ genderId: e.target.value })}
                  value={genderId}
                />
              </FormItem>
            </Flex>
          </Grid>
          <FormItem
            htmlFor="company-admin-phone-number"
            label="Mobile Number"
            isRequired
          >
            <Input
              id="company-admin-phone-number"
              name="company-admin-phone-number"
              onChange={(e) => updateFields({ phoneNumber: e.target.value })}
              placeholder="09123456789"
              type="text"
              value={phoneNumber}
            />
          </FormItem>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Step6;
