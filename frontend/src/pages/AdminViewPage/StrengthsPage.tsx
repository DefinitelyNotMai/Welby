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
import { STRENGTH_DATA, Strength } from "../../data/strength";

export const StrengthsPage = () => {
  document.title = "Strengths | Welby";

  const [strengths, setStrengths] = useState<Strength[]>([]);
  const [strengthData, setStrengthData] = useState<Strength>(STRENGTH_DATA);
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
    fetchAndSetStrengths();
  }, [strengthData]);

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
    setIsFormOpen(false);
    setCurrentMode("");
  };

  const handleDeleteStrength = () => {
    const strength = {
      StrengthId: strengthData.StrengthId,
      Encoded_By: 24287,
    };

    const deleteStrengthUrl = "https://localhost:44373/api/RemoveStrength";

    axios
      .patch(deleteStrengthUrl, strength, config)
      .then((response) => {
        console.log(response.data);
        toast({
          title: "SUCCESS",
          description: `Strength with Strength Id: ${strengthData.StrengthId} has been deleted.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsFormOpen(false);
        setCurrentMode("");
        setStrengthData(STRENGTH_DATA);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateStrength = () => {
    const strength = {
      StrengthId: strengthData.StrengthId,
      Strength: strengthData.Strength,
      Category: strengthData.Category,
      Description: strengthData.Description,
      Active: true,
      Encoded_By: 24287,
    };

    const updateStrengthUrl = "https://localhost:44373/api/UpdateStrength";

    axios
      .patch(updateStrengthUrl, strength, config)
      .then((response) => {
        console.log(response.data);
        toast({
          title: "Strength updated.",
          description: `Strength with StrengthId: ${strengthData.StrengthId} has been updated.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsFormOpen(false);
        setCurrentMode("");
        setStrengthData(STRENGTH_DATA);
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
                borderBottom="1px solid #ebebeb"
                onClick={() => handleRowClick(strength)}
              >
                <Td>{startNumber + index}</Td>
                <Td>{strength.Active === false ? "0" : "1"}</Td>
                <Td>{strength.StrengthId}</Td>
                <Td>{strength.Strength}</Td>
                <Td>{strength.Category}</Td>
                <Td>{strength.Description}</Td>
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
            <StrengthAdd
              handleCancel={handleClose}
              handleAddUpdate={handleDeleteStrength}
              isOpen={isFormOpen}
              onClose={handleClose}
              updateFields={updateStrengthFields}
              {...strengthData}
            />
          )}
          {currentMode === "Update" && (
            <StrengthUpdate
              handleCancel={handleClose}
              handleAddUpdate={handleUpdateStrength}
              isOpen={isFormOpen}
              onClose={handleClose}
              updateFields={updateStrengthFields}
              {...strengthData}
            />
          )}
          {currentMode === "Delete" && (
            <StrengthDelete
              handleCancel={handleClose}
              handleDelete={handleDeleteStrength}
              isOpen={isFormOpen}
              onClose={handleClose}
              {...strengthData}
            />
          )}
        </>
      )}
    </Flex>
  );
};
