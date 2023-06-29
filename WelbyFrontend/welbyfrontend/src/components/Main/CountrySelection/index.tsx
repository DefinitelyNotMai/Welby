import { useEffect, useState, ChangeEvent } from 'react';
import { Select } from '@chakra-ui/react';
import axios from 'axios';

interface Country {
    id: number;
    name: string;
}

const CountrySelect = (): JSX.Element => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<number | ''>('');

    useEffect(() => {
        fetchCountries();
    }, []);

    // get the countries
    const fetchCountries = async () => {
        try {
            const response = await axios.get<Country[]>('try');
            setCountries(response.data);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(Number(event.target.value));
    };

    return (
        <Select value={selectedCountry} onChange={handleCountryChange}>
            {countries.map((country) => (
                <option key={country.id} value={country.id}>
                    {country.name}
                </option>
            ))}
        </Select>
    );
};

export default CountrySelect;