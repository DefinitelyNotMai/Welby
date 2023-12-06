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
import { VALUE_DATA, Value } from "../../data/value";
import {
  ValueAdd,
  ValueDelete,
  ValueUpdate,
} from "../../components/Modal/AdminView/ValueModal";
import { TbFilePencil, TbFilePlus, TbTrash } from "react-icons/tb";

export const ValuesPage = () => {
  document.title = "Values | Welby";

  const [values, setValues] = useState<Value[]>([]);
  const [valueData, setValueData] = useState<Value>(VALUE_DATA);
  const [currentMode, setCurrentMode] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetchData, setFetchData] = useState<boolean>(true);

  const itemsPerPage = 10;

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
    if (fetchData) {
      fetchAndSetValues();
      setFetchData(false);
    }
  }, [fetchData]);

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
    setFetchData(true);
    setIsFormOpen(false);
    setCurrentMode("");
    setValueData(VALUE_DATA);
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
                _hover={{ backgroundColor: currentMode !== "" && "#ebebeb" }}
                backgroundColor={index % 2 === 0 ? "#f5f5f5" : "#ffffff"}
                borderBottom={index % 2 === 0 ? "#ffffff" : "#f5f5f5"}
                cursor={currentMode !== "" ? "pointer" : "default"}
                onClick={() => handleRowClick(value)}
              >
                <Td whiteSpace="normal">{startNumber + index}</Td>
                <Td whiteSpace="normal">
                  {value.Active === false ? "0" : "1"}
                </Td>
                <Td whiteSpace="normal">{value.ValueId}</Td>
                <Td whiteSpace="normal">{value.CompanyId}</Td>
                <Td whiteSpace="normal">{value.Title}</Td>
                <Td whiteSpace="normal">{value.Description}</Td>
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
        <ValueAdd
          isOpen={isFormOpen}
          onClose={handleClose}
          updateFields={updateValueFields}
          {...valueData}
        />
      )}
      {currentMode === "Update" && (
        <ValueUpdate
          isOpen={isFormOpen}
          onClose={handleClose}
          updateFields={updateValueFields}
          {...valueData}
        />
      )}
      {currentMode === "Delete" && (
        <ValueDelete isOpen={isFormOpen} onClose={handleClose} {...valueData} />
      )}
    </Flex>
  );
};
