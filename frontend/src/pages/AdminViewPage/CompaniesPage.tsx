import { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Image,
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
import Pagination from "../../components/Disclosure/Pagination";
import {
  CompanyAdd,
  CompanyDelete,
  CompanyUpdate,
} from "../../components/Modal/AdminView/CompanyModal";
import axios from "axios";
import { COMPANY_DATA, Company } from "../../data/company";

export const CompaniesPage = () => {
  document.title = "Companies | Welby";

  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyData, setCompanyData] = useState<Company>(COMPANY_DATA);
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

  // TODO: needs to be fixed. On my end I get server error 500
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
            Active: false,
            //TakeAssessment: false, <-- not part of parameter. only needed when posting
          },
        });
        const data = company.data;
        /*
        const data = await fetchData(companyUrl, {
          Active: false,
        });
        */
        const companies = data.map((c: Company) => {
          /*
          const date = new Date(c.FoundingDate);
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          */
          return {
            ...c,
            //FoundingDate: `${year}-${month}-${day}`,
          };
        });
        setCompanies(companies);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchAndSetCompanies();
  }, [companyData]);

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
      console.log(company);
      setIsFormOpen(true);
    }
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setCurrentMode("");
  };

  const handleDeleteCompany = () => {
    const company = {
      CompanyId: companyData.CompanyId,
      Encoded_By: 24287,
    };

    const deleteCompanyUrl = "https://localhost:44373/api/RemoveCompany";

    axios
      .patch(deleteCompanyUrl, company, config)
      .then((response) => {
        console.log(response.data);
        toast({
          title: "SUCCESS",
          description: `Company with Company Id: ${companyData.CompanyId} has been deleted.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsFormOpen(false);
        setCurrentMode("");
        setCompanyData(COMPANY_DATA);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateMission = () => {
    const updateMissionUrl = "https://localhost:44373/api/UpdateCompanyMission";
    axios
      .patch(updateMissionUrl, {
        CompanyId: companyData.CompanyId,
        Mission: companyData.Mission,
        Encoded_By: 24287,
      })
      .then((response) => {
        console.log(response);
        console.log("Updated company mission");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateVision = () => {
    const updateVisionUrl = "https://localhost:44373/api/UpdateCompanyVision";
    axios
      .patch(updateVisionUrl, {
        CompanyId: companyData.CompanyId,
        Vision: companyData.Vision,
        Encoded_By: 24287,
      })
      .then((response) => {
        console.log(response);
        console.log("Updated company vision");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateCompany = () => {
    updateMission();
    updateVision();
    const company = {
      CompanyId: companyData.CompanyId,
      Name: companyData.Name,
      Email: companyData.Email,
      Phone_Number: companyData.Phone_Number,
      Website: companyData.Website,
      Logo: companyData.Logo,
      CountryId: companyData.CountryId,
      IndustryTypeId: companyData.IndustryTypeId,
      FoundingDate: companyData.FoundingDate,
      Active: true,
      Encoded_By: 24287,
    };

    const updateCompanyUrl = "https://localhost:44373/api/UpdateCompany";

    axios
      .patch(updateCompanyUrl, company, config)
      .then((response) => {
        console.log(response.data);
        toast({
          title: "Company updated.",
          description: `Company with CompanyId: ${companyData.CompanyId} has been updated.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsFormOpen(false);
        setCurrentMode("");
        setCompanyData(COMPANY_DATA);
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
              <Th>CompanyId</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone_Number</Th>
              <Th>Website</Th>
              <Th>Vision</Th>
              <Th>Mission</Th>
              <Th>Logo</Th>
              <Th>CountryId</Th>
              <Th>IndustryTypeId</Th>
              <Th>FoundingDate</Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayedCompanies.map((company, index) => (
              <Tr
                key={index}
                borderBottom="1px solid #ebebeb"
                onClick={() => handleRowClick(company)}
              >
                <Td whiteSpace="normal">{startNumber + index}</Td>
                <Td whiteSpace="normal">
                  {company.Active === false ? "0" : "1"}
                </Td>
                <Td whiteSpace="normal">{company.CompanyId}</Td>
                <Td whiteSpace="normal">{company.Name}</Td>
                <Td whiteSpace="normal">{company.Email}</Td>
                <Td whiteSpace="normal">{company.Phone_Number}</Td>
                <Td whiteSpace="normal">{company.Website}</Td>
                <Td whiteSpace="normal">{company.Vision}</Td>
                <Td whiteSpace="normal">{company.Mission}</Td>
                <Td whiteSpace="normal">
                  <Image src={company.Logo} />
                </Td>
                <Td whiteSpace="normal">{company.CountryId}</Td>
                <Td whiteSpace="normal">{company.IndustryTypeId}</Td>
                <Td whiteSpace="normal">{company.FoundingDate}</Td>
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
            <CompanyAdd
              handleCancel={handleClose}
              handleAddUpdate={handleDeleteCompany}
              isOpen={isFormOpen}
              onClose={handleClose}
              updateFields={updateCompanyFields}
              {...companyData}
            />
          )}
          {currentMode === "Update" && (
            <CompanyUpdate
              handleCancel={handleClose}
              handleAddUpdate={handleUpdateCompany}
              isOpen={isFormOpen}
              onClose={handleClose}
              updateFields={updateCompanyFields}
              {...companyData}
            />
          )}
          {currentMode === "Delete" && (
            <CompanyDelete
              handleCancel={handleClose}
              handleDelete={handleDeleteCompany}
              isOpen={isFormOpen}
              onClose={handleClose}
              {...companyData}
            />
          )}
        </>
      )}
    </Flex>
  );
};
