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

const COMPANY_DATA: Company = {
    CompanyId: '',
    Name: '',
    Email: '',
    Phone_Number: '',
    Website: '',
    Address: '',
    Vision: '',
    Mission: '',
    Logo: '',
    CountryId: '',
    IndustryTypeId: '',
    FoundingDate: '',
}

const Companies = () => {
    document.title = 'Companies | Welby';

    const [companies, setCompanies] = useState<Company[]>([]);
    const [companyData, setCompanyData] = useState<Company>(COMPANY_DATA)
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);
    const [isUpdateButtonClicked, setIsUpdateButtonClicked] = useState(false);
    const [isDeleteButtonClicked, setIsDeleteButtonClicked] = useState(false);
    const itemsPerPage = 10;

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

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
        const company = {
            "Name": companyData.Name,
            "Email": companyData.Email,
            "Phone_Number": companyData.Phone_Number,
            "Website": companyData.Website,
            "Address": companyData.Address,
            "Vision": companyData.Vision,
            "Mission": companyData.Mission,
            "Logo": companyData.Logo,
            "CountryId": companyData.CountryId,
            "IndustryTypeId": companyData.IndustryTypeId,
            "FoundingDate": companyData.FoundingDate,
            "Encoded_By": 24287,
        }

        var addCompanyUrl = 'https://localhost:44373/api/AddCompany'

        axios
            .post(addCompanyUrl, company, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Company added.',
                    description: `${companyData.Name} has been added.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setSelectedCompany(null);
            }).catch((error) => {
                console.log(error)
            });

    };

    const handleUpdateCompany = () => {
        const company = {
            "CompanyId": selectedCompany?.CompanyId,
            "Name": companyData.Name,
            "Email": companyData.Email,
            "Phone_Number": companyData.Phone_Number,
            "Website": companyData.Website,
            "Address": companyData.Address,
            "Vision": companyData.Vision,
            "Mission": companyData.Mission,
            "Logo": companyData.Logo,
            "CountryId": companyData.CountryId,
            "IndustryTypeId": companyData.IndustryTypeId,
            "FoundingDate": companyData.FoundingDate,
            "Active": 1,
            "Encoded_By": 24287

        }

        var updateCompanyUrl = 'https://localhost:44373/api/UpdateCompany'

        axios
            .patch(updateCompanyUrl, company, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Company updated.',
                    description: `Company with CompanyId: ${selectedCompany?.CompanyId} has been updated.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setIsUpdateButtonClicked(false);
                setSelectedCompany(null);
            }).catch((error) => {
                console.log(error)
            });

    };

    const handleDeleteCompany = () => {
        const company = {
            "CompanyId": selectedCompany?.CompanyId,
            "Encoded_By": 24287
        }

        var deleteCompanyUrl = 'https://localhost:44373/api/RemoveCompany'

        axios
            .patch(deleteCompanyUrl, company, config)
            .then((response) => {
                console.log(response.data)
                toast({
                    title: 'Company deleted.',
                    description: `Company with CompanyId:${selectedCompany?.CompanyId} has been deleted.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsFormOpen(false);
                setIsDeleteButtonClicked(false);
                setSelectedCompany(null);
            }).catch((error) => {
                console.log(error)
            });
    };

    const resetCompanyData = () => {
        setCompanyData({
            CompanyId: '',
            Name: '',
            Email: '',
            Phone_Number: '',
            Website: '',
            Address: '',
            Vision: '',
            Mission: '',
            Logo: '',
            CountryId: '',
            IndustryTypeId: '',
            FoundingDate: '',
        });
    };

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
                        setIsAddButtonClicked(false);
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
                onClose={() => {
                    setIsFormOpen(false);
                    resetCompanyData();
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
                            Add Company
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <>
                                <UploadPhoto label="Logo" />
                                <Grid templateColumns="1fr 1fr" gap="4" mt="4">
                                    <Flex flexDirection="column">
                                        <FormItem label="CompanyId" w="25%">
                                            <Textbox
                                                defaultValue={companyData.CompanyId}
                                                isDisabled
                                            />
                                        </FormItem>
                                        <FormItem label="Email">
                                            <Textbox
                                                value={companyData.Email}
                                                onChange={(e) => setCompanyData({ ...companyData, Email: e.target.value })}
                                            />
                                        </FormItem>
                                        <FormItem label="Website">
                                            <Textbox
                                                value={companyData.Website}
                                                onChange={(e) => setCompanyData({ ...companyData, Website: e.target.value })}
                                            />
                                        </FormItem>
                                        <FormItem label="Vision">
                                            <Textbox
                                                value={companyData.Vision}
                                                onChange={(e) => setCompanyData({ ...companyData, Vision: e.target.value })}
                                            />
                                        </FormItem>
                                        <FormItem label="CountryId">
                                            <Textbox
                                                value={companyData.CountryId}
                                                onChange={(e) => setCompanyData({ ...companyData, CountryId: e.target.value })}
                                            />
                                        </FormItem>
                                    </Flex>
                                    <Flex flexDirection="column">
                                        <FormItem label="Name">
                                            <Textbox
                                                value={companyData.Name}
                                                onChange={(e) => setCompanyData({ ...companyData, Name: e.target.value })}
                                            />
                                        </FormItem>
                                        <FormItem label="Phone_Number">
                                            <Textbox
                                                value={companyData.Phone_Number}
                                                onChange={(e) => setCompanyData({ ...companyData, Phone_Number: e.target.value })}
                                            />
                                        </FormItem>
                                        <FormItem label="Address">
                                            <Textbox
                                                value={companyData.Address}
                                                onChange={(e) => setCompanyData({ ...companyData, Address: e.target.value })}
                                            />
                                        </FormItem>
                                        <FormItem label="Mission">
                                            <Textbox
                                                value={companyData.Mission}
                                                onChange={(e) => setCompanyData({ ...companyData, Mission: e.target.value })}
                                            />
                                        </FormItem>
                                        <FormItem label="IndustryTypeId">
                                            <Textbox
                                                value={companyData.IndustryTypeId}
                                                onChange={(e) => setCompanyData({ ...companyData, IndustryTypeId: e.target.value })}
                                            />
                                        </FormItem>
                                    </Flex>
                                </Grid>
                                <Flex alignContent="center">
                                    <FormItem label="FoundingDate">
                                        <Textbox
                                            type="datetime-local"
                                            value={companyData.FoundingDate}
                                            onChange={(e) => setCompanyData({ ...companyData, FoundingDate: e.target.value })}
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
                                <CustomButton bg="#f0d124" onClick={handleAddCompany}>Add</CustomButton>
                            </Flex>
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
                                                <Textbox
                                                    value={selectedCompany.Email}
                                                    onChange={(e) => setCompanyData({ ...companyData, Email: e.target.value })}
                                                />
                                            </FormItem>
                                            <FormItem label="Website">
                                                <Textbox
                                                    value={selectedCompany.Website}
                                                    onChange={(e) => setCompanyData({ ...companyData, Website: e.target.value })}
                                                />
                                            </FormItem>
                                            <FormItem label="Vision">
                                                <Textbox
                                                    value={selectedCompany.Vision}
                                                    onChange={(e) => setCompanyData({ ...companyData, Vision: e.target.value })}
                                                />
                                            </FormItem>
                                            <FormItem label="CountryId">
                                                <Textbox
                                                    value={selectedCompany.CountryId}
                                                    onChange={(e) => setCompanyData({ ...companyData, CountryId: e.target.value })}
                                                />
                                            </FormItem>
                                        </Flex>
                                        <Flex flexDirection="column">
                                            <FormItem label="Name">
                                                <Textbox
                                                    value={selectedCompany.Name}
                                                    onChange={(e) => setCompanyData({ ...companyData, Name: e.target.value })}
                                                />
                                            </FormItem>
                                            <FormItem label="Phone_Number">
                                                <Textbox
                                                    value={selectedCompany.Phone_Number}
                                                    onChange={(e) => setCompanyData({ ...companyData, Phone_Number: e.target.value })}
                                                />
                                            </FormItem>
                                            <FormItem label="Address">
                                                <Textbox
                                                    value={selectedCompany.Address}
                                                    onChange={(e) => setCompanyData({ ...companyData, Address: e.target.value })}
                                                />
                                            </FormItem>
                                            <FormItem label="Mission">
                                                <Textbox
                                                    value={selectedCompany.Mission}
                                                    onChange={(e) => setCompanyData({ ...companyData, Mission: e.target.value })}
                                                />
                                            </FormItem>
                                            <FormItem label="IndustryTypeId">
                                                <Textbox
                                                    value={selectedCompany.IndustryTypeId}
                                                    onChange={(e) => setCompanyData({ ...companyData, IndustryTypeId: e.target.value })}
                                                />
                                            </FormItem>
                                        </Flex>
                                    </Grid>
                                    <Flex alignContent="center">
                                        <FormItem label="FoundingDate">
                                            <Textbox
                                                type="datetime-local"
                                                value={selectedCompany.FoundingDate}
                                                onChange={(e) => setCompanyData({ ...companyData, FoundingDate: e.target.value })}
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
