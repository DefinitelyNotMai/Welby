// lib
import { Flex, Grid, GridItem, Heading, Input } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

// local
import { FormItem } from "../../components/Form/FormItem";
import { SelectCountry, SelectGender } from "../../components/Form/Select";
import { UploadPhoto } from "../../components/Form/UploadPhoto";
import { UserContext } from "../../context/UserContext";
import { fetchData } from "../../api/fetchData";

type Step1Data = {
  First_Name: string;
  Middle_Name: string;
  Birthday: string;
  Nickname: string;
  Last_Name: string;
  GenderId: number;
  Phone_Number: string;
  CountryId: number;
  Instagram: string;
  TikTok: string;
  Linkedin: string;
  Facebook: string;
  ProfilePhoto: string;
  Email: string;
  Password: string;
  CompanyPosition: string;
};

type Step1Props = Step1Data & {
  updateFields: (fields: Partial<Step1Data>) => void;
};

export const Step1 = ({
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
  Email,
  Password,
  Linkedin,
  Facebook,
  ProfilePhoto,
  CompanyPosition,
  updateFields,
}: Step1Props) => {
  const [companyName, setCompanyName] = useState<string>("");

  const userContext = useContext(UserContext);

  useEffect(() => {
    const companyUrl = "https://localhost:44373/api/GetCompanies";

    const fetchCompanyData = async () => {
      try {
        const result = await fetchData(companyUrl, {
          CompanyId: userContext.companyId,
        });
        if (result) {
          setCompanyName(result[0].Name);
        }
      } catch (error) {
        console.error("Error fetching company data: ", error);
      }
    };

    fetchCompanyData();
  }, [userContext.companyId]);

  return (
    <Grid gap={4} templateColumns={["2fr 1fr"]} padding={[8, 16]}>
      <GridItem colSpan={3} textAlign="center">
        <Heading fontSize="2.5rem">Welcome to</Heading>
        <Heading fontSize="3.125rem" marginBottom={4}>
          {companyName}
        </Heading>
        <Heading fontSize="1.875rem" marginBottom={10}>
          Please introduce yourself.
        </Heading>
      </GridItem>
      <Grid gap={4} templateColumns={["1fr 1fr"]}>
        <Flex flexDirection="column" gap={4}>
          <FormItem htmlFor="email" label="Email" isRequired>
            <Input
              autoComplete="off"
              disabled
              id="email"
              name="email"
              onChange={(e) => updateFields({ Email: e.target.value })}
              placeholder="Email"
              type="email"
              value={Email !== undefined ? Email : ""}
            />
          </FormItem>
          <FormItem htmlFor="first-name" label="First Name" isRequired>
            <Input
              autoComplete="off"
              id="first-name"
              name="first-name"
              onChange={(e) => updateFields({ First_Name: e.target.value })}
              placeholder="First Name"
              value={First_Name}
            />
          </FormItem>
          <FormItem htmlFor="middle-name" label="Middle Name" isRequired>
            <Input
              id="middle-name"
              name="middle-name"
              onChange={(e) => updateFields({ Middle_Name: e.target.value })}
              placeholder="Middle Name"
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
          <FormItem htmlFor="password" label="Password" isRequired>
            <Input
              autoComplete="off"
              id="password"
              name="password"
              onChange={(e) => updateFields({ Password: e.target.value })}
              placeholder="Password"
              type="password"
              value={Password}
            />
          </FormItem>
          <FormItem htmlFor="nickname" label="Nickname" isRequired>
            <Input
              id="nickname"
              name="nickname"
              onChange={(e) => updateFields({ Nickname: e.target.value })}
              placeholder="Nickname"
              value={Nickname}
            />
          </FormItem>
          <FormItem htmlFor="last-name" label="Last Name" isRequired>
            <Input
              id="last-name"
              name="last-name"
              onChange={(e) => updateFields({ Last_Name: e.target.value })}
              placeholder="Last Name"
              value={Last_Name}
            />
          </FormItem>
          <FormItem htmlFor="gender" label="Gender" isRequired>
            <SelectGender
              id="gender"
              name="gender"
              onChange={(e) =>
                updateFields({ GenderId: parseInt(e.target.value) })
              }
              value={GenderId}
            />
          </FormItem>
        </Flex>
        <GridItem colSpan={2}>
          <FormItem htmlFor="position" label="Position" isRequired>
            <Input
              id="position"
              name="position"
              onChange={(e) =>
                updateFields({ CompanyPosition: e.target.value })
              }
              placeholder=""
              value={CompanyPosition}
            />
          </FormItem>
        </GridItem>
        <GridItem colSpan={2}>
          <FormItem htmlFor="phone-number" label="Phone Number" isRequired>
            <Input
              id="phone-number"
              name="phone-number"
              onChange={(e) => updateFields({ Phone_Number: e.target.value })}
              placeholder="09123456789"
              value={Phone_Number}
            />
          </FormItem>
        </GridItem>
        <GridItem colSpan={2}>
          <FormItem htmlFor="location" label="Location" isRequired>
            <SelectCountry
              id="location"
              name="location"
              onChange={(e) =>
                updateFields({ CountryId: parseInt(e.target.value) })
              }
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
              value={Instagram}
            />
          </FormItem>
          <FormItem htmlFor="tiktok" label="TikTok">
            <Input
              id="tiktok"
              name="tiktok"
              onChange={(e) => updateFields({ TikTok: e.target.value })}
              placeholder="TikTok"
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
              value={Linkedin}
            />
          </FormItem>
          <FormItem htmlFor="facebook" label="Facebook">
            <Input
              id="facebook"
              name="facebook"
              onChange={(e) => updateFields({ Facebook: e.target.value })}
              placeholder="Facebook"
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
