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
import { VALUE_DATA, Value } from "../../data/value";

export const ValuesPage = () => {
  document.title = "Values | Welby";

  const [values, setValues] = useState<Value[]>([]);
  const [valueData, setValueData] = useState<Value>(VALUE_DATA);
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
    const valueUrl = "https://localhost:44373/api/GetValues";
    const fetchAndSetValues = async () => {
      try {
        const value = await axios.get(valueUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: {
            ValueId: 0,
            CompanyId: 0,
            Title: "",
            Description: "",
            Active: false,
          },
        });
        const data = value.data;
        const values = data.map((c: Value) => {
          return {
            ...c,
          };
        });
        setValues(values);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchAndSetValues();
  }, [valueData]);

  const updateValueFields = (fields: Partial<Value>) => {
    setValueData((prev) => {
      return { ...prev, ...fields };
    });
  };

  // pagination start
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const startNumber = startIndex + 1;
  const displayedValues = values.slice(startIndex, endIndex);
  const totalPages = Math.ceil(values.length / itemsPerPage);

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

  const handleRowClick = (value: Value) => {
    if (currentMode) {
      setValueData(value);
      console.log(value);
      setIsFormOpen(true);
    }
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setCurrentMode("");
  };

  const handleDeleteValue = () => {
    const value = {
      ValueId: valueData.ValueId,
      Encoded_By: 24287,
    };

    const deleteValueUrl = "https://localhost:44373/api/RemoveValue";

    axios
      .patch(deleteValueUrl, value, config)
      .then((response) => {
        console.log(response.data);
        toast({
          title: "SUCCESS",
          description: `Value with Value Id: ${valueData.ValueId} has been deleted.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsFormOpen(false);
        setCurrentMode("");
        setValueData(VALUE_DATA);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateValue = () => {
    const value = {
      ValueId: valueData.ValueId,
      CompanyId: valueData.CompanyId,
      Title: valueData.Title,
      Description: valueData.Description,
      Active: true,
      Encoded_By: 24287,
    };

    const updateValueUrl = "https://localhost:44373/api/UpdateValue";

    axios
      .patch(updateValueUrl, value, config)
      .then((response) => {
        console.log(response.data);
        toast({
          title: "Value updated.",
          description: `Value with ValueId: ${valueData.ValueId} has been updated.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsFormOpen(false);
        setCurrentMode("");
        setValueData(VALUE_DATA);
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
              <Th>Value Id</Th>
              <Th>Company Id</Th>
              <Th>Title</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayedValues.map((value, index) => (
              <Tr
                key={index}
                borderBottom="1px solid #ebebeb"
                onClick={() => handleRowClick(value)}
              >
                <Td>{startNumber + index}</Td>
                <Td>{value.Active === false ? "0" : "1"}</Td>
                <Td>{value.ValueId}</Td>
                <Td>{value.CompanyId}</Td>
                <Td>{value.Title}</Td>
                <Td>{value.Description}</Td>
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
            <ValueAdd
              handleCancel={handleClose}
              handleAddUpdate={handleDeleteValue}
              isOpen={isFormOpen}
              onClose={handleClose}
              updateFields={updateValueFields}
              {...valueData}
            />
          )}
          {currentMode === "Update" && (
            <ValueUpdate
              handleCancel={handleClose}
              handleAddUpdate={handleUpdateValue}
              isOpen={isFormOpen}
              onClose={handleClose}
              updateFields={updateValueFields}
              {...valueData}
            />
          )}
          {currentMode === "Delete" && (
            <ValueDelete
              handleCancel={handleClose}
              handleDelete={handleDeleteValue}
              isOpen={isFormOpen}
              onClose={handleClose}
              {...valueData}
            />
          )}
        </>
      )}
    </Flex>
  );
};
