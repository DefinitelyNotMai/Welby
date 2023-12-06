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
import { COUNTRY_DATA, Country } from "../../data/country";

export const CountriesPage = () => {
  document.title = "Countries | Welby";

  const [countries, setCountries] = useState<Country[]>([]);
  const [countryData, setCountryData] = useState<Country>(COUNTRY_DATA);
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
    const countryUrl = "https://localhost:44373/api/GetCountries";
    const fetchAndSetCountries = async () => {
      try {
        const country = await axios.get(countryUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: {
            CountryId: 0,
            Name: "",
            Active: false,
          },
        });
        const data = country.data;
        const countries = data.map((c: Country) => {
          return {
            ...c,
          };
        });
        setCountries(countries);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchAndSetCountries();
  }, [countryData]);

  const updateCountryFields = (fields: Partial<Country>) => {
    setCountryData((prev) => {
      return { ...prev, ...fields };
    });
  };

  // pagination start
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const startNumber = startIndex + 1;
  const displayedCountries = countries.slice(startIndex, endIndex);
  const totalPages = Math.ceil(countries.length / itemsPerPage);

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

  const handleRowClick = (country: Country) => {
    if (currentMode) {
      setCountryData(country);
      console.log(country);
      setIsFormOpen(true);
    }
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setCurrentMode("");
  };

  const handleDeleteCountry = () => {
    const country = {
      CountryId: countryData.CountryId,
      Encoded_By: 24287,
    };

    const deleteCountryUrl = "https://localhost:44373/api/RemoveCountry";

    axios
      .patch(deleteCountryUrl, country, config)
      .then((response) => {
        console.log(response.data);
        toast({
          title: "SUCCESS",
          description: `Country with Country Id: ${countryData.CountryId} has been deleted.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsFormOpen(false);
        setCurrentMode("");
        setCountryData(COUNTRY_DATA);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateCountry = () => {
    const country = {
      CountryId: countryData.CountryId,
      Name: countryData.Name,
      Nationality: countryData.Nationality,
      Flag_Image: countryData.Flag_Image,
      Active: true,
      Encoded_By: 24287,
    };

    const updateCountryUrl = "https://localhost:44373/api/UpdateCountry";

    axios
      .patch(updateCountryUrl, country, config)
      .then((response) => {
        console.log(response.data);
        toast({
          title: "Country updated.",
          description: `Country with CountryId: ${countryData.CountryId} has been updated.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsFormOpen(false);
        setCurrentMode("");
        setCountryData(COUNTRY_DATA);
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
              <Th>Country Id</Th>
              <Th>Name</Th>
              <Th>Nationality</Th>
              <Th>Flag Image</Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayedCountries.map((country, index) => (
              <Tr
                key={index}
                borderBottom="1px solid #ebebeb"
                onClick={() => handleRowClick(country)}
              >
                <Td whiteSpace="normal">{startNumber + index}</Td>
                <Td whiteSpace="normal">
                  {country.Active === false ? "0" : "1"}
                </Td>
                <Td whiteSpace="normal">{country.CountryId}</Td>
                <Td whiteSpace="normal">{country.Name}</Td>
                <Td whiteSpace="normal">{country.Nationality}</Td>
                <Td whiteSpace="normal">{country.Flag_Image}</Td>
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
            <CountryAdd
              handleCancel={handleClose}
              handleAddUpdate={handleDeleteCountry}
              isOpen={isFormOpen}
              onClose={handleClose}
              updateFields={updateCountryFields}
              {...countryData}
            />
          )}
          {currentMode === "Update" && (
            <CountryUpdate
              handleCancel={handleClose}
              handleAddUpdate={handleUpdateCountry}
              isOpen={isFormOpen}
              onClose={handleClose}
              updateFields={updateCountryFields}
              {...countryData}
            />
          )}
          {currentMode === "Delete" && (
            <CountryDelete
              handleCancel={handleClose}
              handleDelete={handleDeleteCountry}
              isOpen={isFormOpen}
              onClose={handleClose}
              {...countryData}
            />
          )}
        </>
      )}
    </Flex>
  );
};
