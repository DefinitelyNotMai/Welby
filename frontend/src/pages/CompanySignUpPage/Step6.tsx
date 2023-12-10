// lib
import { Flex, Grid, Heading, Input } from "@chakra-ui/react";

// local
import { FormItem } from "../../components/Form/FormItem";
import { SelectGender } from "../../components/Form/Select";
import { UploadPhoto } from "../../components/Form/UploadPhoto";

type Step6Data = {
  ProfilePhoto: string;
  Password: string;
  Confirm_Password: string;
  First_Name: string;
  Nickname: string;
  Middle_Name: string;
  Last_Name: string;
  Birthday: string;
  GenderId: number;
  Phone_Number: string;
  companyEmail: string;
  Name: string;
};

type Step6Props = Step6Data & {
  updateFields: (fields: Partial<Step6Data>) => void;
};

export const Step6 = ({
  ProfilePhoto,
  Password,
  Confirm_Password,
  First_Name,
  Nickname,
  Middle_Name,
  Last_Name,
  Birthday,
  GenderId,
  Phone_Number,
  companyEmail,
  Name,
  updateFields,
}: Step6Props) => {
  return (
    <Flex flexDirection="column" padding={8}>
      <Flex flexDirection="column" marginBottom={10} textAlign="center">
        <Heading fontSize="2.5rem">Hello Company Admin of</Heading>
        <Heading fontSize="3rem">{Name}</Heading>
        <Heading fontSize="1.875rem" fontWeight="normal">
          Please introduce yourself.
        </Heading>
      </Flex>
      <Flex flexDirection="column" alignItems="center" justifyContent="center">
        <FormItem htmlFor="company-admin-profile-photo">
          <UploadPhoto
            buttonWidth={["100%", "100%"]}
            id="company-admin-profile-photo"
            name="company-admin-profile-photo"
            label="Profile Photo"
            onChange={(e) => updateFields({ ProfilePhoto: e })}
            value={ProfilePhoto}
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
              onChange={(e) => updateFields({ Password: e.target.value })}
              placeholder="Password"
              type="password"
              value={Password}
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
                updateFields({ Confirm_Password: e.target.value })
              }
              placeholder="Confirm Password"
              type="password"
              value={Confirm_Password}
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
                  onChange={(e) => updateFields({ First_Name: e.target.value })}
                  placeholder="First Name"
                  value={First_Name}
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
                    updateFields({ Middle_Name: e.target.value })
                  }
                  placeholder="Middle Name"
                  value={Middle_Name}
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
                  onChange={(e) => updateFields({ Birthday: e.target.value })}
                  placeholder="yyyy-mm-dd"
                  type="date"
                  value={Birthday}
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
                  onChange={(e) => updateFields({ Nickname: e.target.value })}
                  placeholder="Nickname"
                  value={Nickname}
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
                  onChange={(e) => updateFields({ Last_Name: e.target.value })}
                  placeholder="Last Name"
                  value={Last_Name}
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
                    updateFields({ GenderId: parseInt(e.target.value, 10) })
                  }
                  value={GenderId}
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
              onChange={(e) => updateFields({ Phone_Number: e.target.value })}
              placeholder="09123456789"
              value={Phone_Number}
            />
          </FormItem>
        </Flex>
      </Flex>
    </Flex>
  );
};
