import {
    Flex,
    Spacer,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Grid,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useToast,
} from '@chakra-ui/react';
import { TbFilePencil, TbFilePlus, TbTrash } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import axios from 'axios';

import CustomButton from '../../../components/Button';
import FormItem from '../../../components/Form/FormItem';
import UploadPhoto from '../../../components/PhotoUpload';
import Textbox from '../../../components/Textbox';
import Pagination from '../../../components/AdminView/Pagination';

type Employee = {
    EmployeeId: string;
    First_Name: string;
    Middle_Name: string;
    Last_Name: string;
    Nickname: string;
    Email: string;
    Phone_Number: string;
    Address: string;
    Birthday: string;
    Linkedin: string;
    Facebook: string;
    Instagram: string;
    TikTok: string;
    Work: string;
    Connect: string;
    Support: string;
    Other_Notes: string;
    GenderId: string;
    CompanyId: string;
    CountryId: string;
};

const EMPLOYEE_DATA: Employee = {
    EmployeeId: '',
    First_Name: '',
    Middle_Name: '',
    Last_Name: '',
    Nickname: '',
    Email: '',
    Phone_Number: '',
    Address: '',
    Birthday: '',
    Linkedin: '',
    Facebook: '',
    Instagram: '',
    TikTok: '',
    Work: '',
    Connect: '',
    Support: '',
    Other_Notes: '',
    GenderId: '',
    CompanyId: '',
    CountryId: '',
}

