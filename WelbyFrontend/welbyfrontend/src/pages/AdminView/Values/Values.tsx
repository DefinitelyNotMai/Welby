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

type Value = {
    ValueId: string;
    Title: string;
    Description: string;
};

const VALUE_DATA: Value = {
    ValueId: '',
    Title: '',
    Description: '',
}

const Values = () => {
    document.title = "Values | Welby";

    const [values, setValues] = useState<Value[]>([]);
    const [valueData, setValueData] = useState<Value>(VALUE_DATA);
    const [selectedValue, setSelectedValue] = useState<Value | null>(null);
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

    // PAGINATION start
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const startNumber = startIndex + 1;
    const displayedValues = values.slice(startIndex, endIndex);
    const totalPages = Math.ceil(values.length / itemsPerPage);

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

    const handleRowClick = (value: Value) => {
        setSelectedValue(value);
        setIsFormOpen(true);
    };

    const handleAddValue = () => {
        const value = {
            "Title": valueData.Title,
            "Description": valueData.Description,
            "Encode_By": 24287                                                                                                                                                               
        }

        var addValueUrl = 'https://localhost:44373/api/AddValue'
        axios
            .post(addValueUrl, value, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Value added.',
                    description: `${valueData.Title} has been added.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setSelectedValue(null);
            }).catch((error) => {
                console.log(error)
            });
    }

    const handleUpdateValue = () => {
        const value = {
            "ValueId": selectedValue?.ValueId,
            "Title": valueData.Title,
            "Description": valueData.Description,
            "Active": 1,
            "Encoded_By": 24287,
        }

        var updateValueUrl = 'https://localhost:44373/api/UpdateValue'

        axios
            .patch(updateValueUrl, value, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Value updated.',
                    description: `${selectedValue?.Title} has been updated.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setIsUpdateButtonClicked(false);
                setSelectedValue(null);
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleDeleteValue = () => {
        const value = {
            "ValueId": selectedValue?.ValueId
        }

        var deleteValueUrl = 'https://localhost:44373/api/RemoveValue'

        axios
            .patch(deleteValueUrl, value, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Value deleted.',
                    description: `${selectedValue?.ValueId} has been deleted.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setIsDeleteButtonClicked(false);
                setSelectedValue(null);
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
                            <Th>ValueId</Th>
                            <Th>Title</Th>
                            <Th>Description</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {displayedValues.map((value, index) => (
                            <Tr key={index}
                                borderBottom="1px solid #ebebeb"
                                onClick={() => (isUpdateButtonClicked || isDeleteButtonClicked) && handleRowClick(value)}
                            >
                                <Td>{index + 1}</Td>
                                <Td>{value.ValueId}</Td>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                                <Td>{value.Title}</Td>
                                <Td>{value.Description}</Td>
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
                            Update Values
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {selectedValue && (
                                <>
                                    <Flex flexDirection="column">
                                        <FormItem label="ValueId" w="25%">
                                            <Textbox
                                                defaultValue={selectedValue.ValueId}
                                                isDisabled
                                            />
                                        </FormItem>
                                        <FormItem label="Title">
                                            <Textbox
                                                value={selectedValue.Title}
                                                onChange={(e) => setValueData({ ...valueData, Title: e.target.value })}
                                            />
                                        </FormItem>
                                        <FormItem label="Description">
                                            <Textbox
                                                value={selectedValue.Description}
                                                onChange={(e) => setValueData({ ...valueData, Description: e.target.value })}
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
                                <CustomButton bg="#f0d124" onClick={handleUpdateValue}>Update</CustomButton>
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
                            Delete Value
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {selectedValue && (
                                <>
                                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Are you sure you want to delete {selectedValue.Title}?</Text>
                                </>
                            )}
                            <Flex flexDirection="row-reverse">
                                <CustomButton bg="#ffffff" ml="4" onClick={() => {
                                    setIsFormOpen(false);
                                    setIsDeleteButtonClicked(false);
                                }}>Cancel
                                </CustomButton>
                                <CustomButton bg="#ff0000" onClick={handleDeleteValue}>Delete</CustomButton>
                            </Flex>
                        </ModalBody>
                    </ModalContent>
                )}
            </Modal>
        </Flex>
    );
};

export default Values;
