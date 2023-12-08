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
import { COMPANY_DATA, Company } from "../../data/company";
import {
  CompanyAdd,
  CompanyDelete,
  CompanyPreview,
  CompanyUpdate,
} from "../../components/Modal/AdminView/CompanyModal";
import { TbEye, TbFilePencil, TbFilePlus, TbTrash } from "react-icons/tb";

export const CompaniesPage = () => {
  document.title = "Companies | Welby";

  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyData, setCompanyData] = useState<Company>(COMPANY_DATA);
  const [currentMode, setCurrentMode] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetchData, setFetchData] = useState<boolean>(true);

  const itemsPerPage = 10;

  useEffect(() => {
    const companyUrl = "https://localhost:44373/api/GetCompanies";
    const fetchAndSetCompanies = async () => {
      try {
        const company = await axios.get(companyUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: {
            CompanyId: 0,
            Email: "",
            Phone_Number: "",
            CompanyRole: "",
            Active: false,
            //FirstLogIn: false, <-- not part of parameter. only needed when posting
          },
        });
        const data = company.data;
        const companies = data.map((c: Company) => {
          return {
            ...c,
          };
        });
        setCompanies(companies);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if (fetchData) {
      fetchAndSetCompanies();
      setFetchData(false);
    }
  }, [fetchData]);

  const updateCompanyFields = (fields: Partial<Company>) => {
    setCompanyData((prev) => {
      return { ...prev, ...fields };
    });
  };

  // pagination start
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const startNumber = startIndex + 1;
  const displayedCompanies = companies.slice(startIndex, endIndex);
  const totalPages = Math.ceil(companies.length / itemsPerPage);

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

  const handleRowClick = (company: Company) => {
    if (currentMode) {
      setCompanyData(company);
      setIsFormOpen(true);
    }
  };

  const handleClose = () => {
    setFetchData(true);
    setIsFormOpen(false);
    setCurrentMode("");
    setCompanyData(COMPANY_DATA);
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
          borderColor={currentMode === "Preview" ? "#46bdc6" : "#ebebeb"}
          leftIcon={<Icon as={TbEye} boxSize={6} color="#46bdc6" />}
          onClick={() => {
            if (currentMode === "Preview") {
              setCurrentMode("");
            } else {
              setCurrentMode("Preview");
            }
          }}
          variant="masterCrud"
          width="15%"
        >
          Preview Well-Being
        </Button>
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
                : currentMode === "Preview"
                  ? "#cfe2f3"
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
              <Th>Company Id</Th>
              <Th>Logo</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone_Number</Th>
              <Th>Website</Th>
              <Th>Vision</Th>
              <Th>Mission</Th>
              <Th>Country</Th>
              <Th>Industry Type</Th>
              <Th>Founding Date</Th>
              <Th>Company Size</Th>
              <Th>Last Changed Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayedCompanies.map((company, index) => (
              <Tr
                key={index}
                _hover={{ backgroundColor: currentMode !== "" && "#ebebeb" }}
                backgroundColor={index % 2 === 0 ? "#f5f5f5" : "#ffffff"}
                borderBottom={index % 2 === 0 ? "#ffffff" : "#f5f5f5"}
                cursor={currentMode !== "" ? "pointer" : "default"}
                onClick={() => handleRowClick(company)}
              >
                <Td whiteSpace="normal">{startNumber + index}</Td>
                <Td whiteSpace="normal">
                  {company.Active === false ? "0" : "1"}
                </Td>
                <Td whiteSpace="normal">{company.CompanyId}</Td>
                <Td whiteSpace="normal">
                  <Image src={company.Logo} />
                </Td>
                <Td whiteSpace="normal">{company.Name}</Td>
                <Td whiteSpace="normal">{company.Email}</Td>
                <Td whiteSpace="normal">{company.Phone_Number}</Td>
                <Td whiteSpace="normal">{company.Website}</Td>
                <Td whiteSpace="normal" minWidth="500px">
                  {company.Vision}
                </Td>
                <Td whiteSpace="normal" minWidth="500px">
                  {company.Mission}
                </Td>
                <Td whiteSpace="normal">{company.CompanyLocation}</Td>
                <Td whiteSpace="normal">{company.IndustryTypeDisplay}</Td>
                <Td whiteSpace="normal">{company.FoundingDate}</Td>
                <Td whiteSpace="normal">{company.CompanySize}</Td>
                <Td whiteSpace="normal">{company.LastChanged_Date}</Td>
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
        <CompanyAdd
          isOpen={isFormOpen}
          onClose={handleClose}
          updateFields={updateCompanyFields}
          {...companyData}
        />
      )}
      {currentMode === "Update" && (
        <CompanyUpdate
          isOpen={isFormOpen}
          onClose={handleClose}
          updateFields={updateCompanyFields}
          {...companyData}
        />
      )}
      {currentMode === "Delete" && (
        <CompanyDelete
          isOpen={isFormOpen}
          onClose={handleClose}
          {...companyData}
        />
      )}
      {currentMode === "Preview" && (
        <CompanyPreview
          isOpen={isFormOpen}
          onClose={handleClose}
          {...companyData}
        />
      )}
    </Flex>
  );
};
