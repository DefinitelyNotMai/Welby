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
import UploadPhoto from '../../../components/PhotoUpload';
import Textbox from '../../../components/Textbox';
import Pagination from '../../../components/AdminView/Pagination';

type Country = {
    CountryId: string;
    Name: string;
    Nationality: string;
    Flag_Image: string;
    Active: boolean;
};

const COUNTRY_DATA: Country = {
    CountryId: '',
    Name: '',
    Nationality: '',
    Flag_Image: '',
    Active: true,
}

const Countries = () => {
    document.title = "Countries | Welby";

    const [countries, setCountries] = useState<Country[]>([]);
    const [countryData, setCountryData] = useState<Country>(COUNTRY_DATA);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
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
        const fetchCountries = async () => {
            try {
                const countryUrl = 'https://localhost:44373/api/GetAllCountry';
                let country = null;
                const param = { Active: 1 };

                axios
                    .get(countryUrl, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        params: param,
                    })
                    .then((response) => {
                        country = response.data;
                        setCountries(country);
                    });
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    // PAGINATION start
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const startNumber = startIndex + 1;
    const displayedCountries = countries.slice(startIndex, endIndex);
    const totalPages = Math.ceil(countries.length / itemsPerPage);

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

    const handleRowClick = (country: Country) => {
        setSelectedCountry(country);
        setCountryData({ ...country });
        setIsFormOpen(true);
    };

    const handleAddCountry =  () => {
        const country = {
            "Name": selectedCountry?.Name,
            "Nationality": selectedCountry?.Nationality,
            "Flag_Image": selectedCountry?.Flag_Image,
            "Encoded_By": 24287 // need to change this once roles are set in sign up.
        }

        var addCountryUrl = 'https://localhost:44373/api/AddCountry'

        axios
            .post(addCountryUrl, country, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Country added.',
                    description: `${countryData.Name} has been added.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setSelectedCountry(null);
            }).catch((error) => {
                console.log(error)
            });
    };

    const handleUpdateCountry = () => {
        const country = {
            "CountryId": countryData.CountryId,
            "Name": countryData.Name,
            "Nationality": countryData.Nationality,
            "Flag_Image": countryData.Flag_Image,
            "Active": 1,
            "Encoded_By": 24287 // need to change this once roles are set in sign up.
        }

        var updateCountryUrl = 'https://localhost:44373/api/UpdateCountry'

        axios
            .patch(updateCountryUrl, country, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Country updated.',
                    description: `${selectedCountry?.Name} has been updated.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setIsUpdateButtonClicked(false);
                setSelectedCountry(null);
            }).catch((error) => {
                console.log(error)
            });

        
    };

    const handleDeleteCountry = () => {
        const country = {
            "CountryId": selectedCountry?.CountryId,
            "Encoded_By": 24287 // need to change this once roles are set in sign up.
        }

        var deleteCountryUrl = 'https://localhost:44373/api/RemoveCountry'

        axios
            .patch(deleteCountryUrl, country, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Country deleted.',
                    description: `${selectedCountry?.Name} has been deleted.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setIsDeleteButtonClicked(false);
                setSelectedCountry(null);
            }).catch((error) => {
                console.log(error)
            });
        // need to reload set of datas after changes
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
                            <Th>CountryId</Th>
                            <Th>Name</Th>
                            <Th>Nationality</Th>
                            <Th>Flag_Image</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {displayedCountries.map((country, index) => (
                            <Tr
                                key={index}
                                borderBottom="1px solid #ebebeb"
                                onClick={() => (isUpdateButtonClicked || isDeleteButtonClicked) && handleRowClick(country)}
                            >
                                <Td>{startNumber + index}</Td>
                                <Td>{country.CountryId}</Td>
                                <Td>{country.Name}</Td>
                                <Td>{country.Nationality}</Td>
                                <Td>{country.Flag_Image}</Td>
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
                            Update Country
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {selectedCountry && (
                                <>
                                    <UploadPhoto label="Logo" />
                                    <Grid templateColumns="1fr 1fr" gap="4" mt="4">
                                        <Flex flexDirection="column">
                                            <FormItem label="CountryId" w="25%">
                                                <Textbox
                                                    defaultValue={selectedCountry.CountryId}
                                                    isDisabled
                                                />
                                            </FormItem>
                                        </Flex>
                                        <Flex flexDirection="column">
                                            <FormItem label="Name">
                                            <Textbox
                                                value={countryData.Name}
                                                onChange={(e) => setCountryData({ ...countryData, Name: e.target.value })}
                                            />
                                            </FormItem>
                                        </Flex>
                                    </Grid>
                                    <Flex alignContent="center">
                                        <FormItem label="Nationality">
                                            <Textbox
                                                value={countryData.Nationality}
                                                onChange={(e) => setCountryData({ ...countryData, Nationality: e.target.value })}
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
                                <CustomButton bg="#f0d124" onClick={handleUpdateCountry}>Update</CustomButton>
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
                            Delete Country
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {selectedCountry && (
                                <>
                                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Are you sure you want to delete {selectedCountry.Name}?</Text>
                                </>
                            )}
                            <Flex flexDirection="row-reverse">
                                <CustomButton bg="#ffffff" ml="4" onClick={() => {
                                    setIsFormOpen(false);
                                    setIsDeleteButtonClicked(false);
                                }}>Cancel
                                </CustomButton>
                                <CustomButton bg="#ff0000" onClick={handleDeleteCountry}>Delete</CustomButton>
                            </Flex>
                        </ModalBody>
                    </ModalContent>
                )}
            </Modal>
        </Flex>
    );
};

export default Countries;
