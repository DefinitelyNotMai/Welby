import { useEffect, useState, ChangeEvent } from 'react';
import { Select } from '@chakra-ui/react';
import axios from 'axios';

// property names need to be the same as column names
interface Country {
    CountryId: number;
    Name: string;
}

type CountrySelectProps = {
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CountrySelect = ({ value, onChange }: CountrySelectProps): JSX.Element => {
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                var countryUrl = 'https://localhost:44373/api/GetAllCountry';
                var country = null;
                let param = { "Active": 1 };

                axios.get(countryUrl, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    params: param
                }).then(response => {
                    country = response.data;
                    setCountries(country);
                })
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    return (
        <Select
            placeholder="Choose your country"
            bg="#ffffff"
            fontFamily="Montserrat"
            fontWeight="500"
            color="#000000"
            mb="5"
            onChange={onChange}
            value={value}
        >
            {countries.map((country) => (
                <option key={country.CountryId} value={country.CountryId}>
                    {country.Name}
                </option>
            ))}
        </Select>
    );
};

export default CountrySelect;
