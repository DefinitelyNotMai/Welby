import { Flex, Grid } from "@chakra-ui/react";
import FormItem from "../../components/Form/FormItem";
import Input from "../../components/Form/Input";
import { SelectGender } from "../../components/Form/Select";
import UploadPhoto from "../../components/Form/UploadPhoto";
import Heading from "../../components/Typography/Heading";

interface Step6Data {
  adminProfilePhoto: string;
  adminPassword: string;
  adminConfirmPassword: string;
  adminFirstName: string;
  adminNickname: string;
  adminMiddleName: string;
  adminLastName: string;
  adminBirthdate: string;
  adminGenderId: string;
  adminPhoneNumber: string;
  companyEmail: string;
  companyName: string;
}

interface Step6Props extends Step6Data {
  updateFields: (fields: Partial<Step6Data>) => void;
}

const Step6 = ({
  adminProfilePhoto,
  adminPassword,
  adminConfirmPassword,
  adminFirstName,
  adminNickname,
  adminMiddleName,
  adminLastName,
  adminBirthdate,
  adminGenderId,
  adminPhoneNumber,
  companyEmail,
  companyName,
  updateFields,
}: Step6Props) => {
  return (
    <Flex flexDirection="column" padding={8}>
      <Flex flexDirection="column" marginBottom={10} textAlign="center">
        <Heading fontSize={["xl", "3xl"]} variant="white">
          Hello Company Admin of
        </Heading>
        <Heading fontSize={["2xl", "4xl"]} variant="white">
          {companyName}
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
            onChange={(e) => updateFields({ adminProfilePhoto: e })}
            value={adminProfilePhoto}
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
              value={companyEmail}
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
              onChange={(e) => updateFields({ adminPassword: e.target.value })}
              placeholder="Password"
              type="password"
              value={adminPassword}
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
                updateFields({ adminConfirmPassword: e.target.value })
              }
              placeholder="Confirm Password"
              type="password"
              value={adminConfirmPassword}
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
                  onChange={(e) =>
                    updateFields({ adminFirstName: e.target.value })
                  }
                  placeholder="First Name"
                  type="text"
                  value={adminFirstName}
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
                  onChange={(e) =>
                    updateFields({ adminMiddleName: e.target.value })
                  }
                  placeholder="Middle Name"
                  type="text"
                  value={adminMiddleName}
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
                  onChange={(e) =>
                    updateFields({ adminBirthdate: e.target.value })
                  }
                  placeholder="yyyy-mm-dd"
                  type="date"
                  value={adminBirthdate}
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
                  onChange={(e) =>
                    updateFields({ adminNickname: e.target.value })
                  }
                  placeholder="Nickname"
                  type="text"
                  value={adminNickname}
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
                  onChange={(e) =>
                    updateFields({ adminLastName: e.target.value })
                  }
                  placeholder="Last Name"
                  type="text"
                  value={adminLastName}
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
                  onChange={(e) =>
                    updateFields({ adminGenderId: e.target.value })
                  }
                  value={adminGenderId}
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
              onChange={(e) =>
                updateFields({ adminPhoneNumber: e.target.value })
              }
              placeholder="09123456789"
              type="text"
              value={adminPhoneNumber}
            />
          </FormItem>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Step6;
