import { useEffect, useState, ChangeEvent } from 'react';
import { Select } from '@chakra-ui/react';
import axios from 'axios';

// property names need to be the same as column names
interface Strengths {
    StrengthId: number;
    Strength: string;
}


type StrengthSelectProps = {
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    width?: string;
    mr?: string;
}

const StrengthSelect = ({ value, onChange, width, mr }: StrengthSelectProps): JSX.Element => {
    const [strengths, setStrengths] = useState<Strengths[]>([]);
    const [selectedStrength, setSelectedStrength] = useState<Strengths | undefined>(undefined);

    useEffect(() => {
        const fetchStrengths = async () => {
            try {
                var strengthUrl = 'https://localhost:44373/api/GetStrength';
                var strength = null;
                let param = { "Active": 1 };

                axios.get(strengthUrl, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    params: param
                }).then(response => {
                    strength = response.data;
                    setStrengths(strength);
                })
            } catch (error) {
                console.error('Error fetching strengths:', error);
            }
        };

        fetchStrengths();
    }, []);

    
    const handleStrengthChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selected = strengths.find((strength) => strength.Strength === event.target.value)
        console.log(selected)
        setSelectedStrength(selected);
    };
    

    return (
        <Select
            placeholder="Choose here..."
            bg="#ffffff"
            fontFamily="Montserrat"
            fontWeight="500"
            color="#000000"
            mb="5"
            mr={mr}
            onChange={onChange}
            value={value}
            width={width}
        >
            {strengths.map((strength) => (
                <option key={strength.StrengthId} value={strength.StrengthId}>
                    {strength.Strength}
                </option>
            ))}
        </Select>
    );
};

export default StrengthSelect;
