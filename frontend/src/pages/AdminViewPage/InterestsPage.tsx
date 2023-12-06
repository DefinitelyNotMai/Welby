// lib
import {
  Button,
  Flex,
  Icon,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

// local
import Pagination from "../../components/Disclosure/Pagination";
import { INTEREST_DATA, Interest } from "../../data/interest";
import {
  InterestAdd,
  InterestDelete,
  InterestUpdate,
} from "../../components/Modal/AdminView/InterestModal";
import { TbFilePencil, TbFilePlus, TbTrash } from "react-icons/tb";

export const InterestsPage = () => {
  document.title = "Interests | Welby";

  const [interests, setInterests] = useState<Interest[]>([]);
  const [interestData, setInterestData] = useState<Interest>(INTEREST_DATA);
  const [currentMode, setCurrentMode] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetchData, setFetchData] = useState<boolean>(true);

  const itemsPerPage = 10;
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
    if (fetchData) {
      fetchAndSetInterests();
      setFetchData(false);
    }
  }, [fetchData]);

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
    setFetchData(true);
    setIsFormOpen(false);
    setCurrentMode("");
    setInterestData(INTEREST_DATA);
  };

  return (
    <Flex flexDirection="column" marginLeft={4} marginTop={4}>
      <Flex flexDirection="row" gap={4} marginBottom={4} marginRight={4}>
        <Button
          borderColor={currentMode === "Add" ? "#44a348" : "#ebebeb"}
          leftIcon={<Icon as={TbFilePlus} boxSize={6} color="#44a348" />}
          onClick={() => {
            if (currentMode === "Add") {
              setCurrentMode("");
            } else {
              setCurrentMode("Add");
              setIsFormOpen(true);
            }
          }}
          variant="masterCrud"
          width="15%"
        >
          Add
        </Button>
        <Button
          borderColor={currentMode === "Update" ? "#24a2f0" : "#ebebeb"}
          leftIcon={<Icon as={TbFilePencil} boxSize={6} color="#24a2f0" />}
          onClick={() => {
            if (currentMode === "Update") {
              setCurrentMode("");
            } else {
              setCurrentMode("Update");
            }
          }}
          variant="masterCrud"
          width="15%"
        >
          Update
        </Button>
        <Spacer />
        <Button
          borderColor={currentMode === "Delete" ? "#d95555" : "#ebebeb"}
          leftIcon={<Icon as={TbTrash} boxSize={6} color="#d95555" />}
          onClick={() => {
            if (currentMode === "Delete") {
              setCurrentMode("");
            } else {
              setCurrentMode("Delete");
            }
          }}
          variant="masterCrud"
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
                _hover={{ backgroundColor: currentMode !== "" && "#ebebeb" }}
                backgroundColor={index % 2 === 0 ? "#f5f5f5" : "#ffffff"}
                borderBottom={index % 2 === 0 ? "#ffffff" : "#f5f5f5"}
                cursor={currentMode !== "" ? "pointer" : "default"}
                onClick={() => handleRowClick(interest)}
              >
                <Td whiteSpace="normal">{startNumber + index}</Td>
                <Td whiteSpace="normal">
                  {interest.Active === false ? "0" : "1"}
                </Td>
                <Td whiteSpace="normal">{interest.InterestId}</Td>
                <Td whiteSpace="normal">{interest.Name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Flex justifyContent="center" margin={4}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
      </Flex>

      {currentMode === "Add" && (
        <InterestAdd
          isOpen={isFormOpen}
          onClose={handleClose}
          updateFields={updateInterestFields}
          {...interestData}
        />
      )}
      {currentMode === "Update" && (
        <InterestUpdate
          isOpen={isFormOpen}
          onClose={handleClose}
          updateFields={updateInterestFields}
          {...interestData}
        />
      )}
      {currentMode === "Delete" && (
        <InterestDelete
          isOpen={isFormOpen}
          onClose={handleClose}
          {...interestData}
        />
      )}
    </Flex>
  );
};
