import { CheckboxGroup, Checkbox, VStack, SimpleGrid } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Interests {
    InterestId: number;
    Name: string;
}

type InterestCheckboxProps = {
    value: string[];
    onChange?: (event: string[]) => void;
}

const InterestCheckbox = ({ value, onChange }: InterestCheckboxProps) => {
    const [interests, setInterests] = useState<Interests[]>([]);

    useEffect(() => {
        const fetchInterests = async () => {
            try {
                var interestsUrl = 'https://localhost:44373/api/GetAllInterest';
                var interest = null;
                let param = { "Active": 1 };

                axios.get(interestsUrl, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    params: param
                }).then(response => {
                    interest = response.data;
                    setInterests(interest);
                })
            } catch (error) {
                console.error('Error fetching interests:', error);
            }
        };

        fetchInterests();
    }, []);

    return (
        <CheckboxGroup colorScheme="blue" value={value} onChange={onChange}>
            <SimpleGrid columns={2} spacing={4} padding="4">
                {interests.map((interest) => (
                    <Checkbox key={interest.InterestId} value={interest.InterestId}>
                        {interest.Name}
                    </Checkbox>
                ))}
            </SimpleGrid>
        </CheckboxGroup>
    );
};

export default InterestCheckbox;