import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { fetchData } from "../../../api/fetchData";
import { UserContext } from "../../../context/UserContext";
import { getDateToday } from "../../../api/getDates";

type DailyCheckInResultProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const DailyCheckInResult = ({
  isOpen,
  onClose,
}: DailyCheckInResultProps) => {
  const [result, setResult] = useState();

  const userContext = useContext(UserContext);
  const userId = localStorage.getItem("userId") || 0;
  const checkInUrl = "https://localhost:44373/api/GetAllDailyCheckIn";
  const resultsUrl = "https://localhost:44373/api/GetAllResults";

  useEffect(() => {
    const fetchCheckInData = async () => {
      const data = await fetchData(checkInUrl, {
        DailyCheckInId: 0,
        EmployeeId: userId,
        CompanyId: userContext.companyId,
        Active: true,
        DateFrom: getDateToday(),
        DateTo: getDateToday(),
      });

      if (data.length > 0) {
        const conditions = [
          "EnergyAtWork_value",
          "FocusAtWork_value",
          "PositiveEmotions_value",
          "NegativeEmotions_value",
        ];

        const conditionMappings: { [key: string]: number } = {
          "High,High,High,High": 1,
          "High,High,High,Low": 2,
          "High,High,Low,High": 1,
          "High,Low,High,High": 4,
          "Low,High,High,High": 5,
          "High,High,Low,Low": 6,
          "High,Low,Low,High": 7,
          "Low,Low,High,High": 7,
          "High,Low,High,Low": 8,
          "Low,High,Low,High": 9,
          "High,Low,Low,Low": 10,
          "Low,High,Low,Low": 11,
          "Low,Low,High,Low": 10,
          "Low,Low,Low,High": 12,
          "Low,Low,Low,Low": 12,
        };

        const conditionString = conditions
          .map((condition) => data[0][condition])
          .join(",");
        const resultId = conditionMappings[conditionString] || 0;
        fetchResults(resultId);
      }
    };

    const fetchResults = async (resultId: number) => {
      const data = await fetchData(resultsUrl, {
        ResultsId: resultId,
        Active: true,
      });
      setResult(data[0].ResultDescription);
    };

    fetchCheckInData();
  }, [userContext.companyId, userId]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent
        backgroundColor="#ffffff"
        border="2px solid #000000"
        minWidth="35%"
      >
        <ModalHeader color="#000000">Daily Check-in Result</ModalHeader>
        <ModalBody textAlign="center" padding={8}>
          {result}
        </ModalBody>
        <ModalCloseButton color="#000000" />
      </ModalContent>
    </Modal>
  );
};
