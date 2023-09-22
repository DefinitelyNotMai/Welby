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
    useToast
} from '@chakra-ui/react';
import { TbFilePencil, TbFilePlus, TbTrash } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import axios from 'axios';

import CustomButton from '../../../components/Button';
import FormItem from '../../../components/Form/FormItem';
import Textbox from '../../../components/Textbox';
import Pagination from '../../../components/AdminView/Pagination';

type IndustryType = {
    IndustryTypeId: string;
    Industry_Name: string;
};

const INDUSTRYTYPE_DATA: IndustryType = {
    IndustryTypeId: '',
    Industry_Name: '',
}

const IndustryTypes = () => {
    document.title = "Industry Types | Welby";

    const [industryTypes, setIndustryTypes] = useState<IndustryType[]>([]);
    const [industryTypeData, setIndustryTypeData] = useState<IndustryType>(INDUSTRYTYPE_DATA);
    const [selectedIndustryType, setSelectedIndustryType] = useState<IndustryType | null>(null);
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

    // PAGINATION start
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const startNumber = startIndex + 1;
    const displayedIndustryTypes = industryTypes.slice(startIndex, endIndex);
    const totalPages = Math.ceil(industryTypes.length / itemsPerPage);

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

    const handleRowClick = (industryType: IndustryType) => {
        setSelectedIndustryType(industryType);
        setIsFormOpen(true);
    };

    const handleAddIndustryType = () => {
        const industry = {
            "Industry_Name": industryTypeData.Industry_Name,
            "Encoded_By": 24287,
        }
        var addIndustryTypeUrl = 'https://localhost:44373/api/AddIndustryType'

        axios
            .post(addIndustryTypeUrl, industry, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Industry Type added.',
                    description: `${industryTypeData.Industry_Name} has been added.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setSelectedIndustryType(null);
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleUpdateIndustryType = () => {
        const industry = {
            "IndustryTypeId": selectedIndustryType?.IndustryTypeId,
            "Name": industryTypeData.Industry_Name,
            "Active": 1,
            "Encoded_By": 24287,
        }
        var updateIndustryTypeUrl = 'https://localhost:44373/api/UpdateIndustryType'
        axios
            .patch(updateIndustryTypeUrl, industry, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'IndustryType updated.',
                    description: `${selectedIndustryType?.Industry_Name} has been updated.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setIsUpdateButtonClicked(false);
                setSelectedIndustryType(null);
            }).catch((error) => {
                console.log(error)
            });
    }

    const handleDeleteIndustryType = () => {
        const industry = {
            "IndustryTypeId": selectedIndustryType?.IndustryTypeId,
        }

        var deleteIndustryTypeUrl = 'https://localhost:44373/api/RemoveInterest'

        axios
            .patch(deleteIndustryTypeUrl, industry, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Interest deleted.',
                    description: `Interest with InterestId:${selectedIndustryType?.IndustryTypeId} has been deleted.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setIsDeleteButtonClicked(false);
                setSelectedIndustryType(null);
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
                <CustomButton bg={isUpdateButtonClicked ? "#f0d124" : "#ffffff"}
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
                            <Th>IndustryTypeId</Th>
                            <Th>Industry_Name</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {displayedIndustryTypes.map((industryType, index) => (
                            <Tr key={index}
                                borderBottom="1px solid #ebebeb"
                                onClick={() => (isUpdateButtonClicked || isDeleteButtonClicked) && handleRowClick(interest)}
                            >
                                <Td>{index + 1}</Td>
                                <Td>{industryType.IndustryTypeId}</Td>
                                <Td>{industryType.Industry_Name}</Td>
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
                        <ModalHeader fontFamily="Montserrat"
                            fontWeight="800"
                            textAlign="center"
                            color="#ffffff"
                        >
                            Update Industry Type
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {selectedIndustryType && (
                                <>
                                    <Grid templateColumns="1fr 1fr" gap="4" mt="4">
                                        <Flex flexDirection="column">
                                            <FormItem label="IndustryTypeId" w="25%">
                                                <Textbox
                                                    defaultValue={selectedIndustryType.IndustryTypeId}
                                                    isDisabled
                                                />
                                            </FormItem>
                                        </Flex>
                                        <Flex flexDirection="column">
                                            <FormItem label="IndustryType">
                                                <Textbox
                                                    value={selectedIndustryType.Industry_Name}
                                                    onChange={(e) => setIndustryTypeData({ ...industryTypeData, Industry_Name: e.target.value })}
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
                                <CustomButton bg="#f0d124" onClick={handleUpdateIndustryType}>Update</CustomButton>
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
                            Delete Industry Type
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {selectedIndustryType && (
                                <>
                                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Are you sure you want to delete {selectedIndustryType.Industry_Name}?</Text>
                                </>
                            )}
                            <Flex flexDirection="row-reverse">
                                <CustomButton bg="#ffffff" ml="4" onClick={() => {
                                    setIsFormOpen(false);
                                    setIsDeleteButtonClicked(false);
                                }}>Cancel
                                </CustomButton>
                                <CustomButton bg="#ff0000" onClick={handleDeleteIndustryType}>Delete</CustomButton>
                            </Flex>
                        </ModalBody>
                    </ModalContent>
                )}
            </Modal>
        </Flex>
    );
};

export default IndustryTypes;
