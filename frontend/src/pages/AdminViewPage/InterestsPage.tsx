// lib
import {
  Button,
  Flex,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

// local
import Pagination from "../../components/Disclosure/Pagination";
import { INTEREST_DATA, Interest } from "../../data/interest";

export const InterestsPage = () => {
  document.title = "Interests | Welby";

  const [interests, setInterests] = useState<Interest[]>([]);
  const [interestData, setInterestData] = useState<Interest>(INTEREST_DATA);
  const [currentMode, setCurrentMode] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 10;
  const toast = useToast();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const interestUrl = "https://localhost:44373/api/GetInterests";
    const fetchAndSetInterests = async () => {
      try {
        const interest = await axios.get(interestUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: {
            InterestId: 0,
            Name: "",
            Active: false,
          },
        });
        const data = interest.data;
        const interests = data.map((c: Interest) => {
          return {
            ...c,
          };
        });
        setInterests(interests);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchAndSetInterests();
  }, [interestData]);

  const updateInterestFields = (fields: Partial<Interest>) => {
    setInterestData((prev) => {
      return { ...prev, ...fields };
    });
  };

  // pagination start
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const startNumber = startIndex + 1;
  const displayedInterests = interests.slice(startIndex, endIndex);
  const totalPages = Math.ceil(interests.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleRowClick = (interest: Interest) => {
    if (currentMode) {
      setInterestData(interest);
      console.log(interest);
      setIsFormOpen(true);
    }
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setCurrentMode("");
  };

  const handleDeleteInterest = () => {
    const interest = {
      InterestId: interestData.InterestId,
      Encoded_By: 24287,
    };

    const deleteInterestUrl = "https://localhost:44373/api/RemoveInterest";

    axios
      .patch(deleteInterestUrl, interest, config)
      .then((response) => {
        console.log(response.data);
        toast({
          title: "SUCCESS",
          description: `Interest with Interest Id: ${interestData.InterestId} has been deleted.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsFormOpen(false);
        setCurrentMode("");
        setInterestData(INTEREST_DATA);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateInterest = () => {
    const interest = {
      InterestId: interestData.InterestId,
      Name: interestData.Name,
      Active: true,
      Encoded_By: 24287,
    };

    const updateInterestUrl = "https://localhost:44373/api/UpdateInterest";

    axios
      .patch(updateInterestUrl, interest, config)
      .then((response) => {
        console.log(response.data);
        toast({
          title: "Interest updated.",
          description: `Interest with InterestId: ${interestData.InterestId} has been updated.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsFormOpen(false);
        setCurrentMode("");
        setInterestData(INTEREST_DATA);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Flex flexDirection="column" marginLeft={4} marginTop={4}>
      <Flex flexDirection="row" gap={4} marginBottom={4} marginRight={4}>
        <Button
          borderColor={currentMode === "Add" ? "#44a348" : "#ebebeb"}
          variant="masterCrud"
          onClick={() => {
            if (currentMode === "Add") {
              setCurrentMode("");
            } else {
              setCurrentMode("Add");
              setIsFormOpen(true);
            }
          }}
          width="15%"
        >
          Add
        </Button>
        <Button
          borderColor={currentMode === "Update" ? "#24a2f0" : "#ebebeb"}
          variant="masterCrud"
          onClick={() => {
            if (currentMode === "Update") {
              setCurrentMode("");
            } else {
              setCurrentMode("Update");
            }
          }}
          width="15%"
        >
          Update
        </Button>
        <Spacer />
        <Button
          borderColor={currentMode === "Delete" ? "#d95555" : "#ebebeb"}
          variant="masterCrud"
          onClick={() => {
            if (currentMode === "Delete") {
              setCurrentMode("");
            } else {
              setCurrentMode("Delete");
            }
          }}
          width="15%"
        >
          Delete
        </Button>
      </Flex>

      <TableContainer
        backgroundColor="#ffffff"
        borderColor={
          currentMode === "Add"
            ? "#44a348"
            : currentMode === "Update"
              ? "#24a2f0"
              : currentMode === "Delete"
                ? "#d95555"
                : "#ebebeb"
        }
        borderRadius="1rem 0 0 1rem"
        borderWidth="2px"
      >
        <Table>
          <Thead>
            <Tr borderBottom="1px solid #ebebeb">
              <Th>No.</Th>
              <Th>Active</Th>
              <Th>Interest Id</Th>
              <Th>Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayedInterests.map((interest, index) => (
              <Tr
                key={index}
                borderBottom="1px solid #ebebeb"
                onClick={() => handleRowClick(interest)}
              >
                <Td>{startNumber + index}</Td>
                <Td>{interest.Active === false ? "0" : "1"}</Td>
                <Td>{interest.InterestId}</Td>
                <Td>{interest.Name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Flex justifyContent="center" marginTop={4} marginX={4}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
      </Flex>

      {isFormOpen && (
        <>
          {currentMode === "Add" && (
            <InterestAdd
              handleCancel={handleClose}
              handleAddUpdate={handleDeleteInterest}
              isOpen={isFormOpen}
              onClose={handleClose}
              updateFields={updateInterestFields}
              {...interestData}
            />
          )}
          {currentMode === "Update" && (
            <InterestUpdate
              handleCancel={handleClose}
              handleAddUpdate={handleUpdateInterest}
              isOpen={isFormOpen}
              onClose={handleClose}
              updateFields={updateInterestFields}
              {...interestData}
            />
          )}
          {currentMode === "Delete" && (
            <InterestDelete
              handleCancel={handleClose}
              handleDelete={handleDeleteInterest}
              isOpen={isFormOpen}
              onClose={handleClose}
              {...interestData}
            />
          )}
        </>
      )}
    </Flex>
  );
};
