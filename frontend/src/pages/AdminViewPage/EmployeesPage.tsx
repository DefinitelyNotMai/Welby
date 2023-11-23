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
import { useEffect, useState } from "react";
import { Employee } from "../../data/typesMaster";
import { EMPLOYEE_DATA } from "../../data/initMaster";
import Pagination from "../../components/Disclosure/Pagination";
import { fetchData } from "../../api/fetchData";
import axios from "axios";

export const EmployeesPage = () => {
  document.title = "Employees | Welby";

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeData, setEmployeeData] = useState<Employee>(EMPLOYEE_DATA);
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
    const employeeUrl = "https://localhost:44373/api/GetEmployee";
    const fetchAndSetEmployees = async () => {
      try {
        const data = await fetchData(employeeUrl, { Active: 1 });
        const companies = data.map((c: Employee) => {
          const date = new Date(c.Birthday);
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          return {
            ...c,
            Birthday: `${year}-${month}-${day}`,
          };
        });
        setEmployees(companies);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchAndSetEmployees();
  }, [employeeData]);

  const updateCompanyFields = (fields: Partial<Employee>) => {
    setEmployeeData((prev) => {
      return { ...prev, ...fields };
    });
  };

  // pagination start
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const startNumber = startIndex + 1;
  const displayedCompanies = employees.slice(startIndex, endIndex);
  const totalPages = Math.ceil(employees.length / itemsPerPage);

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

  const handleRowClick = (employee: Employee) => {
    if (currentMode) {
      setEmployeeData(employee);
      console.log(employee);
      setIsFormOpen(true);
    }
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setCurrentMode("");
  };

  const handleDeleteEmployee = () => {
    const company = {
      EmployeeId: employeeData.EmployeeId,
      Encoded_By: 24287,
    };

    const deleteEmployeeUrl = "https://localhost:44373/api/RemoveEmployee";

    axios
      .patch(deleteEmployeeUrl, company, config)
      .then((response) => {
        console.log(response.data);
        toast({
          title: "SUCCESS",
          description: `Company with Company Id: ${employeeData.EmployeeId} has been deleted.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsFormOpen(false);
        setCurrentMode("");
        setEmployeeData(EMPLOYEE_DATA);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateEmployee = () => {
    const employee = {
      EmployeeId: employeeData.EmployeeId,
      First_Name: employeeData.First_Name,
      Middle_Name: employeeData.Middle_Name,
      Last_Name: employeeData.Last_Name,
      Nickname: employeeData.Nickname,
      Email: employeeData.Email,
      Phone_Number: employeeData.Phone_Number,
      Address: employeeData.Address,
      Birthday: employeeData.Birthday,
      Linkedin: employeeData.Linkedin,
      Facebook: employeeData.Facebook,
      Instagram: employeeData.Instagram,
      TikTok: employeeData.TikTok,
      Work: employeeData.Work,
      Connect: employeeData.Connect,
      Support: employeeData.Support,
      Other_Notes: employeeData.Other_Notes,
      GenderId: employeeData.GenderId,
      CompanyId: employeeData.CompanyId,
      CountryId: employeeData.CountryId,
      Active: 1,
      Encoded_By: 24287,
    };

    const updateCompanyUrl = "https://localhost:44373/api/UpdateCompany";

    axios
      .patch(updateCompanyUrl, employee, config)
      .then((response) => {
        console.log(response.data);
        toast({
          title: "Company updated.",
          description: `Company with CompanyId: ${employeeData.CompanyId} has been updated.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsFormOpen(false);
        setCurrentMode("");
        setEmployeeData(EMPLOYEE_DATA);
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
              <Th>Employee Id</Th>
              <Th>First Name</Th>
              <Th>Middle Name</Th>
              <Th>Last Name</Th>
              <Th>Nickname</Th>
              <Th>Email</Th>
              <Th>Phone Number</Th>
              <Th>Address</Th>
              <Th>Birthday</Th>
              <Th>Linkedin</Th>
              <Th>Facebook</Th>
              <Th>Instagram</Th>
              <Th>TikTok</Th>
              <Th>Work</Th>
              <Th>Connect</Th>
              <Th>Support</Th>
              <Th>Other Notes</Th>
              <Th>Profile Photo</Th>
              <Th>Gender Id</Th>
              <Th>Company Id</Th>
              <Th>Country Id</Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayedCompanies.map((employee, index) => (
              <Tr
                key={index}
                borderBottom="1px solid #ebebeb"
                onClick={() => handleRowClick(employee)}
              >
                <Td>{startNumber + index}</Td>
                <Td>{employee.Active === false ? "0" : "1"}</Td>
                <Td>{employee.EmployeeId}</Td>
                <Td>{employee.First_Name}</Td>
                <Td>{employee.Middle_Name}</Td>
                <Td>{employee.Last_Name}</Td>
                <Td>{employee.Nickname}</Td>
                <Td>{employee.Email}</Td>
                <Td>{employee.Phone_Number}</Td>
                <Td>{employee.Address}</Td>
                <Td>{employee.Birthday}</Td>
                <Td>{employee.Linkedin}</Td>
                <Td>{employee.Facebook}</Td>
                <Td>{employee.Instagram}</Td>
                <Td>{employee.TikTok}</Td>
                <Td>{employee.Work}</Td>
                <Td>{employee.Connect}</Td>
                <Td>{employee.Support}</Td>
                <Td>{employee.Other_Notes}</Td>
                <Td>
                  <Image src={employee.ProfilePhoto} />
                </Td>
                <Td>{employee.GenderId}</Td>
                <Td>{employee.CompanyId}</Td>
                <Td>{employee.CountryId}</Td>
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
            <CompanyAdd
              handleCancel={handleClose}
              handleAddUpdate={handleDeleteEmployee}
              isOpen={isFormOpen}
              onClose={handleClose}
              updateFields={updateCompanyFields}
              {...employeeData}
            />
          )}
          {currentMode === "Update" && (
            <CompanyUpdate
              handleCancel={handleClose}
              handleAddUpdate={handleUpdateEmployee}
              isOpen={isFormOpen}
              onClose={handleClose}
              updateFields={updateCompanyFields}
              {...employeeData}
            />
          )}
          {currentMode === "Delete" && (
            <CompanyDelete
              handleCancel={handleClose}
              handleDelete={handleDeleteEmployee}
              isOpen={isFormOpen}
              onClose={handleClose}
              {...employeeData}
            />
          )}
        </>
      )*/}
    </Flex>
  );
};
