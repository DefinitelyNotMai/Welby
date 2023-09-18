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
    useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TbFilePencil, TbFilePlus, TbTrash } from 'react-icons/tb';

import CustomButton from '../../../components/Button';
import FormItem from '../../../components/Form/FormItem';
import UploadPhoto from '../../../components/PhotoUpload';
import Textbox from '../../../components/Textbox';
import Pagination from '../../../components/AdminView/Pagination';

type Company = {
    CompanyId: string;
    Name: string;
    Email: string;
    Phone_Number: string;
    Website: string;
    Address: string;
    Vision: string;
    Mission: string;
    Logo: string;
    CountryId: string;
    IndustryTypeId: string;
    FoundingDate: string;
};

const Companies = () => {
    document.title = 'Companies | Welby';

    const [companies, setCompanies] = useState<Company[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isUpdateButtonClicked, setIsUpdateButtonClicked] = useState(false);
    const [isDeleteButtonClicked, setIsDeleteButtonClicked] = useState(false);
    const itemsPerPage = 10;

    const toast = useToast();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const companyUrl = 'https://localhost:44373/api/GetCompanies';
                let company = null;
                const param = { Active: 1 };

                axios
                    .get(companyUrl, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        params: param,
                    })
                    .then((response) => {
                        company = response.data;
                        setCompanies(company);
                    });
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };

        fetchCompanies();
    }, []);

    // PAGINATION start
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const startNumber = startIndex + 1;
    const displayedCompanies = companies.slice(startIndex, endIndex);
    const totalPages = Math.ceil(companies.length / itemsPerPage);

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

    const handleRowClick = (company: Company) => {
        setSelectedCompany(company);
        setIsFormOpen(true);
    };

    const handleAddCompany = () => {
        toast({
            title: 'Company added.',
            description: `${selectedCompany?.Name} has been added.`,
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
        setIsFormOpen(false);
        setSelectedCompany(null);
    };

    const handleUpdateCompany = () => {
        toast({
            title: 'Company updated.',
            description: `${selectedCompany?.Name} has been updated.`,
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
        setIsFormOpen(false);
        setIsUpdateButtonClicked(false);
        setSelectedCompany(null);
    };

    const handleDeleteCompany = () => {
        toast({
            title: 'Company deleted.',
            description: `${selectedCompany?.Name} has been deleted.`,
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
        setIsFormOpen(false);
        setIsDeleteButtonClicked(false);
        setSelectedCompany(null);
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
                        <Tr borderBottom="1px solid #ebebeb">
                            <Th>No.</Th>
                            <Th>CompanyId</Th>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Phone_Number</Th>
                            <Th>Website</Th>
                            <Th>Address</Th>
                            <Th>Vision</Th>
                            <Th>Mission</Th>
                            <Th>Logo</Th>
                            <Th>CountryId</Th>
                            <Th>IndustryTypeId</Th>
                            <Th>FoundingDate</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {displayedCompanies.map((company, index) => (
                            <Tr
                                key={index}
                                borderBottom="1px solid #ebebeb"
                                onClick={() => (isUpdateButtonClicked || isDeleteButtonClicked) && handleRowClick(company)}
                            >
                                <Td>{startNumber + index}</Td>
                                <Td>{company.CompanyId}</Td>
                                <Td>{company.Name}</Td>
                                <Td>{company.Email}</Td>
                                <Td>{company.Phone_Number}</Td>
                                <Td>{company.Website}</Td>
                                <Td>{company.Address}</Td>
                                <Td>{company.Vision}</Td>
                                <Td>{company.Mission}</Td>
                                <Td>{company.Logo}</Td>
                                <Td>{company.CountryId}</Td>
                                <Td>{company.IndustryTypeId}</Td>
                                <Td>{company.FoundingDate}</Td>
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
                            Update Company
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {selectedCompany && (
                                <>
                                    <UploadPhoto label="Logo" />
                                    <Grid templateColumns="1fr 1fr" gap="4" mt="4">
                                        <Flex flexDirection="column">
                                            <FormItem label="CompanyId" w="25%">
                                                <Textbox
                                                    defaultValue={selectedCompany.CompanyId}
                                                    isDisabled
                                                />
                                            </FormItem>
                                            <FormItem label="Email">
                                                <Textbox defaultValue={selectedCompany.Email} />
                                            </FormItem>
                                            <FormItem label="Website">
                                                <Textbox defaultValue={selectedCompany.Website} />
                                            </FormItem>
                                            <FormItem label="Vision">
                                                <Textbox defaultValue={selectedCompany.Vision} />
                                            </FormItem>
                                            <FormItem label="CountryId">
                                                <Textbox defaultValue={selectedCompany.CountryId} />
                                            </FormItem>
                                        </Flex>
                                        <Flex flexDirection="column">
                                            <FormItem label="Name">
                                                <Textbox defaultValue={selectedCompany.Name} />
                                            </FormItem>
                                            <FormItem label="Phone_Number">
                                                <Textbox defaultValue={selectedCompany.Phone_Number} />
                                            </FormItem>
                                            <FormItem label="Address">
                                                <Textbox defaultValue={selectedCompany.Address} />
                                            </FormItem>
                                            <FormItem label="Mission">
                                                <Textbox defaultValue={selectedCompany.Mission} />
                                            </FormItem>
                                            <FormItem label="IndustryTypeId">
                                                <Textbox defaultValue={selectedCompany.IndustryTypeId} />
                                            </FormItem>
                                        </Flex>
                                    </Grid>
                                    <Flex alignContent="center">
                                        <FormItem label="FoundingDate">
                                            <Textbox
                                                type="datetime-local"
                                                defaultValue={selectedCompany.FoundingDate}
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
                                <CustomButton bg="#f0d124" onClick={handleUpdateCompany}>Update</CustomButton>
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
                            {selectedCompany && (
                                <>
                                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Are you sure you want to delete {selectedCompany.Name}?</Text>
                                </>
                            )}
                            <Flex flexDirection="row-reverse">
                                <CustomButton bg="#ffffff" ml="4" onClick={() => {
                                    setIsFormOpen(false);
                                    setIsDeleteButtonClicked(false);
                                }}>Cancel
                                </CustomButton>
                                <CustomButton bg="#ff0000" onClick={handleDeleteCompany}>Delete</CustomButton>
                            </Flex>
                        </ModalBody>
                    </ModalContent>
                )}
            </Modal>
        </Flex>
    );
};

export default Companies;
