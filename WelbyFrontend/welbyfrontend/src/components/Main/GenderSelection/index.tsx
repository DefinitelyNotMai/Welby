import { useEffect, useState, ChangeEvent } from 'react';
import { Select } from '@chakra-ui/react';
import axios from 'axios';

interface Gender {
    GenderId: number;
    Gender: string;
}


type CompanySelectProps = {
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const GenderSelect = ({ value, onChange }: CompanySelectProps): JSX.Element => {
    const [genders, setGenders] = useState<Gender[]>([]);
    const [selectedGender, setSelectedGender] = useState<Gender | undefined>(undefined);

    useEffect(() => {
        const fetchGenders = async () => {
            try {
                var genderUrl = 'https://localhost:44373/api/GetGender';
                var gender = null;
                let param = { "Active": 1 };

                axios.get(genderUrl, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    params: param
                }).then(response => {
                    gender = response.data;
                    setGenders(gender);
                })
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchGenders();
    }, []);


    const handleGenderChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selected = genders.find((gender) => gender.Gender === event.target.value)
        console.log(selected)
        setSelectedGender(selected);
    };


    return (
        <Select
            placeholder="Choose your gender"
            bg="#ffffff"
            fontFamily="Montserrat"
            fontWeight="500"
            color="#000000"
            mb="5"
            onChange={onChange}
            value={value}
        >
            {genders.map((gender) => (
                <option key={gender.GenderId} value={gender.GenderId}>
                    {gender.Gender}
                </option>
            ))}
        </Select>
    );
};

export default GenderSelect;