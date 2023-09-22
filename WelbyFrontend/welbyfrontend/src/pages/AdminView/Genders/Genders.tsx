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

type Gender = {
    GenderId: string;
    Gender: string;
    Biological: string;
};

const GENDER_DATA: Gender = {
    GenderId: '',
    Gender: '',
    Biological: '',
}

const Genders = () => {
    document.title = "Genders | Welby";

    const [genders, setGenders] = useState<Gender[]>([]);
    const [genderData, setGenderData] = useState<Gender>(GENDER_DATA);
    const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
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

    // PAGINATION start
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const startNumber = startIndex + 1;
    const displayedGenders = genders.slice(startIndex, endIndex);
    const totalPages = Math.ceil(genders.length / itemsPerPage);

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

    const handleRowClick = (gender: Gender) => {
        setSelectedGender(gender);
        setGenderData({ ...gender });
        setIsFormOpen(true);
    };

    const handleAddGender = () => {
        const gender = {
            "Gender": genderData.Gender,
            "Biological": genderData.Biological,
            "Encoded_By": 24287,
        }

        var addGenderUrl = 'https://localhost:44373/api/AddGender'
        axios
            .post(addGenderUrl, gender, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Gender added.',
                    description: `${genderData.Gender} has been added.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setSelectedGender(null);
            }).catch((error) => {
                console.log(error)
            });
    }

    const handleUpdateGender = () => {
        const gender = {
            "GenderId": genderData.GenderId,
            "Gender": genderData.Gender,
            "Biological": genderData.Biological,
            "Active": 1,
            "Encoded_By": 24287,
        }

        var updateGenderUrl = 'https://localhost:44373/api/UpdateGender'

        axios
            .patch(updateGenderUrl, gender, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Gender updated.',
                    description: `Gender with GenderId:${selectedGender?.GenderId} has been updated.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setIsUpdateButtonClicked(false);
                setSelectedGender(null);
            }).catch((error) => {
                console.log(error)
            });
    }

    const handleDeleteGender = () => {
        const gender = {
            "GenderId": genderData.GenderId,
            "Encoded_By": 24287,
        }

        var deleteGenderUrl = 'https://localhost:44373/api/RemoveGender'
        axios
            .patch(deleteGenderUrl, gender, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Gender deleted.',
                    description: `Gender with GenderId:${selectedGender?.GenderId} has been deleted.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setIsDeleteButtonClicked(false);
                setSelectedGender(null);
            }).catch((error) => {
                console.log(error)
            });
    };

    const resetGenderData = () => {
        setGenderData({
            GenderId: '',
            Gender: '',
            Biological: '',
        })
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
                            <Th>GenderId</Th>
                            <Th>Gender</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {displayedGenders.map((gender, index) => (
                            <Tr key={index}
                                borderBottom="1px solid #ebebeb"
                                onClick={() => (isUpdateButtonClicked || isDeleteButtonClicked) && handleRowClick(gender)}
                            >
                                <Td>{index + 1}</Td>
                                <Td>{gender.GenderId}</Td>
                                <Td>{gender.Gender}</Td>
                                <Td>{gender.Biological}</Td>
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
                    resetGenderData();
                }}
                isCentered>
                <ModalOverlay />
                {isAddButtonClicked && (
                    <ModalContent>
                        <ModalHeader>
                        Add Gender
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <>
                                <Grid templateColumns="1fr 1fr" gap="4" mt="4">
                                    <Flex flexDirection="column">
                                        <FormItem label="Gender" w="25%">
                                            <Textbox
                                                value={genderData.Gender}
                                                onChange={(e) => setGenderData({ ...genderData, Gender: e.target.value })}
                                            />
                                        </FormItem>
                                    </Flex>
                                    <Flex flexDirection="column">
                                        <FormItem label="Biological">
                                            <Textbox
                                                value={genderData.Biological}
                                                onChange={(e) => setGenderData({ ...genderData, Biological: e.target.value })}
                                            />
                                        </FormItem>
                                    </Flex>
                                </Grid>
                            </>
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
                                UpdateCountry
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                {selectedGender && (
                                    <>
                                        <Grid templateColumns="1fr 1fr 1fr" gap="4" mt="4">
                                            <Flex flexDirection="column">
                                                <FormItem label="GenderId" w="25%">
                                                    <Textbox
                                                        defaultValue={selectedGender.GenderId}
                                                        isDisabled
                                                    />
                                                </FormItem>
                                            </Flex>
                                            <Flex flexDirection="column">
                                            <FormItem label="Gender" w="25%">
                                                    <Textbox
                                                    value={selectedGender.Gender}
                                                        onChange={(e) => setGenderData({ ...genderData, Gender: e.target.value })}
                                                    />
                                                </FormItem>
                                            </Flex>
                                            <Flex flexDirection="column">
                                                <FormItem label="Biological">
                                                    <Textbox
                                                    value={selectedGender.Biological}
                                                        onChange={(e) => setGenderData({ ...genderData, Biological: e.target.value })}
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
                                    <CustomButton bg="#f0d124" onClick={handleUpdateGender}>Update</CustomButton>
                                </Flex>
                            </ModalBody>
                        </ModalContent>
                )}{isDeleteButtonClicked && (
                    <ModalContent bg="#24a2f0" minW="50%">
                        <ModalHeader
                            fontFamily="Montserrat"
                            fontWeight="800"
                            textAlign="center"
                            color="#ffffff"
                        >
                            Delete Gender
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {selectedGender && (
                                <>
                                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Are you sure you want to delete {selectedGender.Gender}?</Text>
                                </>
                            )}
                            <Flex flexDirection="row-reverse">
                                <CustomButton bg="#ffffff" ml="4" onClick={() => {
                                    setIsFormOpen(false);
                                    setIsDeleteButtonClicked(false);
                                }}>Cancel
                                </CustomButton>
                                <CustomButton bg="#ff0000" onClick={handleDeleteGender}>Delete</CustomButton>
                            </Flex>
                        </ModalBody>
                    </ModalContent>
                )}
            </Modal>
        </Flex>
    );
};

export default Genders;
