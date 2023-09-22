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
    useToast,
    Text,
} from '@chakra-ui/react';
import { TbFilePencil, TbFilePlus, TbTrash } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import axios from 'axios';

import CustomButton from '../../../components/Button';
import FormItem from '../../../components/Form/FormItem';
import Textbox from '../../../components/Textbox';
import Pagination from '../../../components/AdminView/Pagination';

type Strength = {
    StrengthId: string;
    Strength: string;
    Category: string;
    Description: string;
};

const STRENGTH_DATA: Strength = {
    StrengthId: '',
    Strength: '',
    Category: '',
    Description: '',
}

const Strengths = () => {
    document.title = "Strenghts | Welby";

    const [strengths, setStrengths] = useState<Strength[]>([]);
    const [strengthData, setStrengthData] = useState<Strength>(STRENGTH_DATA);
    const [selectedStrength, setSelectedStrength] = useState<Strength | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
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

    // PAGINATION start
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const startNumber = startIndex + 1;
    const displayedStrengths = strengths.slice(startIndex, endIndex);
    const totalPages = Math.ceil(strengths.length / itemsPerPage);

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

    const handleRowClick = (strength: Strength) => {
        setSelectedStrength(strength);
        setIsFormOpen(true);
    };

    const handleAddStrength = () => {
        const strength = {
            "Strength": strengthData.Strength,
            "Category": strengthData.Category,
            "Description": strengthData.Description,
            "Encoded_By": 24287,
        }

        var addStrengthUrl = 'https://localhost:44373/api/AddStrength'

        axios
            .post(addStrengthUrl, strength, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Strength added.',
                    description: `${strengthData.Strength} has been added.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setSelectedStrength(null);
            }).catch((error) => {
                console.log(error)
            });

    }

    const handleUpdateStrength = () => {
        const strength = {
            "StrengthId": selectedStrength?.StrengthId,
            "Strength": strengthData.Strength,
            "Category": strengthData.Category,
            "Description": strengthData.Description,
            "Active": 1,
            "Encoded_By": 24287,
        }
        var updateStrengthUrl = 'https://localhost:44373/api/UpdateStrength'

        axios
            .patch(updateStrengthUrl, strength, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Strength updated.',
                    description: `${selectedStrength?.Strength} has been updated.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setIsUpdateButtonClicked(false);
                setSelectedStrength(null);
            }).catch((error) => {
                console.log(error)
            });
    }

    const handleDeleteStrength = () => {
        const strength = {
            "StrengthId": selectedStrength?.StrengthId
        }

        var deleteStrengthUrl = 'https://localhost:44373/api/RemoveStrength'

        axios
            .patch(deleteStrengthUrl, strength, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Strength deleted.',
                    description: `${selectedStrength?.StrengthId} has been deleted.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setIsDeleteButtonClicked(false);
                setSelectedStrength(null);
            }).catch((error) => {
                console.log(error)
            });
    }


    return (
        <Flex flexDirection="column" w="full">
            <Flex flexDirection="row" m="4">
                <CustomButton bg="#ffffff" icon={TbFilePlus} iconColor="#44a348" mr="4">
                    Add
                </CustomButton>
                <CustomButton
                    bg={isUpdateButtonClicked ? "#f0d124" : "#ffffff"}
                    icon={TbFilePencil}
                    iconColor="#24a2f0"
                    onClick={() => {
                        setIsUpdateButtonClicked(!isUpdateButtonClicked);
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
                            <Th>StrengthId</Th>
                            <Th>Strength</Th>
                            <Th>Category</Th>
                            <Th>Description</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {displayedStrengths.map((strength, index) => (
                            <Tr key={index} borderBottom="1px solid #ebebeb"
                                onClick={() => (isUpdateButtonClicked || isDeleteButtonClicked) && handleRowClick(strength)}
                            >
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
                onClose={() => setIsFormOpen(false)}
                isCentered
            >
                <ModalOverlay />
                {isUpdateButtonClicked && (
                    <ModalContent bg="#24a2f0" minW="50%">
                        <ModalHeader
                            fontFamily="Montserrat"
                            fontWeight="800"
                            textAlign="center"
                            color="#ffffff"
                        >
                            Update Strength
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {selectedStrength && (
                                <>
                                    <Flex alignContent="center">
                                        <FormItem label="StrengthId" w="25%">
                                            <Textbox
                                                defaultValue={selectedStrength.StrengthId}
                                                isDisabled
                                            />                                                                                                                                                    
                                        </FormItem>
                                    </Flex>                                                                                                      
                                    <Grid templateColumns="1fr 1fr" gap="4" mt="4">
                                        <Flex flexDirection="column">
                                            <FormItem label="Strength">
                                                <Textbox
                                                    value={selectedStrength.Strength}
                                                    onChange={(e) => setStrengthData({ ...strengthData, Strength: e.target.value })}
                                                />
                                            </FormItem> 
                                               
                                        </Flex>
                                        <Flex flexDirection="column">
                                            <FormItem label="Category">
                                                <Textbox
                                                    value={selectedStrength.Category}
                                                    onChange={(e) => setStrengthData({ ...strengthData, Category: e.target.value })}
                                                />
                                            </FormItem>
                                        </Flex>
                                    </Grid>
                                    <Flex alignContent="center">
                                        <FormItem label="Description">
                                            <Textbox
                                                value={selectedStrength.Description}
                                                onChange={(e) => setStrengthData({ ...strengthData, Description: e.target.value })}
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
                                <CustomButton bg="#f0d124" onClick={handleUpdateStrength}>Update</CustomButton>
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
                            Delete Company
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {selectedStrength && (
                                <>
                                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Are you sure you want to delete {selectedStrength.Strength}?</Text>
                                </>
                            )}
                            <Flex flexDirection="row-reverse">
                                <CustomButton bg="#ffffff" ml="4" onClick={() => {
                                    setIsFormOpen(false);
                                    setIsDeleteButtonClicked(false);
                                }}>Cancel
                                </CustomButton>
                                <CustomButton bg="#ff0000" onClick={handleDeleteStrength}>Delete</CustomButton>
                            </Flex>
                        </ModalBody>
                    </ModalContent>
                )}
            </Modal>
        </Flex>
    );
};

export default Strengths;
