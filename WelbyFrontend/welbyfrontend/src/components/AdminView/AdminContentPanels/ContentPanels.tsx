import * as chakra from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

interface CompanyData {
    CompanyId: string;
    Name: string;
    Email: string;
    Phone_Number: string;
    Website: string;
    Address: string;
    CompanyLocation: string;
    FoundingDate: string;
    CompanySize: string;
    IndustryTypeDisplay: string;
    Active: string;
    Encoded_By: string;
    Encoded_Date: string;
    LastChanged_By: string;
    LastChanged_Date: string;

}

export function CompanyMasterPanel() {
    const [companies, setCompanies] = useState<CompanyData[]>([]);

    useEffect(() => {
        // Fetch data from your API or database
        fetch('https://localhost:44373/api/GetCompany')
            .then(response => response.json())
            .then(data => setCompanies(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    

    return (     
        <chakra.Flex>
            <chakra.Box>
            </chakra.Box>
            <chakra.TableContainer>
                <chakra.Table>
                    <chakra.Thead>
                        <chakra.Tr>
                            <chakra.Th>
                                Id
                            </chakra.Th>
                            <chakra.Th>
                                Name
                            </chakra.Th>
                            <chakra.Th>
                                Email
                            </chakra.Th>
                            <chakra.Th>
                                Phone Number
                            </chakra.Th>
                            <chakra.Th>
                                Website
                            </chakra.Th>
                            <chakra.Th>
                                Address
                            </chakra.Th>
                            <chakra.Th>
                                Country
                            </chakra.Th>
                            <chakra.Th>
                                Founding Date
                            </chakra.Th>
                            <chakra.Th>
                                Company Size
                            </chakra.Th>
                            <chakra.Th>
                                Industry Type
                            </chakra.Th>
                            <chakra.Th>
                                Active
                            </chakra.Th>
                                Encoded By
                            <chakra.Th>
                                Encoded Date
                            </chakra.Th>
                            <chakra.Th>
                                Last Changed By
                            </chakra.Th>
                            <chakra.Th>
                                Last Changed Date
                            </chakra.Th>
                        </chakra.Tr>
                    </chakra.Thead>
                    <chakra.Tbody>
                        {companies.map(company => (
                            <chakra.Tr key={company.CompanyId}>
                                <chakra.Td>{company.CompanyId}</chakra.Td>
                                <chakra.Td>{company.Name}</chakra.Td>
                                <chakra.Td>{company.Email}</chakra.Td>
                                <chakra.Td>{company.Phone_Number}</chakra.Td>
                                <chakra.Td>{company.Website}</chakra.Td>
                                <chakra.Td>{company.Address}</chakra.Td>
                                <chakra.Td>{company.CompanyLocation}</chakra.Td>
                                <chakra.Td>{company.FoundingDate}</chakra.Td>
                                <chakra.Td>{company.CompanySize}</chakra.Td>
                                <chakra.Td>{company.IndustryTypeDisplay}</chakra.Td>
                                <chakra.Td>{company.Active}</chakra.Td>
                                <chakra.Td>{company.Encoded_Date}</chakra.Td>
                                <chakra.Td>{company.LastChanged_By}</chakra.Td>
                                <chakra.Td>{company.LastChanged_Date}</chakra.Td>
                            </chakra.Tr>
                        ))}
                    </chakra.Tbody>
                </chakra.Table>
            </chakra.TableContainer>
        </chakra.Flex>
    );
}

interface IndustryTypeData {
    IndustryTypeId: string;
    Industry_Name: string;
    Active: string;
    Encoded_By: string;
    Encoded_Date: string;
    LastChanged_By: string;
    LastChanged_Date: string;
}

export function IndustryTypePanel() {
    const [industryTypes, setIndustryTypes] = useState<IndustryTypeData[]>([]);

    useEffect(() => {
        // Fetch data from your API or database
        fetch('https://localhost:44373/api/GetIndustryTypes')
            .then(response => response.json())
            .then(data => setIndustryTypes(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <chakra.Flex>
            <chakra.Box>
            </chakra.Box>
            <chakra.TableContainer>
                <chakra.Table>
                    <chakra.Thead>
                        <chakra.Tr>
                            <chakra.Th>
                                Id
                            </chakra.Th>
                            <chakra.Th>
                                Industry Name
                            </chakra.Th>
                            <chakra.Th>
                                Active
                            </chakra.Th>
                            Encoded By
                            <chakra.Th>
                                Encoded Date
                            </chakra.Th>
                            <chakra.Th>
                                Last Changed By
                            </chakra.Th>
                            <chakra.Th>
                                Last Changed Date
                            </chakra.Th>
                        </chakra.Tr>
                    </chakra.Thead>
                    <chakra.Tbody>
                        {industryTypes.map(industryType => (
                            <chakra.Tr key={industryType.IndustryTypeId}>
                                <chakra.Td>{industryType.IndustryTypeId}</chakra.Td>
                                <chakra.Td>{industryType.Industry_Name}</chakra.Td>
                                <chakra.Td>{industryType.Active}</chakra.Td>
                                <chakra.Td>{industryType.Encoded_Date}</chakra.Td>
                                <chakra.Td>{industryType.LastChanged_By}</chakra.Td>
                                <chakra.Td>{industryType.LastChanged_Date}</chakra.Td>
                            </chakra.Tr>
                        ))}
                    </chakra.Tbody>
                </chakra.Table>
            </chakra.TableContainer>
        </chakra.Flex>
    );
}

export function LeftPanel() {

}

export function RightPanel() {

}