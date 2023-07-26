import { useEffect, useState, ChangeEvent } from 'react';
import { Select } from '@chakra-ui/react';
import axios from 'axios';

interface IndustryTypes {
    IndustryTypeId: number;
    Industry_Name: string;
}

type IndustryTypeSelectProps = {
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    width?: string;
}

const IndustryTypeSelect = ({ value, onChange, width }: IndustryTypeSelectProps): JSX.Element => {
    const [industryTypes, setIndustryTypes] = useState<IndustryTypes[]>([]);
    const [selectedIndustryType, setSelectedIndustryType] = useState<IndustryTypes | undefined>(undefined);

    useEffect(() => {
        const fetchIndustryTypes = async () => {
            try {
                var industryTypeUrl = 'https://localhost:44373/api/GetIndustryTypes';
                var industryType = null;
                let param = { "Active": 1 };

                axios.get(industryTypeUrl, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    params: param
                }).then(response => {
                    industryType = response.data;
                    setIndustryTypes(industryType);
                })
            } catch (error) {
                console.error('Error fetching strengths:', error);
            }
        };

        fetchIndustryTypes();
    }, []);

    const handleIndustryTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selected = industryTypes.find((industryType) => industryType.Industry_Name === event.target.value)
        console.log(selected)
        setSelectedIndustryType(selected);
    };

    return (
        <Select
            placeholder="Select Industry Type"
            bg="#ffffff"
            fontFamily="Montserrat"
            fontWeight="500"
            color="#000000"
            mb="5"
            onChange={onChange}
            value={value}
            width={width}
        >
            {industryTypes.map((industryType) => (
                <option key={industryType.IndustryTypeId} value={industryType.IndustryTypeId}>
                    {industryType.Industry_Name}
                </option>
            ))}
        </Select>
    );
};

export default IndustryTypeSelect;
