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

type IndustryType = {
    IndustryTypeId: number;
    Industry_Name: string;
};

const IndustryTypes = () => {
    document.title = "Industry Types | Welby";

    const [industryTypes, setIndustryTypes] = useState<IndustryType[]>(
        [],
    );

    useEffect(() => {
        const fetchIndustryTypes = async () => {
            try {
                const industryTypeUrl = 'https://localhost:44373/api/GetIndustryTypes';
                let industryType = null;
                const param = { Active: 1 };

                axios
                    .get(industryTypeUrl, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        params: param,
                    })
                    .then((response) => {
                        industryType = response.data;
                        setIndustryTypes(industryType);
                    });
            } catch (error) {
                console.error('Error fetching industry types:', error);
            }
        };

        fetchIndustryTypes();
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
                            <Th>IndustryTypeId</Th>
                            <Th>Industry_Name</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {industryTypes.map((industryType, index) => (
                            <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>{industryType.IndustryTypeId}</Td>
                                <Td>{industryType.Industry_Name}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
};

export default IndustryTypes;
