import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { fetchData } from "../../../../api/fetchData";
import { UserContext } from "../../../../context/UserContext";
import { getDateToday } from "../../../../api/getDates";
import Pagination from "../../../Disclosure/Pagination";

type Factor8ResultProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Factor8Result = ({ isOpen, onClose }: Factor8ResultProps) => {
  const [result, setResult] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const sentencesPerPage = 1; // Adjust as needed

  const userContext = useContext(UserContext);
  const userId = localStorage.getItem("userId") || 0;
  const tiseUrl = "https://localhost:44373/api/GetAllTise";
  const resultsUrl = "https://localhost:44373/api/GetAllResults";

  useEffect(() => {
    const fetchTiseData = async () => {
      const tdata = await fetchData(tiseUrl, {
        TiseId: 0,
        EmployeeId: userId,
        CompanyId: userContext.companyId,
        Active: true,
        DateFrom: getDateToday(),
        DateTo: getDateToday(),
      });

      const result = tdata[0].Factor_8;
      console.log(result);
      const fetchResults = async (resultId: number) => {
        const data = await fetchData(resultsUrl, {
          ResultsId: resultId,
          Active: true,
        });
        const resultText = data[0].ResultDescription;
        const sentences = resultText.split("|");
        setResult(sentences);
        setCurrentPage(1);
      };

      if (tdata.length > 0) {
        fetchResults(34);
      }
    };

    fetchTiseData();
  }, [userContext.companyId, userId]);

  const onNextPage = () => {
    if (currentPage < Math.ceil(result.length / sentencesPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const onPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

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
        backgroundColor="#ffff00"
        border="3px solid #000000"
        boxShadow="5px 5px #000000"
        minWidth="35%"
      >
        <ModalHeader color="#000000">Presenteeism Results</ModalHeader>
        <ModalBody textAlign="center" padding={8}>
          {result.length > 0 && (
            <>
              <Flex marginBottom={8}>
                {result[(currentPage - 1) * sentencesPerPage]}
              </Flex>
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(result.length / sentencesPerPage)}
                onNextPage={onNextPage}
                onPrevPage={onPrevPage}
              />
            </>
          )}
        </ModalBody>
        <ModalCloseButton color="#000000" />
      </ModalContent>
    </Modal>
  );
};
