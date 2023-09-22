import { Card, Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type QuestionItemProps = {
    children: ReactNode;
    mb?: string;
    question: string;
};

const QuestionItem = ({ children, mb, question }: QuestionItemProps) => {
    return (
        <Card
            bg="#24a2f0"
            border="5px solid #a1d8dc"
            borderRadius="0.75rem"
            p="4"
            mb={mb}
        >
            <Text
                color="#ffffff"
                fontFamily="Montserrat"
                fontWeight="600"
                fontSize="18"
                mb="4"
            >
                {question}
            </Text>
            <Flex
                flexDirection="row"
                alignItems="center"
                color="#ffffff"
                fontFamily="Montserrat"
                fontWeight="400"
                fontSize="14"
                justifyContent="space-between"
            >
                {children}
            </Flex>
        </Card>
    );
};

export default QuestionItem;
