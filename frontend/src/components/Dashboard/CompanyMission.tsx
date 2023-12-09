// lib
import { Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

// local
import { UserContext } from "../../context/UserContext";
import { fetchData } from "../../api/fetchData";

type CompanyMissionProps = {
  onDataReceived: (data: string) => void;
};

export const CompanyMission = ({ onDataReceived }: CompanyMissionProps) => {
  const [mission, setMission] = useState<string>("");

  const userContext = useContext(UserContext);

  useEffect(() => {
    const companyUrl = "https://localhost:44373/api/GetCompanies";

    const fetchMission = async () => {
      try {
        const result = await fetchData(companyUrl, {
          CompanyId: userContext.companyId,
        });
        if (result) {
          setMission(result[0].Mission);
          onDataReceived(result[0].Mission);
        }
      } catch (error) {
        console.error("Error fetching company data: ", error);
      }
    };

    fetchMission();
  }, [userContext.companyId, onDataReceived]);

  return <Text color="#34313a">{mission}</Text>;
};
