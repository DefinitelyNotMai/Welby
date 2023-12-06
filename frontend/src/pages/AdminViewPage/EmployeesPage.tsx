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
import { EMPLOYEE_DATA, Employee } from "../../data/employee";

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
    const employeeUrl = "https://localhost:44373/api/GetEmployees";
    const fetchAndSetEmployees = async () => {
      try {
        const employee = await axios.get(employeeUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: {
            EmployeeId: 0,
            CompanyId: 0,
            Email: "",
            Phone_Number: "",
            CompanyRole: "",
            Active: false,
            //FirstLogIn: false, <-- not part of parameter. only needed when posting
          },
        });
        const data = employee.data;
        const employees = data.map((c: Employee) => {
          return {
            ...c,
          };
        });
        setEmployees(employees);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchAndSetEmployees();
  }, [employeeData]);

  const updateEmployeeFields = (fields: Partial<Employee>) => {
    setEmployeeData((prev) => {
      return { ...prev, ...fields };
    });
  };

  // pagination start
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const startNumber = startIndex + 1;
  const displayedEmployees = employees.slice(startIndex, endIndex);
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
    const employee = {
      EmployeeId: employeeData.EmployeeId,
      Encoded_By: 24287,
    };

    const deleteEmployeeUrl = "https://localhost:44373/api/RemoveEmployee";

    axios
      .patch(deleteEmployeeUrl, employee, config)
      .then((response) => {
        console.log(response.data);
        toast({
          title: "SUCCESS",
          description: `Employee with Employee Id: ${employeeData.EmployeeId} has been deleted.`,
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
      ProfilePhoto: employeeData.ProfilePhoto,
      First_Name: employeeData.First_Name,
      Middle_Name: employeeData.Middle_Name,
      Last_Name: employeeData.Last_Name,
      Nickname: employeeData.Nickname,
      Email: employeeData.Email,
      Phone_Number: employeeData.Phone_Number,
      Address: employeeData.Address,
      Birthday: employeeData.Birthday,
      CompanyId: employeeData.CompanyId,
      CompanyPosition: employeeData.CompanyPosition,
      CountryId: employeeData.CountryId,
      GenderId: employeeData.GenderId,
      TikTok: employeeData.TikTok,
      LinkedIn: employeeData.Linkedin,
      Facebook: employeeData.Facebook,
      Instagram: employeeData.Instagram,
      Work: employeeData.Work,
      Connect: employeeData.Connect,
      Support: employeeData.Support,
      Other_Notes: employeeData.Other_Notes,
      Active: true,
      FirstLogIn: employeeData.FirstLogIn,
      Encoded_By: 24287,
    };

    const updateEmployeeUrl = "https://localhost:44373/api/UpdateEmployee";

    axios
      .patch(updateEmployeeUrl, employee, config)
      .then((response) => {
        console.log(response.data);
        toast({
          title: "Employee updated.",
          description: `Employee with EmployeeId: ${employeeData.EmployeeId} has been updated.`,
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
            {displayedEmployees.map((employee, index) => (
              <Tr
                key={index}
                borderBottom="1px solid #ebebeb"
                onClick={() => handleRowClick(employee)}
              >
                <Td whiteSpace="normal">{startNumber + index}</Td>
                <Td whiteSpace="normal">
                  {employee.Active === false ? "0" : "1"}
                </Td>
                <Td whiteSpace="normal">{employee.EmployeeId}</Td>
                <Td whiteSpace="normal">{employee.First_Name}</Td>
                <Td whiteSpace="normal">{employee.Middle_Name}</Td>
                <Td whiteSpace="normal">{employee.Last_Name}</Td>
                <Td whiteSpace="normal">{employee.Nickname}</Td>
                <Td whiteSpace="normal">{employee.Email}</Td>
                <Td whiteSpace="normal">{employee.Phone_Number}</Td>
                <Td whiteSpace="normal">{employee.Address}</Td>
                <Td whiteSpace="normal">{employee.Birthday}</Td>
                <Td whiteSpace="normal">{employee.Linkedin}</Td>
                <Td whiteSpace="normal">{employee.Facebook}</Td>
                <Td whiteSpace="normal">{employee.Instagram}</Td>
                <Td whiteSpace="normal">{employee.TikTok}</Td>
                <Td whiteSpace="normal">{employee.Work}</Td>
                <Td whiteSpace="normal">{employee.Connect}</Td>
                <Td whiteSpace="normal">{employee.Support}</Td>
                <Td whiteSpace="normal">{employee.Other_Notes}</Td>
                <Td whiteSpace="normal">{employee.ProfilePhoto}</Td>
                <Td whiteSpace="normal">{employee.GenderId}</Td>
                <Td whiteSpace="normal">{employee.CompanyId}</Td>
                <Td whiteSpace="normal">{employee.CountryId}</Td>
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
            <EmployeeAdd
              handleCancel={handleClose}
              handleAddUpdate={handleDeleteEmployee}
              isOpen={isFormOpen}
              onClose={handleClose}
              updateFields={updateEmployeeFields}
              {...employeeData}
            />
          )}
          {currentMode === "Update" && (
            <EmployeeUpdate
              handleCancel={handleClose}
              handleAddUpdate={handleUpdateEmployee}
              isOpen={isFormOpen}
              onClose={handleClose}
              updateFields={updateEmployeeFields}
              {...employeeData}
            />
          )}
          {currentMode === "Delete" && (
            <EmployeeDelete
              handleCancel={handleClose}
              handleDelete={handleDeleteEmployee}
              isOpen={isFormOpen}
              onClose={handleClose}
              {...employeeData}
            />
          )}
        </>
      )}
    </Flex>
  );
};
