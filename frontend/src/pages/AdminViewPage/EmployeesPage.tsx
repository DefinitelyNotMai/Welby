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
import { EMPLOYEE_DATA, Employee } from "../../data/employee";
import {
  EmployeeAdd,
  EmployeeDelete,
  EmployeeUpdate,
} from "../../components/Modal/AdminView/EmployeeModal";
import { TbFilePencil, TbFilePlus, TbTrash } from "react-icons/tb";

export const EmployeesPage = () => {
  document.title = "Employees | Welby";

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeData, setEmployeeData] = useState<Employee>(EMPLOYEE_DATA);
  const [currentMode, setCurrentMode] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetchData, setFetchData] = useState<boolean>(true);

  const itemsPerPage = 10;

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

    if (fetchData) {
      fetchAndSetEmployees();
      setFetchData(false);
    }
  }, [fetchData]);

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
      setIsFormOpen(true);
    }
  };

  const handleClose = () => {
    setFetchData(true);
    setIsFormOpen(false);
    setCurrentMode("");
    setEmployeeData(EMPLOYEE_DATA);
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
              <Th>Employee Id</Th>
              <Th>Profile Photo</Th>
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
              <Th>Gender Id</Th>
              <Th>Company Id</Th>
              <Th>Country Id</Th>
              <Th>Position</Th>
              <Th>Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayedEmployees.map((employee, index) => (
              <Tr
                key={index}
                _hover={{ backgroundColor: currentMode !== "" && "#ebebeb" }}
                backgroundColor={index % 2 === 0 ? "#f5f5f5" : "#ffffff"}
                borderBottom={index % 2 === 0 ? "#ffffff" : "#f5f5f5"}
                cursor={currentMode !== "" ? "pointer" : "default"}
                onClick={() => handleRowClick(employee)}
              >
                <Td whiteSpace="normal">{startNumber + index}</Td>
                <Td whiteSpace="normal">
                  {employee.Active === false ? "0" : "1"}
                </Td>
                <Td whiteSpace="normal">{employee.EmployeeId}</Td>
                <Td whiteSpace="normal">
                  <Image src={employee.ProfilePhoto} />
                </Td>
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
                <Td whiteSpace="normal" minWidth="500px">
                  {employee.Work}
                </Td>
                <Td whiteSpace="normal" minWidth="500px">
                  {employee.Connect}
                </Td>
                <Td whiteSpace="normal" minWidth="500px">
                  {employee.Support}
                </Td>
                <Td whiteSpace="normal" minWidth="500px">
                  {employee.Other_Notes}
                </Td>
                <Td whiteSpace="normal">{employee.GenderDisplayName}</Td>
                <Td whiteSpace="normal">{employee.EmployeeCompanyDisplay}</Td>
                <Td whiteSpace="normal">{employee.CountryDisplay}</Td>
                <Td whiteSpace="normal">{employee.CompanyPosition}</Td>
                <Td whiteSpace="normal">{employee.CompanyRole}</Td>
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
        <EmployeeAdd
          isOpen={isFormOpen}
          onClose={handleClose}
          updateFields={updateEmployeeFields}
          {...employeeData}
        />
      )}
      {currentMode === "Update" && (
        <EmployeeUpdate
          isOpen={isFormOpen}
          onClose={handleClose}
          updateFields={updateEmployeeFields}
          {...employeeData}
        />
      )}
      {currentMode === "Delete" && (
        <EmployeeDelete
          isOpen={isFormOpen}
          onClose={handleClose}
          {...employeeData}
        />
      )}
    </Flex>
  );
};
