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
import Pagination from "../../components/Disclosure/Pagination";
import { GENDER_DATA, Gender } from "../../data/gender";
import axios from "axios";
import {
  GenderAdd,
  GenderDelete,
  GenderUpdate,
} from "../../components/Modal/AdminView/GenderModal";
import { TbFilePencil, TbFilePlus, TbTrash } from "react-icons/tb";

export const GendersPage = () => {
  document.title = "Genders | Welby";

  const [genders, setGenders] = useState<Gender[]>([]);
  const [genderData, setGenderData] = useState<Gender>(GENDER_DATA);
  const [currentMode, setCurrentMode] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetchData, setFetchData] = useState<boolean>(true);

  const itemsPerPage = 10;

  useEffect(() => {
    const genderUrl = "https://localhost:44373/api/GetGender";
    const fetchAndSetGenders = async () => {
      try {
        const gender = await axios.get(genderUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: {
            GenderId: 0,
            Gender: "",
            Active: false,
          },
        });
        const data = gender.data;
        const genders = data.map((g: Gender) => {
          return g;
        });
        setGenders(genders);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    if (fetchData) {
      fetchAndSetGenders();
      setFetchData(false);
    }
  }, [fetchData]);

  const updateGenderFields = (fields: Partial<Gender>) => {
    setGenderData((prev) => {
      return { ...prev, ...fields };
    });
  };

  // pagination start
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const startNumber = startIndex + 1;
  const displayedGenders = genders.slice(startIndex, endIndex);
  const totalPages = Math.ceil(genders.length / itemsPerPage);

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

  const handleRowClick = (gender: Gender) => {
    if (currentMode) {
      setGenderData(gender);
      console.log(gender);
      setIsFormOpen(true);
    }
  };

  const handleClose = () => {
    setFetchData(true);
    setIsFormOpen(false);
    setCurrentMode("");
    setGenderData(GENDER_DATA);
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
              <Th>Gender Id</Th>
              <Th>Gender</Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayedGenders.map((gender, index) => (
              <Tr
                key={index}
                _hover={{ backgroundColor: currentMode !== "" && "#ebebeb" }}
                backgroundColor={index % 2 === 0 ? "#f5f5f5" : "#ffffff"}
                borderBottom={index % 2 === 0 ? "#ffffff" : "#f5f5f5"}
                cursor={currentMode !== "" ? "pointer" : "default"}
                onClick={() => handleRowClick(gender)}
              >
                <Td whiteSpace="normal">{startNumber + index}</Td>
                <Td whiteSpace="normal">
                  {gender.Active === false ? "0" : "1"}
                </Td>
                <Td whiteSpace="normal">{gender.GenderId}</Td>
                <Td whiteSpace="normal">{gender.Gender}</Td>
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
        <GenderAdd
          isOpen={isFormOpen}
          onClose={handleClose}
          updateFields={updateGenderFields}
          {...genderData}
        />
      )}
      {currentMode === "Update" && (
        <GenderUpdate
          isOpen={isFormOpen}
          onClose={handleClose}
          updateFields={updateGenderFields}
          {...genderData}
        />
      )}
      {currentMode === "Delete" && (
        <GenderDelete
          isOpen={isFormOpen}
          onClose={handleClose}
          {...genderData}
        />
      )}
    </Flex>
  );
};
