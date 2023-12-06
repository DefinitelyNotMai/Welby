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
import { INDUSTRY_TYPE_DATA, IndustryType } from "../../data/industryType";

export const IndustryTypesPage = () => {
  document.title = "IndustryTypes | Welby";

  const [industryTypes, setIndustryTypes] = useState<IndustryType[]>([]);
  const [industryTypeData, setIndustryTypeData] =
    useState<IndustryType>(INDUSTRY_TYPE_DATA);
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
    const industryTypeUrl = "https://localhost:44373/api/GetIndustryTypes";
    const fetchAndSetIndustryTypes = async () => {
      try {
        const industryType = await axios.get(industryTypeUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: {
            IndustryTypeId: 0,
            Industry_Name: "",
            Active: false,
          },
        });
        const data = industryType.data;
        const industryTypes = data.map((c: IndustryType) => {
          return {
            ...c,
          };
        });
        setIndustryTypes(industryTypes);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchAndSetIndustryTypes();
  }, [industryTypeData]);

  const updateIndustryTypeFields = (fields: Partial<IndustryType>) => {
    setIndustryTypeData((prev) => {
      return { ...prev, ...fields };
    });
  };

  // pagination start
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const startNumber = startIndex + 1;
  const displayedIndustryTypes = industryTypes.slice(startIndex, endIndex);
  const totalPages = Math.ceil(industryTypes.length / itemsPerPage);

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

  const handleRowClick = (industryType: IndustryType) => {
    if (currentMode) {
      setIndustryTypeData(industryType);
      console.log(industryType);
      setIsFormOpen(true);
    }
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setCurrentMode("");
  };

  const handleDeleteIndustryType = () => {
    const industryType = {
      IndustryTypeId: industryTypeData.IndustryTypeId,
      Encoded_By: 24287,
    };

    const deleteIndustryTypeUrl =
      "https://localhost:44373/api/RemoveIndustryType";

    axios
      .patch(deleteIndustryTypeUrl, industryType, config)
      .then((response) => {
        console.log(response.data);
        toast({
          title: "SUCCESS",
          description: `Industry Type with IndustryTypeId: ${industryTypeData.IndustryTypeId} has been deleted.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsFormOpen(false);
        setCurrentMode("");
        setIndustryTypeData(INDUSTRY_TYPE_DATA);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateIndustryType = () => {
    const industryType = {
      IndustryTypeId: industryTypeData.IndustryTypeId,
      Industry_Name: industryTypeData.Industry_Name,
      Active: true,
      Encoded_By: 24287,
    };

    const updateIndustryTypeUrl =
      "https://localhost:44373/api/UpdateIndustryType";

    axios
      .patch(updateIndustryTypeUrl, industryType, config)
      .then((response) => {
        console.log(response.data);
        toast({
          title: "IndustryType updated.",
          description: `IndustryType with IndustryTypeId: ${industryTypeData.IndustryTypeId} has been updated.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsFormOpen(false);
        setCurrentMode("");
        setIndustryTypeData(INDUSTRY_TYPE_DATA);
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
              <Th>Industry Type Id</Th>
              <Th>Industry Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayedIndustryTypes.map((industryType, index) => (
              <Tr
                key={index}
                borderBottom="1px solid #ebebeb"
                onClick={() => handleRowClick(industryType)}
              >
                <Td whiteSpace="normal">{startNumber + index}</Td>
                <Td whiteSpace="normal">
                  {industryType.Active === false ? "0" : "1"}
                </Td>
                <Td whiteSpace="normal">{industryType.IndustryTypeId}</Td>
                <Td whiteSpace="normal">{industryType.Industry_Name}</Td>
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
            <IndustryTypeAdd
              handleCancel={handleClose}
              handleAddUpdate={handleDeleteIndustryType}
              isOpen={isFormOpen}
              onClose={handleClose}
              updateFields={updateIndustryTypeFields}
              {...industryTypeData}
            />
          )}
          {currentMode === "Update" && (
            <IndustryTypeUpdate
              handleCancel={handleClose}
              handleAddUpdate={handleUpdateIndustryType}
              isOpen={isFormOpen}
              onClose={handleClose}
              updateFields={updateIndustryTypeFields}
              {...industryTypeData}
            />
          )}
          {currentMode === "Delete" && (
            <IndustryTypeDelete
              handleCancel={handleClose}
              handleDelete={handleDeleteIndustryType}
              isOpen={isFormOpen}
              onClose={handleClose}
              {...industryTypeData}
            />
          )}
        </>
      )}
    </Flex>
  );
};
