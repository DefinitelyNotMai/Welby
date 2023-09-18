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

type Goal = {
    GoalId: number;
    Title: string;
    Description: string;
    DurationFrom: string;
    DurationTo: string;
};

const Goals = () => {
    document.title = "Goals | Welby";

    const [goals, setGoals] = useState<Goal[]>([]);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const goalUrl = 'https://localhost:44373/api/GetGoals';
                let goal = null;
                const param = { Active: 1 };

                axios
                    .get(goalUrl, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        params: param,
                    })
                    .then((response) => {
                        goal = response.data;
                        setGoals(goal);
                    });
            } catch (error) {
                console.error('Error fetching goals:', error);
            }
        };

        fetchGoals();
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
                            <Th>GoalId</Th>
                            <Th>Title</Th>
                            <Th>Description</Th>
                            <Th>DurationFrom</Th>
                            <Th>DurationTo</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {goals.map((goal, index) => (
                            <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>{goal.GoalId}</Td>
                                <Td>{goal.Title}</Td>
                                <Td>{goal.Description}</Td>
                                <Td>{goal.DurationFrom}</Td>
                                <Td>{goal.DurationTo}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
};

export default Goals;
