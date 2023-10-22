import { Flex, Grid, Heading } from "@chakra-ui/react";
import CustomText from "../../components/CustomText";
import {
  CustomTextbox,
  DateTimePicker,
  UploadPhoto,
} from "../../components/Form/CustomInput";
import { SelectGender } from "../../components/Form/CustomSelect";
import FormItem from "../../components/Form/FormItem";
import { CompanyFormData } from "./SignUp";

type Step6Data = {
  AdminProfilePhoto: string;
  AdminPassword: string;
  AdminConfirmPassword: string;
  AdminFirstName: string;
  AdminNickname: string;
  AdminMiddleName: string;
  AdminLastName: string;
  AdminBirthdate: string;
  AdminGender: string;
  AdminPhoneNumber: string;
};

type Step6Props = Step6Data & {
  CompanyData: CompanyFormData;
  updateFields: (fields: Partial<Step6Data>) => void;
};

const Step6 = ({
  AdminProfilePhoto,
  AdminPassword,
  AdminConfirmPassword,
  AdminFirstName,
  AdminNickname,
  AdminMiddleName,
  AdminLastName,
  AdminBirthdate,
  AdminGender,
  AdminPhoneNumber,
  CompanyData,
  updateFields,
}: Step6Props) => {
  return (
    <Flex flexDirection="column" padding={8}>
      <Heading as="h1" marginBottom={8} textAlign="center">
        <CustomText fontWeight="bold">Hello Company Admin of</CustomText>
        <CustomText fontWeight="bold">{CompanyData.Name}</CustomText>
        <CustomText fontWeight="bold">Please introduce yourself.</CustomText>
      </Heading>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <FormItem htmlFor="company-admin-photo">
          <UploadPhoto
            id="company-admin-photo"
            label="Profile Photo"
            name="company-admin-photo"
            onChange={(e) => updateFields({ AdminProfilePhoto: e ?? "" })}
            value={AdminProfilePhoto}
          />
        </FormItem>
        <Flex flexDirection="column" width={["100%", "80%", "60%"]} gap={4}>
          <FormItem htmlFor="" label="Email">
            <CustomText>{CompanyData.Email}</CustomText>
          </FormItem>
          <FormItem
            htmlFor="company-admin-password"
            label="Password"
            isRequired
          >
            <CustomTextbox
              autoComplete="new-password"
              id="company-admin-password"
              name="company-admin-password"
              onChange={(e) => updateFields({ AdminPassword: e.target.value })}
              placeholder="Password"
              type="password"
              value={AdminPassword}
            />
          </FormItem>
          <FormItem
            htmlFor="company-admin-confirm-password"
            label="Confirm Password"
            isRequired
          >
            <CustomTextbox
              autoComplete="new-password"
              id="company-admin-confirm-password"
              name="company-admin-confirm-password"
              onChange={(e) =>
                updateFields({ AdminConfirmPassword: e.target.value })
              }
              placeholder="Confirm Password"
              type="password"
              value={AdminConfirmPassword}
            />
          </FormItem>
          <Grid templateColumns={["1fr", "1fr 1fr"]} gap={[4, 8]}>
            <Flex flexDirection="column" gap={4}>
              <FormItem
                htmlFor="company-admin-first-name"
                label="First Name"
                isRequired
              >
                <CustomTextbox
                  autoComplete="given-name"
                  id="company-admin-first-name"
                  name="company-admin-first-name"
                  onChange={(e) =>
                    updateFields({ AdminFirstName: e.target.value })
                  }
                  placeholder="First Name"
                  type="text"
                  value={AdminFirstName}
                />
              </FormItem>
              <FormItem
                htmlFor="company-admin-middle-name"
                label="Middle Name"
                isRequired
              >
                <CustomTextbox
                  autoComplete="additional-name"
                  id="company-admin-middle-name"
                  name="company-admin-middle-name"
                  onChange={(e) =>
                    updateFields({ AdminMiddleName: e.target.value })
                  }
                  placeholder="Middle Name"
                  type="text"
                  value={AdminMiddleName}
                />
              </FormItem>
              <FormItem
                htmlFor="company-admin-birthdate"
                label="Birthdate"
                isRequired
              >
                <DateTimePicker
                  id="company-admin-birthdate"
                  name="company-admin-birthdate"
                  onChange={(e) =>
                    updateFields({ AdminBirthdate: e.target.value })
                  }
                  value={AdminBirthdate}
                />
              </FormItem>
            </Flex>
            <Flex flexDirection="column" gap={4}>
              <FormItem
                htmlFor="company-admin-nickname"
                label="Nickname"
                isRequired
              >
                <CustomTextbox
                  autoComplete="off"
                  id="company-admin-nickname"
                  name="company-admin-nickname"
                  placeholder="Nickname"
                  onChange={(e) =>
                    updateFields({ AdminNickname: e.target.value })
                  }
                  type="text"
                  value={AdminNickname}
                />
              </FormItem>
              <FormItem
                htmlFor="company-admin-last-name"
                label="Last Name"
                isRequired
              >
                <CustomTextbox
                  autoComplete="family-name"
                  id="company-admin-last-name"
                  name="company-admin-last-name"
                  onChange={(e) =>
                    updateFields({ AdminLastName: e.target.value })
                  }
                  placeholder="Last Name"
                  type="text"
                  value={AdminLastName}
                />
              </FormItem>
              <FormItem htmlFor="" label="Gender" isRequired>
                <SelectGender
                  onClick={(selectedGenderId) =>
                    updateFields({ AdminGender: selectedGenderId })
                  }
                  value={AdminGender}
                />
              </FormItem>
            </Flex>
          </Grid>
          <FormItem
            htmlFor="company-admin-phone-number"
            label="Mobile Number"
            isRequired
          >
            <CustomTextbox
              autoComplete="off"
              id="company-admin-phone-number"
              name="company-admin-phone-number"
              onChange={(e) =>
                updateFields({ AdminPhoneNumber: e.target.value })
              }
              placeholder="09123456789"
              type="text"
              value={AdminPhoneNumber}
            />
          </FormItem>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Step6;
