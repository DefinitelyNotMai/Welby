import { useEffect, useState, ChangeEvent } from 'react';
import { Select } from '@chakra-ui/react';
import axios from 'axios';

// property names need to be the same as column names
interface CompanySize {
    CompanySize: string;
    Name: string;
}

type CompanySizeSelectProps = {
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CompanySizeSelect = ({ value, onChange }: CompanySizeSelectProps): JSX.Element => {
    const [companySizes, setCompanySize] = useState<CompanySize[]>([]);

    useEffect(() => {
        const fetchCompanySizes = async () => {
            try {
                var companySizeUrl = 'https://localhost:44373/api/GetCompanies';
                var companySize = null;
                let param = { "Active": 1 };

                axios.get(companySizeUrl, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    params: param
                }).then(response => {
                    companySize = response.data;
                    setCompanySize(companySize);
                })
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCompanySizes();
    }, []);

    return (
        <Select
            placeholder="Choose your Company Size"
            bg="#ffffff"
            fontFamily="Montserrat"
            fontWeight="500"
            color="#000000"
            mb="5"
            onChange={onChange}
            value={value}
        >
            {companySizes.map((companySize) => (
                <option key={companySize.CompanySize} value={companySize.CompanySize}>
                    {companySize.Name}
                </option>
            ))}
        </Select>
    );
};

export default CompanySizeSelect;
