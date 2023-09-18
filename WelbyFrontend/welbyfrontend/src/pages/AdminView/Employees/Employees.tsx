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
} from '@chakra-ui/react';
import { TbFilePencil, TbFilePlus, TbTrash } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomButton from '../../../components/AdminView/Button';

type Employee = {
    EmployeeId: number;
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

const Employees = () => {
    document.title = "Employees | Welby";

    const [employees, setEmployees] = useState<Employee[]>(
        [],
    );

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

    return (
        <Flex flexDirection="column" w="full">
            <Flex flexDirection="row" m="4">
                <CustomButton icon={TbFilePlus} iconColor="#44a348" mr="4">
                    Add
                </CustomButton>
                <CustomButton icon={TbFilePencil} iconColor="#24a2f0">
                    Update
                </CustomButton>
                <Spacer />
                <CustomButton icon={TbTrash} iconColor="#295555">
                    Delete
                </CustomButton>
            </Flex>
            <TableContainer
                backgroundColor="#ffffff"
                borderRadius="1rem 0 0 1rem"
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
                        {employees.map((employee, index) => (
                            <Tr key={index}>
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
        </Flex>
    );
};

export default Employees;