const Employees = () => {
    document.title = "Employees | Welby";

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [employeeData, setEmployeeData] = useState<Employee>(EMPLOYEE_DATA);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);
    const [isUpdateButtonClicked, setIsUpdateButtonClicked] = useState(false);
    const [isDeleteButtonClicked, setIsDeleteButtonClicked] = useState(false);
    const itemsPerPage = 10;

    const toast = useToast();

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };


    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const employeeUrl = 'https://localhost:44373/api/GetEmployee';
                let employee = null;
                const param = { Active: 1 };

                axios
                    .get(employeeUrl, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        params: param,
                    })
                    .then((response) => {
                        employee = response.data;
                        setEmployees(employee);
                    });
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    // PAGINATION start
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
    // PAGINATION end

    const handleRowClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        setEmployeeData({ ...employee });
        setIsFormOpen(true);
    };

    const handleAddEmployee = () => {
        const employee = {
            "First_Name": employeeData.First_Name,
            "Middle_Name": employeeData.Middle_Name,
            "Last_Name": employeeData.Last_Name,
            "Nickname": employeeData.Nickname,
            "Email": employeeData.Email,
            "Phone_Number": employeeData.Phone_Number,
            "Address": employeeData.Address,
            "Birthday": employeeData.Birthday,
            "Linkedin": employeeData.Linkedin,
            "Facebook": employeeData.Facebook,
            "Instagram": employeeData.Instagram,
            "TikTok": employeeData.TikTok,
            "Work": employeeData.Work,
            "Connect": employeeData.Connect,
            "Support": employeeData.Support,
            "Other_Notes": employeeData.Other_Notes,
            "GenderId": employeeData.GenderId,
            "CompanyId": employeeData.CompanyId,
            "CountryId": employeeData.CountryId
        }

        var addEmployeeUrl = 'https://localhost:44373/api/AddEmployee'
        axios
            .post(addEmployeeUrl, employee, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Employee added.',
                    description: `${employeeData.Email} has been added`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            }).catch((error) => {
                console.log(error)
            });
    }

    const handleUpdateEmployee = () => {
        const employee = {
            "EmployeeId": selectedEmployee?.EmployeeId,
            "First_Name": employeeData.First_Name,
            "Middle_Name": employeeData.Middle_Name,
            "Last_Name": employeeData.Last_Name,
            "Nickname": employeeData.Nickname,
            "Email": employeeData.Email,
            "Phone_Number": employeeData.Phone_Number,
            "Address": employeeData.Address,
            "Birthday": employeeData.Birthday,
            "Linkedin": employeeData.Linkedin,
            "Facebook": employeeData.Facebook,
            "Instagram": employeeData.Instagram,
            "TikTok": employeeData.TikTok,
            "Work": employeeData.Work,
            "Connect": employeeData.Connect,
            "Support": employeeData.Support,
            "Other_Notes": employeeData.Other_Notes,
            "GenderId": employeeData.GenderId,
            "CompanyId": employeeData.CompanyId,
            "CountryId": employeeData.CountryId,
            "Active": 1,
            "Encoded_By": 24287
        }

        var updateEmployeeUrl = 'https://localhost:44373/api/UpdateEmployee'

        axios
            .patch(updateEmployeeUrl, employee, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Employee updated.',
                    description: `Employee with EmployeeId:${selectedEmployee?.EmployeeId} has been updated.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setIsUpdateButtonClicked(false);
                setSelectedEmployee(null);
            }).catch((error) => {
                console.log(error)
            });

    }

    const handleDeleteEmployee = () => {
        const employee = {
            "EmployeeId": selectedEmployee?.EmployeeId,
            "Encoded_By": 24287 // need to change this once roles are set in sign up.
        }

        var deleteEmployeeUrl = 'https://localhost:44373/api/RemoveEmployee'

        axios
            .patch(deleteEmployeeUrl, employee, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Employee deleted.',
                    description: `Employee with EmployeeId:${selectedEmployee?.EmployeeId} has been deleted.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setIsDeleteButtonClicked(false);
                setSelectedEmployee(null);
            }).catch((error) => {
                console.log(error)
            });
    }

    const resetEmployeesData = () => {
        setEmployeeData({
            EmployeeId: '',
            First_Name: '',
            Middle_Name: '',
            Last_Name: '',
            Nickname: '',
            Email: '',
            Phone_Number: '',
            Address: '',
            Birthday: '',
            Linkedin: '',
            Facebook: '',
            Instagram: '',
            TikTok: '',
            Work: '',
            Connect: '',
            Support: '',
            Other_Notes: '',
            GenderId: '',
            CompanyId: '',
            CountryId: '',
        })
    }

    return (
        <Flex flexDirection="column" w="full">
            <Flex flexDirection="row" m="4">
                <CustomButton bg="#ffffff" icon={TbFilePlus} iconColor="#44a348" mr="4"
                    onClick={() => {
                        setIsAddButtonClicked(!isAddButtonClicked);
                        setIsUpdateButtonClicked(false);
                        setIsDeleteButtonClicked(false);
                        setIsFormOpen(true);
                    }}
                >
                    Add
                </CustomButton>
                <CustomButton
                    bg={isUpdateButtonClicked ? "#f0d124" : "#ffffff"}
                    icon={TbFilePencil}
                    iconColor="#24a2f0"
                    onClick={() => {
                        setIsUpdateButtonClicked(!isUpdateButtonClicked);
                        setIsAddButtonClicked(false);
                        setIsDeleteButtonClicked(false);
                    }}
                >
                    Update
                </CustomButton>
                <Spacer />
                <CustomButton
                    bg={isDeleteButtonClicked ? "#ff0000" : "#ffffff"}
                    icon={TbTrash}
                    iconColor="#295555"
                    onClick={() => {
                        setIsDeleteButtonClicked(!isDeleteButtonClicked);
                        setIsAddButtonClicked(false);
                        setIsUpdateButtonClicked(false);
                    }}
                >
                    Delete
                </CustomButton>
            </Flex>
            <TableContainer
                backgroundColor="#ffffff"
                borderColor={
                    isUpdateButtonClicked
                        ? "#f0d124"
                        : isDeleteButtonClicked
                            ? "#ff0000"
                            : "#ebebeb"
                }
                borderRadius="1rem 0 0 1rem"
                borderWidth="2px"
                borderRight="none"
                overflowX="auto"
                ml="4"
            >
                <Table color="#000000" fontFamily="Montserrat" variant="unstyled">
                    <Thead boxShadow="sm">
                        <Tr>
                            <Th>No.</Th>
                            <Th>EmployeeId</Th>
                            <Th>First_Name</Th>
                            <Th>Middle_Name</Th>
                            <Th>Last_Name</Th>
                            <Th>Nickname</Th>
                            <Th>Email</Th>
                            <Th>Phone_Number</Th>
                            <Th>Address</Th>
                            <Th>Birthday</Th>
                            <Th>Linkedin</Th>
                            <Th>Facebook</Th>
                            <Th>Instagram</Th>
                            <Th>TikTok</Th>
                            <Th>Work</Th>
                            <Th>Connect</Th>
                            <Th>Support</Th>
                            <Th>Other_Notes</Th>
                            <Th>GenderId</Th>
                            <Th>CompanyId</Th>
                            <Th>CountryId</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {displayedEmployees.map((employee, index) => (
                            <Tr key={index}
                                borderBottom="1px solid #ebebeb"
                                onClick={() => (isUpdateButtonClicked || isDeleteButtonClicked) && handleRowClick(employee)}
                            >
                                <Td>{index + 1}</Td>
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
                                <Td>{employee.GenderId}</Td>
                                <Td>{employee.CompanyId}</Td>
                                <Td>{employee.CountryId}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            <Flex justifyContent="center" mt="4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onNextPage={handleNextPage}
                    onPrevPage={handlePrevPage}
                />
            </Flex>

            <Modal
                isOpen={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false);
                    resetEmployeesData();
                }}
                isCentered
            >
                <ModalOverlay />
                {isAddButtonClicked && (
                    <ModalContent bg="#24a2f0" minW="50%">
                        <ModalHeader
                            fontFamily="Montserrat"
                            fontWeight="800"
                            textAlign="center"
                            color="#ffffff"
                        >
                            Add Country
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <UploadPhoto label="Profile_Photo" />
                            <Grid templateColumns="1fr 1fr" gap="4" mt="4">
                                <Flex flexDirection="column">
                                    <FormItem label="First_Name" w="25%">
                                        <Textbox
                                            value={employeeData.First_Name}
                                            onChange={(e) => setEmployeeData({ ...employeeData, First_Name: e.target.value })}
                                        />
                                    </FormItem>
                                    <FormItem label="Middle_Name">
                                        <Textbox
                                            value={employeeData.Middle_Name}
                                            onChange={(e) => setEmployeeData({ ...employeeData, Middle_Name: e.target.value })}
                                        />
                                    </FormItem>
                                </Flex>
                                <Flex flexDirection="column">
                                    <FormItem label="Nickname">
                                        <Textbox
                                            value={employeeData.Nickname}
                                            onChange={(e) => setEmployeeData({ ...employeeData, Nickname: e.target.value })}
                                        />
                                    </FormItem>
                                    <FormItem label="Last_Name">
                                        <Textbox
                                            value={employeeData.Last_Name}
                                            onChange={(e) => setEmployeeData({ ...employeeData, Last_Name: e.target.value })}
                                        />
                                    </FormItem>
                                    <FormItem label="Birthday">
                                        <Textbox
                                            type="datetime-local"
                                            value={employeeData.Birthday}
                                            onChange={(e) => setEmployeeData({ ...employeeData, Birthday: e.target.value })}
                                        />
                                    </FormItem>
                                </Flex>
                            </Grid>
                            <Flex flexDirection="column">
                                <FormItem label="Address">
                                    <Textbox
                                        value={employeeData.Address}
                                        onChange={(e) => setEmployeeData({ ...employeeData, Address: e.target.value })}
                                    />
                                </FormItem>
                                <FormItem label="Email">
                                    <Textbox
                                        value={employeeData.Email}
                                        onChange={(e) => setEmployeeData({ ...employeeData, Email: e.target.value })}
                                    />
                                </FormItem>
                                <FormItem label="Phone_Number">
                                    <Textbox
                                        value={employeeData.Phone_Number}
                                        onChange={(e) => setEmployeeData({ ...employeeData, Phone_Number: e.target.value })}
                                    />
                                </FormItem>
                            </Flex>
                            <Grid templateColumns="1fr 1fr" gap="4" mt="4">
                                <Flex flexDirection="column">
                                    <FormItem label="Linkedin" w="25%">
                                        <Textbox
                                            value={employeeData.Linkedin}
                                            onChange={(e) => setEmployeeData({ ...employeeData, Linkedin: e.target.value })}
                                        />
                                    </FormItem>
                                    <FormItem label="Facebook">
                                        <Textbox
                                            value={employeeData.Facebook}
                                            onChange={(e) => setEmployeeData({ ...employeeData, Facebook: e.target.value })}
                                        />
                                    </FormItem>
                                </Flex>
                                <Flex flexDirection="column">
                                    <FormItem label="Instagram">
                                        <Textbox
                                            value={employeeData.Instagram}
                                            onChange={(e) => setEmployeeData({ ...employeeData, Instagram: e.target.value })}
                                        />
                                    </FormItem>
                                    <FormItem label="TikTok">
                                        <Textbox
                                            value={employeeData.TikTok}
                                            onChange={(e) => setEmployeeData({ ...employeeData, TikTok: e.target.value })}
                                        />
                                    </FormItem>
                                </Flex>
                            </Grid>
                            <Flex flexDirection="column">
                                <FormItem label="Work">
                                    <Textbox
                                        value={employeeData.Work}
                                        onChange={(e) => setEmployeeData({ ...employeeData, Work: e.target.value })}
                                    />
                                </FormItem>
                                <FormItem label="Connect">
                                    <Textbox
                                        value={employeeData.Connect}
                                        onChange={(e) => setEmployeeData({ ...employeeData, Connect: e.target.value })}
                                    />
                                </FormItem>
                                <FormItem label="Support">
                                    <Textbox
                                        value={employeeData.Support}
                                        onChange={(e) => setEmployeeData({ ...employeeData, Support: e.target.value })}
                                    />
                                </FormItem>
                                <FormItem label="Other_Notes">
                                    <Textbox
                                        value={employeeData.Other_Notes}
                                        onChange={(e) => setEmployeeData({ ...employeeData, Other_Notes: e.target.value })}
                                    />
                                </FormItem>
                            </Flex>
                            <Flex flexDirection="row-reverse">
                                <CustomButton bg="#ffffff" ml="4" onClick={() => {
                                    setIsFormOpen(false);
                                    setIsUpdateButtonClicked(false);
                                }}>Cancel
                                </CustomButton>
                                <CustomButton bg="#f0d124" onClick={handleAddEmployee}>Add</CustomButton>
                            </Flex>
                        </ModalBody>
                    </ModalContent>
                )}
                {isUpdateButtonClicked && (
                    <ModalContent bg="#24a2f0" minW="50%">
                        <ModalHeader
                            fontFamily="Montserrat"
                            fontWeight="800"
                            textAlign="center"
                            color="#ffffff"
                        >
                            Update Country
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {selectedEmployee && (
                                <>
                                    <UploadPhoto label="Profile_Photo" />
                                    <Grid templateColumns="1fr 1fr" gap="4" mt="4">
                                        <Flex flexDirection="column">
                                            <FormItem label="EmployeeId" w="25%">
                                                <Textbox
                                                    defaultValue={selectedEmployee.EmployeeId}
                                                    isDisabled
                                                />
                                            </FormItem>
                                            <FormItem label="First_Name">
                                                <Textbox
                                                    value={employeeData.First_Name}
                                                    onChange={(e) => setEmployeeData({ ...employeeData, First_Name: e.target.value })}
                                                />
                                            </FormItem>
                                            <FormItem label="Middle_Name">
                                                <Textbox
                                                    value={employeeData.Middle_Name}
                                                    onChange={(e) => setEmployeeData({ ...employeeData, Middle_Name: e.target.value })}
                                                />
                                            </FormItem>
                                        </Flex>
                                        <Flex flexDirection="column">
                                            <FormItem label="Nickname">
                                                <Textbox
                                                    value={employeeData.Nickname}
                                                    onChange={(e) => setEmployeeData({ ...employeeData, Nickname: e.target.value })}
                                                />
                                            </FormItem>
                                            <FormItem label="Last_Name">
                                                <Textbox
                                                    value={employeeData.Last_Name}
                                                    onChange={(e) => setEmployeeData({ ...employeeData, Last_Name: e.target.value })}
                                                />
                                            </FormItem>
                                            <FormItem label="Birthday">
                                                <Textbox
                                                    type="datetime-local"
                                                    value={employeeData.Birthday}
                                                    onChange={(e) => setEmployeeData({ ...employeeData, Birthday: e.target.value })}
                                                />
                                            </FormItem>
                                        </Flex>
                                    </Grid>
                                    <Flex flexDirection="column">
                                        <FormItem label="Address">
                                            <Textbox
                                                value={employeeData.Address}
                                                onChange={(e) => setEmployeeData({ ...employeeData, Address: e.target.value })}
                                            />
                                        </FormItem>
                                        <FormItem label="Email">
                                            <Textbox
                                                value={employeeData.Email}
                                                onChange={(e) => setEmployeeData({ ...employeeData, Email: e.target.value })}
                                            />
                                        </FormItem>
                                        <FormItem label="Phone_Number">
                                            <Textbox
                                                value={employeeData.Phone_Number}
                                                onChange={(e) => setEmployeeData({ ...employeeData, Phone_Number: e.target.value })}
                                            />
                                        </FormItem>
                                    </Flex>
                                    <Grid templateColumns="1fr 1fr" gap="4" mt="4">
                                        <Flex flexDirection="column">
                                            <FormItem label="Linkedin" w="25%">
                                                <Textbox
                                                    value={employeeData.Linkedin}
                                                    onChange={(e) => setEmployeeData({ ...employeeData, Linkedin: e.target.value })}
                                                />
                                            </FormItem>
                                            <FormItem label="Facebook">
                                                <Textbox
                                                    value={employeeData.Facebook}
                                                    onChange={(e) => setEmployeeData({ ...employeeData, Facebook: e.target.value })}
                                                />
                                            </FormItem>
                                        </Flex>
                                        <Flex flexDirection="column">
                                            <FormItem label="Instagram">
                                                <Textbox
                                                    value={employeeData.Instagram}
                                                    onChange={(e) => setEmployeeData({ ...employeeData, Instagram: e.target.value })}
                                                />
                                            </FormItem>
                                            <FormItem label="TikTok">
                                                <Textbox
                                                    value={employeeData.TikTok}
                                                    onChange={(e) => setEmployeeData({ ...employeeData, TikTok: e.target.value })}
                                                />
                                            </FormItem>
                                        </Flex>
                                    </Grid>
                                    <Flex flexDirection="column">
                                        <FormItem label="Work">
                                            <Textbox
                                                value={employeeData.Work}
                                                onChange={(e) => setEmployeeData({ ...employeeData, Work: e.target.value })}
                                            />
                                        </FormItem>
                                        <FormItem label="Connect">
                                            <Textbox
                                                value={employeeData.Connect}
                                                onChange={(e) => setEmployeeData({ ...employeeData, Connect: e.target.value })}
                                            />
                                        </FormItem>
                                        <FormItem label="Support">
                                            <Textbox
                                                value={employeeData.Support}
                                                onChange={(e) => setEmployeeData({ ...employeeData, Support: e.target.value })}
                                            />
                                        </FormItem>
                                        <FormItem label="Other_Notes">
                                            <Textbox
                                                value={employeeData.Other_Notes}
                                                onChange={(e) => setEmployeeData({ ...employeeData, Other_Notes: e.target.value })}
                                            />
                                        </FormItem>
                                    </Flex>
                                </>
                            )}
                            <Flex flexDirection="row-reverse">
                                <CustomButton bg="#ffffff" ml="4" onClick={() => {
                                    setIsFormOpen(false);
                                    setIsUpdateButtonClicked(false);
                                }}>Cancel
                                </CustomButton>
                                <CustomButton bg="#f0d124" onClick={handleUpdateEmployee}>Update</CustomButton>
                            </Flex>
                        </ModalBody>
                    </ModalContent>
                )}
                {isDeleteButtonClicked && (
                    <ModalContent bg="#24a2f0" minW="50%">
                        <ModalHeader
                            fontFamily="Montserrat"
                            fontWeight="800"
                            textAlign="center"
                            color="#ffffff"
                        >
                            Delete Employee
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {selectedEmployee && (
                                <>
                                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Are you sure you want to delete {selectedEmployee.First_Name}?</Text>
                                </>
                            )}
                            <Flex flexDirection="row-reverse">
                                <CustomButton bg="#ffffff" ml="4" onClick={() => {
                                    setIsFormOpen(false);
                                    setIsDeleteButtonClicked(false);
                                }}>Cancel
                                </CustomButton>
                                <CustomButton bg="#ff0000" onClick={handleDeleteEmployee}>Delete</CustomButton>
                            </Flex>
                        </ModalBody>
                    </ModalContent>
                )}
            </Modal>
        </Flex>
    );
};

export default Employees;
