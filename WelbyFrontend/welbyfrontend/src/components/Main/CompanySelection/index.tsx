import { useEffect, useState, ChangeEvent } from 'react';
import { Select } from '@chakra-ui/react';
import axios from 'axios';

// property names need to be the same as column names
interface Company {
    CompanyId: number;
    Name: string;
}


type CompanySelectProps = {
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CompanySelect = ({ value, onChange }: CompanySelectProps): JSX.Element => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<Company | undefined>(undefined);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                var companyUrl = 'https://localhost:44373/api/GetCompanies';
                var company = null;
                let param = { "Active": 1 };

                axios.get(companyUrl, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    params: param
                }).then(response => {
                    company = response.data;
                    setCompanies(company);
                })
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCompanies();
    }, []);

    
    const handleCompanyChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selected = companies.find((company) => company.Name === event.target.value)
        console.log(selected)
        setSelectedCompany(selected);
    };
    

    return (
        <Select
            placeholder="Choose your company"
            bg="#ffffff"
            fontFamily="Montserrat"
            fontWeight="500"
            color="#000000"
            mb="5"
            onChange={onChange}
            value={value}
        >
            {companies.map((company) => (
                <option key={company.CompanyId} value={company.CompanyId}>
                    {company.Name}
                </option>
            ))}
        </Select>
    );
};

export default CompanySelect;