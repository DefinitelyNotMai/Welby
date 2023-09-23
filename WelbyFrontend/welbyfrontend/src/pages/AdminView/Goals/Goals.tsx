import {
    Flex,
    Grid,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text,
    useToast,
} from '@chakra-ui/react';
import { TbFilePencil, TbFilePlus, TbTrash } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import axios from 'axios';

import CustomButton from '../../../components/Button';
import FormItem from '../../../components/Form/FormItem';
import Textbox from '../../../components/Textbox';
import Pagination from '../../../components/AdminView/Pagination';

type Goal = {
    GoalId: string;
    Title: string;
    Description: string;
    DurationFrom: string;
    DurationTo: string;
};

const GOAL_DATA: Goal = {
    GoalId: '',
    Title: '',
    Description: '',
    DurationFrom: '',
    DurationTo: '',
}

const Goals = () => {
    document.title = "Goals | Welby";

    const [goals, setGoals] = useState<Goal[]>([]);
    const [goalData, setGoalData] = useState<Goal>(GOAL_DATA);
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
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

    // PAGINATION start
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const startNumber = startIndex + 1;
    const displayedGoals = goals.slice(startIndex, endIndex);
    const totalPages = Math.ceil(goals.length / itemsPerPage);

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

    const handleRowClick = (goal: Goal) => {
        setSelectedGoal(goal);
        setGoalData({ ...goal });
        setIsFormOpen(true);
    };

    const handleAddGoal = () => {
        const goal = {
            "Title": goalData.Title,
            "Description": goalData.Description,
            "DurationTo": goalData.DurationTo,
            //duration from is set in the api to the date and time it was added
            "Encoded_By": 24287
        }
        var addGoalUrl = 'https://localhost:44373/api/AddGoal'
        axios
            .post(addGoalUrl, goal, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Goal added.',
                    description: `${goalData.Title} has been added.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setSelectedGoal(null);
            }).catch((error) => {
                console.log(error)
            });
    };

    const handleUpdateGoal = () => {
        const goal = {
            "GoalId": selectedGoal?.GoalId,
            "Title": goalData.Title,
            "Description": goalData.Description,
            "DurationTo": goalData.DurationTo,
            //duration from is set in the api to the date and time it was added
            "Encoded_By": 24287,
            "Active": 1
        };

        var updateGoalUrl = 'https://localhost:44373/api/UpdateGoal'
        axios
            .patch(updateGoalUrl, goal, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Goal updated.',
                    description: `Goal with GoalId: ${selectedGoal?.GoalId} has been updated.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setIsUpdateButtonClicked(false);
                setSelectedGoal(null);
            }).catch((error) => {
                console.log(error)
            });
    };

    const handleDeleteGoal = () => {
        const goal = {
            "GoalId": selectedGoal?.GoalId,
            "Encoded_By": 24287
        }

        var deleteGoalUrl = 'https://localhost:44373/api/RemoveGoal'
        axios
            .patch(deleteGoalUrl, goal, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Goal deleted.',
                    description: `Goal with GoalId:${selectedGoal?.GoalId} has been deleted.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setIsDeleteButtonClicked(false);
                setSelectedGoal(null);
            }).catch((error) => {
                console.log(error)
            });
    };

    const resetGoalData = () => {
        setGoalData({
            GoalId: '',
            Title: '',
            Description: '',
            DurationFrom: '',
            DurationTo: '',
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
                    }}>
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
                    }}>
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
                            <Th>GoalId</Th>
                            <Th>Title</Th>
                            <Th>Description</Th>
                            <Th>DurationFrom</Th>
                            <Th>DurationTo</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {displayedGoals.map((goal, index) => (
                            <Tr key={index}
                                borderBottom="1px solid #ebebeb"
                                onClick={() => (isUpdateButtonClicked || isDeleteButtonClicked) && handleRowClick(goal)}
                            >
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
                    resetGoalData();
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
                            Add Goal
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <>
                                <Flex flexDirection="column">
                                    <FormItem label="Title">
                                        <Textbox
                                            value={goalData.Title}
                                            onChange={(e) => setGoalData({ ...goalData, Title: e.target.value })}
                                        />
                                    </FormItem>
                                    <FormItem label="Description">
                                        <Textbox
                                            value={goalData.Description}
                                            onChange={(e) => setGoalData({ ...goalData, Description: e.target.value })}
                                        />
                                    </FormItem>
                                    <FormItem label="DurationTo">
                                        <Textbox
                                            type="datetime-local"
                                            value={goalData.DurationTo}
                                            onChange={(e) => setGoalData({ ...goalData, DurationTo: e.target.value })}
                                        />
                                    </FormItem>
                                </Flex>
                            </>
                            <Flex flexDirection="row-reverse">
                                <CustomButton bg="#ffffff" ml="4" onClick={() => {
                                    setIsFormOpen(false);
                                    setIsAddButtonClicked(false);
                                }}>Cancel
                                </CustomButton>
                                <CustomButton bg="#f0d124" onClick={handleAddGoal}>Add</CustomButton>
                            </Flex>
                        </ModalBody>
                    </ModalContent>
                )}
                {isUpdateButtonClicked && (
                    <ModalContent bg="#24a2f0" minW="50%">
                        <ModalHeader fontFamily="Montserrat"
                            fontWeight="800"
                            textAlign="center"
                            color="#ffffff"
                        >
                            UpdateGoal
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {selectedGoal && (
                                <>
                                    <Flex flexDirection="column">
                                        <FormItem label="GoalId" w="25%">
                                            <Textbox
                                                defaultValue={selectedGoal.GoalId}
                                                isDisabled
                                            />
                                        </FormItem>
                                        <FormItem label="Title">
                                            <Textbox
                                                value={selectedGoal.Title}
                                                onChange={(e) => setGoalData({ ...goalData, Title: e.target.value })}
                                            />
                                        </FormItem>
                                        <FormItem label="Description">
                                            <Textbox
                                                value={selectedGoal.Description}
                                                onChange={(e) => setGoalData({ ...goalData, Description: e.target.value })}
                                            />
                                        </FormItem>
                                    </Flex>
                                    <Grid templateColumns="1fr 1fr" gap="4" mt="4">
                                        <Flex flexDirection="column">
                                            <FormItem label="DurationFrom">
                                                <Textbox
                                                    type="datetime-local"
                                                    defaultValue={selectedGoal.DurationFrom}
                                                    isDisabled
                                                />
                                            </FormItem>
                                        </Flex>
                                        <Flex flexDirection="column">
                                            <FormItem label="DurationTo">
                                                <Textbox
                                                    type="datetime-local"
                                                    value={selectedGoal?.DurationTo}
                                                    onChange={(e) => setGoalData({ ...goalData, DurationTo: e.target.value })}
                                                />
                                            </FormItem>
                                        </Flex>
                                    </Grid>
                                </>
                            )}
                            <Flex flexDirection="row-reverse">
                                <CustomButton bg="#ffffff" ml="4" onClick={() => {
                                    setIsFormOpen(false);
                                    setIsUpdateButtonClicked(false);
                                }}>Cancel
                                </CustomButton>
                                <CustomButton bg="#f0d124" onClick={handleUpdateGoal}>Update</CustomButton>
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
                            Delete Goal
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {selectedGoal && (
                                <>
                                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Are you sure you want to delete {selectedGoal.Title}?</Text>
                                </>
                            )}
                            <Flex flexDirection="row-reverse">
                                <CustomButton bg="#ffffff" ml="4" onClick={() => {
                                    setIsFormOpen(false);
                                    setIsDeleteButtonClicked(false);
                                }}>Cancel
                                </CustomButton>
                                <CustomButton bg="#ff0000" onClick={handleDeleteGoal}>Delete</CustomButton>
                            </Flex>
                        </ModalBody>
                    </ModalContent>
                )}
            </Modal>
        </Flex>
    );
};

export default Goals;
