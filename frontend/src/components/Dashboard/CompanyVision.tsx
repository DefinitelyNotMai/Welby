// lib
import { Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

// local
import { UserContext } from "../../context/UserContext";
import { fetchData } from "../../api/fetchData";

export const CompanyVision = () => {
  const [vision, setVision] = useState<string>("");

  const userContext = useContext(UserContext);

  useEffect(() => {
    const companyUrl = "https://localhost:44373/api/GetCompanies";

    const fetchVision = async () => {
      try {
        const result = await fetchData(companyUrl, {
          CompanyId: userContext.companyId,
        });
        if (result) {
          setVision(result[0].Vision);
        }
      } catch (error) {
        console.error("Error fetching company data: ", error);
      }
    };
    fetchVision();
  }, [userContext.companyId]);

  return <Text color="#34313a">{vision}</Text>;
};
