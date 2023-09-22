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
    Text,
    Th,
    Thead,
    Tr,
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

type Interest = {
    InterestId: string;
    Name: string;
};

const INTEREST_DATA: Interest = {
    InterestId: '',
    Name: '',
}

const Interests = () => {
    document.title = "Interests | Welby";

    const [interests, setInterests] = useState<Interest[]>([]);
    const [interestData, setInterestData] = useState<Interest>(INTEREST_DATA)
    const [selectedInterest, setSelectedInterest] = useState<Interest | null>(null);
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
        const fetchInterests = async () => {
            try {
                const interestUrl = 'https://localhost:44373/api/GetAllInterest';
                let interest = null;
                const param = { Active: 1 };

                axios
                    .get(interestUrl, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        params: param,
                    })
                    .then((response) => {
                        interest = response.data;
                        setInterests(interest);
                    });
            } catch (error) {
                console.error('Error fetching interests:', error);
            }
        };

        fetchInterests();
    }, []);

    // PAGINATION start
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const startNumber = startIndex + 1;
    const displayedInterests = interests.slice(startIndex, endIndex);
    const totalPages = Math.ceil(interests.length / itemsPerPage);

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

    const handleRowClick = (interest: Interest) => {
        setSelectedInterest(interest);
        setIsFormOpen(true);
    };

    const handleAddInterest = () => {
        const interest = {
            "Name": interestData.Name,
            "Encoded_By": 24287,
        }

        var addInterestUrl = 'https://localhost:44373/api/AddInterest'

        axios
            .post(addInterestUrl, interest, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Interest added.',
                    description: `${interestData.Name} has been added.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setSelectedInterest(null);
            })
       
    };

    const handleUpdateInterest = () => {
        const interest = {
            "InterestId": selectedInterest?.InterestId,
            "Name": interestData.Name,
            "Active": 1,
            "Encoded_By": 24287,
        }

        var updateInterestUrl = 'https://localhost:44373/api/UpdateInterest'

        axios
            .patch(updateInterestUrl, interest, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Interest updated.',
                    description: `${selectedInterest?.Name} has been updated.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setIsUpdateButtonClicked(false);
                setSelectedInterest(null);
            }).catch((error) => {
                console.log(error)
            });
        
    };

    const handleDeleteInterest = () => {
        const interest = {
            "InterestId": selectedInterest?.InterestId,
        }

        var deleteInterestUrl = 'https://localhost:44373/api/RemoveInterest'

        axios
            .patch(deleteInterestUrl, interest, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Interest deleted.',
                    description: `Interest with InterestId:${selectedInterest?.InterestId} has been deleted.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setIsDeleteButtonClicked(false);
                setSelectedInterest(null);
            }).catch((error) => {
                console.log(error)
            });
        
    };

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
                            <Th>InterestId</Th>
                            <Th>Name</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {displayedInterests.map((interest, index) => (
                            <Tr
                                key={index}
                                borderBottom="1px solid #ebebeb"
                                onClick={() => (isUpdateButtonClicked || isDeleteButtonClicked) && handleRowClick(interest)}
                            >
                                <Td>{startNumber + index}</Td>
                                <Td>{interest.InterestId}</Td>
                                <Td>{interest.Name}</Td>
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
                            Update Interest
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {selectedInterest && (
                                <>
                                    <UploadPhoto label="Logo" />
                                    <Grid templateColumns="1fr 1fr" gap="4" mt="4">
                                        <Flex flexDirection="column">
                                            <FormItem label="InterestId" w="25%">
                                                <Textbox
                                                    defaultValue={selectedInterest.InterestId}
                                                    isDisabled
                                                />
                                            </FormItem>
                                        </Flex>
                                        <Flex flexDirection="column">
                                            <FormItem label="Name">
                                                <Textbox
                                                    value={selectedInterest.Name}
                                                    onChange={(e) => setInterestData({...interestData, Name: e.target.value}) }
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
                                <CustomButton bg="#f0d124" onClick={handleUpdateInterest}>Update</CustomButton>
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
                            Delete Interest
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {selectedInterest && (
                                <>
                                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Are you sure you want to delete {selectedInterest.Name}?</Text>
                                </>
                            )}
                            <Flex flexDirection="row-reverse">
                                <CustomButton bg="#ffffff" ml="4" onClick={() => {
                                    setIsFormOpen(false);
                                    setIsDeleteButtonClicked(false);
                                }}>Cancel
                                </CustomButton>
                                <CustomButton bg="#ff0000" onClick={handleDeleteInterest}>Delete</CustomButton>
                            </Flex>
                        </ModalBody>
                    </ModalContent>
                )}
            </Modal>
        </Flex>
    );
};

export default Interests;
