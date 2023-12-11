// lib
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Grid,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

// local
import { UserContext } from "../../context/UserContext";
import { fetchData } from "../../api/fetchData";
import { COMPANY_DATA, Company } from "../../data/company";
import {
  SelectCompanySize,
  SelectCountry,
  SelectIndustryType,
} from "../Form/Select";
import { UploadPhoto } from "../Form/UploadPhoto";
import { GiCancel } from "react-icons/gi";
import { FaSave } from "react-icons/fa";
import axios from "axios";

type CompanyProfileProps = {
  edit: boolean;
  onClose: () => void;
};

type FormatOptions = {
  month: "long";
  day: "numeric";
  year: "numeric";
};

export const CompanyProfile = ({ edit, onClose }: CompanyProfileProps) => {
  const [companyData, setCompanyData] = useState<Company>(COMPANY_DATA);
  const [fetched, setFetched] = useState<boolean>(true);

  const userContext = useContext(UserContext);
  const toast = useToast();

  useEffect(() => {
    const companyUrl = "https://localhost:44373/api/GetCompanies";

    const fetchCompanyData = async () => {
      try {
        const result = await fetchData(companyUrl, {
          CompanyId: userContext.companyId,
        });
        if (result) {
          setCompanyData(result[0]);
        }
      } catch (error) {
        console.error("Error fetching company data: ", error);
      }
    };

    if (fetched) {
      setFetched(false);
      fetchCompanyData();
    }
  }, [companyData, fetched, userContext.companyId]);

  const handleSave = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const updateCompanyUrl = "https://localhost:44373/api/UpdateCompany";
    const company = {
      CompanyId: companyData.CompanyId,
      Logo: companyData.Logo,
      Name: companyData.Name,
      Email: companyData.Email,
      Phone_Number: companyData.Phone_Number,
      Website: companyData.Website,
      FoundingDate: companyData.FoundingDate,
      Address: companyData.Address,
      CountryId: companyData.CountryId,
      IndustryTypeId: companyData.IndustryTypeId,
      CompanySize: companyData.CompanySize,
      TakeAssessment: false,
      Active: true,
      Encoded_By: localStorage.getItem("userId"),
    };
    axios
      .patch(updateCompanyUrl, company, config)
      .then(() => {
        toast({
          description: `Company profile has been updated.`,
          duration: 5000,
          isClosable: true,
          position: "top",
          status: "success",
          title: "SUCCESS",
        });
        setFetched(true);
        onClose();
      })
      .catch((error) => {
        console.error("An error occurred: ", error);
        toast({
          description: `Failed to update company profile. Please try again.`,
          duration: 5000,
          isClosable: true,
          position: "top",
          status: "error",
          title: "Error",
        });
      });
  };

  const updateCompanyFields = (fields: Partial<Company>) => {
    setCompanyData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const formatFoundingDate = (date: string): string => {
    const options: FormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const foundingDate = new Date(date);
    return foundingDate.toLocaleDateString("en-US", options);
  };

  const formatEditedFoundingDate = (foundingDate: string): string => {
    const date = new Date(foundingDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (edit) {
    return (
      <Flex flexDirection="column" gap={4} height="full">
        <UploadPhoto
          buttonWidth={["100%", "100%"]}
          id="logo"
          label="Logo"
          name="logo"
          onChange={(e) => updateCompanyFields({ Logo: e })}
          value={companyData.Logo}
        />
        <Input
          fontSize="1.125rem"
          onChange={(e) => updateCompanyFields({ Name: e.target.value })}
          textAlign="center"
          variant="edit-profile"
          value={companyData.Name}
        />
        <Divider />
        <Flex alignSelf="center" flexDirection="column" width="75%">
          <Grid
            fontWeight="medium"
            gap={8}
            templateColumns="1fr 1fr"
            width="full"
          >
            <Flex
              alignItems="flex-end"
              justifyContent="center"
              flexDirection="column"
              gap={8}
            >
              <Text color="#bcbcbc">Headquarters:</Text>
              <Text color="#bcbcbc">Company Size:</Text>
            </Flex>
            <Flex alignItems="flex-start" flexDirection="column" gap={2}>
              <SelectCountry
                id="country"
                name="country"
                onChange={(e) =>
                  updateCompanyFields({ CountryId: parseInt(e.target.value) })
                }
                value={companyData.CountryId}
              />
              <SelectCompanySize
                id="company-size"
                name="company-size"
                onChange={(e) =>
                  updateCompanyFields({ CompanySize: e.target.value })
                }
                value={companyData.CompanySize}
              />
            </Flex>
          </Grid>
        </Flex>
        <Divider />
        <Flex
          alignSelf="center"
          flexDirection="column"
          fontWeight="medium"
          gap={4}
          width="75%"
        >
          <Text color="#bcbcbc">Contact Information</Text>
          <Grid gap={8} templateColumns="1fr 1fr" width="full">
            <Flex
              alignItems="flex-end"
              flexDirection="column"
              gap={8}
              justifyContent="center"
            >
              <Text color="#bcbcbc">Phone:</Text>
              <Text color="#bcbcbc">Email:</Text>
              <Text color="#bcbcbc">Website:</Text>
            </Flex>
            <Flex alignItems="flex-start" flexDirection="column" gap={2}>
              <Input
                onChange={(e) =>
                  updateCompanyFields({ Phone_Number: e.target.value })
                }
                textAlign="center"
                variant="edit-profile"
                value={companyData.Phone_Number}
              />
              <Input
                onChange={(e) => updateCompanyFields({ Email: e.target.value })}
                textAlign="center"
                variant="edit-profile"
                value={companyData.Email}
              />
              <Input
                onChange={(e) =>
                  updateCompanyFields({ Website: e.target.value })
                }
                textAlign="center"
                variant="edit-profile"
                value={companyData.Website}
              />
            </Flex>
          </Grid>
        </Flex>
        <Divider />
        <Flex
          alignSelf="center"
          flexDirection="column"
          fontWeight="medium"
          gap={4}
          width="100%"
        >
          <Text color="#bcbcbc" marginLeft={16}>
            Custom Information
          </Text>
          <Grid gap={8} templateColumns="1fr 1fr" width="full">
            <Flex alignItems="flex-end" flexDirection="column" gap={8}>
              <Text color="#bcbcbc">Industry:</Text>
              <Text color="#bcbcbc">Founded:</Text>
            </Flex>
            <Flex
              alignItems="flex-start"
              flexDirection="column"
              gap={2}
              width="full"
            >
              <SelectIndustryType
                id="industryType"
                name="industryType"
                onChange={(e) =>
                  updateCompanyFields({
                    IndustryTypeId: parseInt(e.target.value),
                  })
                }
                value={companyData.IndustryTypeId}
              />
              <Input
                onChange={(e) =>
                  updateCompanyFields({ FoundingDate: e.target.value })
                }
                textAlign="center"
                type="date"
                variant="edit-profile"
                value={formatEditedFoundingDate(companyData.FoundingDate)}
              />
            </Flex>
          </Grid>
          <Flex justifyContent="space-around" flex={1}>
            <Button
              leftIcon={<GiCancel style={{ color: "#d95555 " }} />}
              onClick={onClose}
              variant="section-secondary"
            >
              Cancel
            </Button>
            <Button
              leftIcon={<FaSave style={{ color: "#24a2f0 " }} />}
              onClick={handleSave}
              variant="section-secondary"
            >
              Save
            </Button>
          </Flex>
        </Flex>
      </Flex>
    );
  } else {
    return (
      <Flex flexDirection="column" gap={4} height="full">
        <Avatar alignSelf="center" boxSize={48} src={companyData.Logo} />
        <Text alignSelf="center" color="black" fontSize="1.125rem">
          {companyData.Name}
        </Text>
        <Divider />
        <Flex alignSelf="center" flexDirection="column" width="75%">
          <Grid
            fontWeight="medium"
            gap={8}
            templateColumns="1fr 1fr"
            width="full"
          >
            <Flex alignItems="flex-end" flexDirection="column" gap={2}>
              <Text color="#bcbcbc">Headquarters:</Text>
              <Text color="#bcbcbc">Company Size:</Text>
            </Flex>
            <Flex alignItems="flex-start" flexDirection="column" gap={2}>
              <Text color="#34313a">{companyData.CompanyLocation}</Text>
              <Text color="#34313a">{companyData.CompanySize}</Text>
            </Flex>
          </Grid>
        </Flex>
        <Divider />
        <Flex
          alignSelf="center"
          flexDirection="column"
          fontWeight="medium"
          gap={4}
          width="75%"
        >
          <Text color="#bcbcbc">Contact Information</Text>
          <Grid gap={8} templateColumns="1fr 1fr" width="full">
            <Flex alignItems="flex-end" flexDirection="column" gap={2}>
              <Text color="#bcbcbc">Phone:</Text>
              <Text color="#bcbcbc">Email:</Text>
              <Text color="#bcbcbc">Website:</Text>
            </Flex>
            <Flex alignItems="flex-start" flexDirection="column" gap={2}>
              <Text color="#34313a">{companyData.Phone_Number}</Text>
              <Text color="#34313a">{companyData.Email}</Text>
              <Text color="#34313a">{companyData.Website}</Text>
            </Flex>
          </Grid>
        </Flex>
        <Divider />
        <Flex
          alignSelf="center"
          flexDirection="column"
          fontWeight="medium"
          gap={4}
          width="75%"
        >
          <Text color="#bcbcbc">Custom Information</Text>
          <Grid gap={8} templateColumns="1fr 1fr" width="full">
            <Flex alignItems="flex-end" flexDirection="column" gap={2}>
              <Text color="#bcbcbc">Industry:</Text>
              <Text color="#bcbcbc">Founded:</Text>
            </Flex>
            <Flex alignItems="flex-start" flexDirection="column" gap={2}>
              <Text color="#34313a">{companyData.IndustryTypeDisplay}</Text>
              <Text color="#34313a">
                {formatFoundingDate(companyData.FoundingDate)}
              </Text>
            </Flex>
          </Grid>
        </Flex>
      </Flex>
    );
  }
};
