import { Box, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

type AnswerSelectProps = {
    onClick: (value: number) => void;
    value?: number;
};

const AnswerSelect = ({ onClick, value }: AnswerSelectProps) => {
    const [selectedValue, setSelectedValue] = useState(value);

    const handleBoxClick = (newValue: number) => {
        setSelectedValue(newValue);
        onClick(newValue);
    };

    return (
        <>
            <Text>Not at all true</Text>
            {[1, 2, 3, 4, 5, 6, 7].map((val) => (
                <Box
                    key={val}
                    borderRadius="50% 50% 50% 50%"
                    bg="#fffef1"
                    boxShadow="2xl"
                    cursor="pointer"
                    py="4"
                    px="6"
                    onClick={() => handleBoxClick(val)}
                >
                    {selectedValue === val && <FaCheck color="#24a2f0" size={16} />}
                </Box>
            ))}
            <Text>Very True</Text>
        </>
    );
};

export default AnswerSelect;
