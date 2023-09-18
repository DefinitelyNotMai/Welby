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

type Strength = {
    StrengthId: number;
    Strength: string;
    Category: string;
    Description: string;
};

const Strengths = () => {
    document.title = "Strenghts | Welby";

    const [strengths, setStrengths] = useState<Strength[]>([]);

    useEffect(() => {
        const fetchStrengths = async () => {
            try {
                const strengthUrl = 'https://localhost:44373/api/GetStrength';
                let strength = null;
                const param = { Active: 1 };

                axios
                    .get(strengthUrl, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        params: param,
                    })
                    .then((response) => {
                        strength = response.data;
                        setStrengths(strength);
                    });
            } catch (error) {
                console.error('Error fetching strengths:', error);
            }
        };

        fetchStrengths();
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
                            <Th>StrengthId</Th>
                            <Th>Strength</Th>
                            <Th>Category</Th>
                            <Th>Description</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {strengths.map((strength, index) => (
                            <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>{strength.StrengthId}</Td>
                                <Td>{strength.Strength}</Td>
                                <Td>{strength.Category}</Td>
                                <Td>{strength.Description}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
};

export default Strengths;
