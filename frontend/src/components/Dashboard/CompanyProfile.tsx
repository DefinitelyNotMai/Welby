// lib
import { Avatar, Divider, Flex, Grid, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

// local
import { UserContext } from "../../context/UserContext";
import { fetchData } from "../../api/fetchData";
import { COMPANY_DATA, Company } from "../../data/company";
import { INDUSTRY_TYPE_DATA, IndustryType } from "../../data/industryType";

export const CompanyProfile = () => {
  const [companyData, setCompanyData] = useState<Company>(COMPANY_DATA);
  useState<IndustryType>(INDUSTRY_TYPE_DATA);

  const userContext = useContext(UserContext);

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
    fetchCompanyData();
  }, [userContext.companyId]);

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
            <Text color="#34313a">{companyData.FoundingDate}</Text>
          </Flex>
        </Grid>
      </Flex>
    </Flex>
  );
};
