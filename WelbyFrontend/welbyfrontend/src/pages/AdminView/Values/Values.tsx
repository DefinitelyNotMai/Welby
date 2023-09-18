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

type Value = {
    ValueId: number;
    Title: string;
    Description: string;
};

const Values = () => {
    document.title = "Values | Welby";

    const [values, setValues] = useState<Value[]>(
        [],
    );

    useEffect(() => {
        const fetchValues = async () => {
            try {
                const valueUrl = 'https://localhost:44373/api/GetValues';
                let value = null;
                const param = { Active: 1 };

                axios
                    .get(valueUrl, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        params: param,
                    })
                    .then((response) => {
                        value = response.data;
                        setValues(value);
                    });
            } catch (error) {
                console.error('Error fetching values:', error);
            }
        };

        fetchValues();
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
                            <Th>ValueId</Th>
                            <Th>Title</Th>
                            <Th>Description</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {values.map((value, index) => (
                            <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>{value.ValueId}</Td>
                                <Td>{value.Title}</Td>
                                <Td>{value.Description}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
};

export default Values;
