// lib
import {
  Button,
  Flex,
  Icon,
  Image,
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
import { COUNTRY_DATA, Country } from "../../data/country";
import {
  CountryAdd,
  CountryDelete,
  CountryUpdate,
} from "../../components/Modal/AdminView/CountryModal";
import { TbFilePencil, TbFilePlus, TbTrash } from "react-icons/tb";

export const CountriesPage = () => {
  document.title = "Countries | Welby";

  const [countries, setCountries] = useState<Country[]>([]);
  const [countryData, setCountryData] = useState<Country>(COUNTRY_DATA);
  const [currentMode, setCurrentMode] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetchData, setFetchData] = useState<boolean>(true);

  const itemsPerPage = 10;

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
    if (fetchData) {
      fetchAndSetCountries();
      setFetchData(false);
    }
  }, [fetchData]);

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
      setIsFormOpen(true);
    }
  };

  const handleClose = () => {
    setFetchData(true);
    setIsFormOpen(false);
    setCurrentMode("");
    setCountryData(COUNTRY_DATA);
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
                _hover={{ backgroundColor: currentMode !== "" && "#ebebeb" }}
                backgroundColor={index % 2 === 0 ? "#f5f5f5" : "#ffffff"}
                borderBottom={index % 2 === 0 ? "#ffffff" : "#f5f5f5"}
                cursor={currentMode !== "" ? "pointer" : "default"}
                onClick={() => handleRowClick(country)}
              >
                <Td whiteSpace="normal">{startNumber + index}</Td>
                <Td whiteSpace="normal">
                  {country.Active === false ? "0" : "1"}
                </Td>
                <Td whiteSpace="normal">{country.CountryId}</Td>
                <Td whiteSpace="normal">{country.Name}</Td>
                <Td whiteSpace="normal">{country.Nationality}</Td>
                <Td whiteSpace="normal">
                  <Image src={country.Flag_Image} />
                </Td>
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
        <CountryAdd
          isOpen={isFormOpen}
          onClose={handleClose}
          updateFields={updateCountryFields}
          {...countryData}
        />
      )}
      {currentMode === "Update" && (
        <CountryUpdate
          isOpen={isFormOpen}
          onClose={handleClose}
          updateFields={updateCountryFields}
          {...countryData}
        />
      )}
      {currentMode === "Delete" && (
        <CountryDelete
          isOpen={isFormOpen}
          onClose={handleClose}
          {...countryData}
        />
      )}
    </Flex>
  );
};
