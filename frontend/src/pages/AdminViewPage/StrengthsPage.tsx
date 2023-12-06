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
import { STRENGTH_DATA, Strength } from "../../data/strength";
import {
  StrengthAdd,
  StrengthDelete,
  StrengthUpdate,
} from "../../components/Modal/AdminView/StrengthModal";
import { TbFilePencil, TbFilePlus, TbTrash } from "react-icons/tb";

export const StrengthsPage = () => {
  document.title = "Strengths | Welby";

  const [strengths, setStrengths] = useState<Strength[]>([]);
  const [strengthData, setStrengthData] = useState<Strength>(STRENGTH_DATA);
  const [currentMode, setCurrentMode] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetchData, setFetchData] = useState<boolean>(true);

  const itemsPerPage = 10;

  useEffect(() => {
    const strengthUrl = "https://localhost:44373/api/GetStrengths";
    const fetchAndSetStrengths = async () => {
      try {
        const strength = await axios.get(strengthUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: {
            StrengthId: 0,
            Strength: "",
            Category: "",
            Description: "",
            Active: false,
          },
        });
        const data = strength.data;
        const strengths = data.map((c: Strength) => {
          return {
            ...c,
          };
        });
        setStrengths(strengths);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    if (fetchData) {
      fetchAndSetStrengths();
      setFetchData(false);
    }
  }, [fetchData]);

  const updateStrengthFields = (fields: Partial<Strength>) => {
    setStrengthData((prev) => {
      return { ...prev, ...fields };
    });
  };

  // pagination start
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const startNumber = startIndex + 1;
  const displayedStrengths = strengths.slice(startIndex, endIndex);
  const totalPages = Math.ceil(strengths.length / itemsPerPage);

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

  const handleRowClick = (strength: Strength) => {
    if (currentMode) {
      setStrengthData(strength);
      console.log(strength);
      setIsFormOpen(true);
    }
  };

  const handleClose = () => {
    setFetchData(true);
    setIsFormOpen(false);
    setCurrentMode("");
    setStrengthData(STRENGTH_DATA);
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
              <Th>Strength Id</Th>
              <Th>Strength</Th>
              <Th>Category</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayedStrengths.map((strength, index) => (
              <Tr
                key={index}
                _hover={{ backgroundColor: currentMode !== "" && "#ebebeb" }}
                backgroundColor={index % 2 === 0 ? "#f5f5f5" : "#ffffff"}
                borderBottom={index % 2 === 0 ? "#ffffff" : "#f5f5f5"}
                cursor={currentMode !== "" ? "pointer" : "default"}
                onClick={() => handleRowClick(strength)}
              >
                <Td whiteSpace="normal">{startNumber + index}</Td>
                <Td whiteSpace="normal">
                  {strength.Active === false ? "0" : "1"}
                </Td>
                <Td whiteSpace="normal">{strength.StrengthId}</Td>
                <Td whiteSpace="normal">{strength.Strength}</Td>
                <Td whiteSpace="normal">{strength.Category}</Td>
                <Td whiteSpace="normal">{strength.Description}</Td>
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
        <StrengthAdd
          isOpen={isFormOpen}
          onClose={handleClose}
          updateFields={updateStrengthFields}
          {...strengthData}
        />
      )}
      {currentMode === "Update" && (
        <StrengthUpdate
          isOpen={isFormOpen}
          onClose={handleClose}
          updateFields={updateStrengthFields}
          {...strengthData}
        />
      )}
      {currentMode === "Delete" && (
        <StrengthDelete
          isOpen={isFormOpen}
          onClose={handleClose}
          {...strengthData}
        />
      )}
    </Flex>
  );
};
