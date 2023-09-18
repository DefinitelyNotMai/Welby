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

type Gender = {
    GenderId: string;
    Gender: string;
};

const Genders = () => {
    document.title = "Genders | Welby";

    const [genders, setGenders] = useState<Gender[]>([]);

    useEffect(() => {
        const fetchGenders = async () => {
            try {
                const genderUrl = 'https://localhost:44373/api/GetGender';
                let gender = null;
                const param = { Active: 1 };

                axios
                    .get(genderUrl, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        params: param,
                    })
                    .then((response) => {
                        gender = response.data;
                        setGenders(gender);
                    });
            } catch (error) {
                console.error('Error fetching genders:', error);
            }
        };

        fetchGenders();
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
                            <Th>GenderId</Th>
                            <Th>Gender</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {genders.map((gender, index) => (
                            <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>{gender.GenderId}</Td>
                                <Td>{gender.Gender}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
};

export default Genders;
