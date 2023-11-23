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
import { Gender } from "../../data/typesMaster";
import { GENDER_DATA } from "../../data/initMaster";
import { fetchData } from "../../api/fetchData";
import axios from "axios";
import Pagination from "../../components/Disclosure/Pagination";

export const GendersPage = () => {
  document.title = "Genders | Welby";

  const [genders, setGenders] = useState<Gender[]>([]);
  const [genderData, setGenderData] = useState<Gender>(GENDER_DATA);
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
    const genderUrl = "https://localhost:44373/api/GetGender";
    const fetchAndSetGenders = async () => {
      try {
        const data = await fetchData(genderUrl, { Active: 0 });
        setGenders(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchAndSetGenders();
  }, [genderData]);

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
    setIsFormOpen(false);
    setCurrentMode("");
  };

  const handleDeleteGender = () => {
    const gender = {
      GenderId: genderData.GenderId,
      Encoded_By: 24287,
    };

    const deleteGenderUrl = "https://localhost:44373/api/RemoveGender";

    axios
      .patch(deleteGenderUrl, gender, config)
      .then((response) => {
        console.log(response.data);
        toast({
          title: "SUCCESS",
          description: `Gender with Gender Id: ${genderData.GenderId} has been deleted.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsFormOpen(false);
        setCurrentMode("");
        setGenderData(GENDER_DATA);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateGender = () => {
    const gender = {
      GenderId: genderData.GenderId,
      Gender: genderData.Gender,
      Biological: genderData.Biological,
      Active: 1,
      Encoded_By: 24287,
    };

    const updateGenderUrl = "https://localhost:44373/api/UpdateGender";

    axios
      .patch(updateGenderUrl, gender, config)
      .then((response) => {
        console.log(response.data);
        toast({
          title: "SUCCESS",
          description: `Gender with Gender Id: ${genderData.GenderId} has been updated.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsFormOpen(false);
        setCurrentMode("");
        setGenderData(GENDER_DATA);
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
              <Th>Gender Id</Th>
              <Th>Gender</Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayedGenders.map((gender, index) => (
              <Tr
                key={index}
                borderBottom="1px solid #ebebeb"
                onClick={() => handleRowClick(gender)}
              >
                <Td>{startNumber + index}</Td>
                <Td>{gender.Active === false ? "0" : "1"}</Td>
                <Td>{gender.GenderId}</Td>
                <Td>{gender.Gender}</Td>
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

      {/*isFormOpen && (
        <>
          {currentMode === "Add" && (
            <GenderAdd
              handleCancel={handleClose}
              handleAddUpdate={handleDeleteGender}
              isOpen={isFormOpen}
              onClose={handleClose}
              updateFields={updateGenderFields}
              {...genderData}
            />
          )}
          {currentMode === "Update" && (
            <GenderUpdate
              handleCancel={handleClose}
              handleAddUpdate={handleUpdateGender}
              isOpen={isFormOpen}
              onClose={handleClose}
              updateFields={updateGenderFields}
              {...genderData}
            />
          )}
          {currentMode === "Delete" && (
            <GenderDelete
              handleCancel={handleClose}
              handleDelete={handleDeleteGender}
              isOpen={isFormOpen}
              onClose={handleClose}
              {...genderData}
            />
          )}
        </>
      )*/}
    </Flex>
  );
};
