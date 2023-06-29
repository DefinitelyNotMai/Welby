import { Box, Flex, Heading, Text, Textarea } from "@chakra-ui/react";

type Step2Data = {
    Work: string;
    Connect: string;
    Support: string;
}

type Step2Props = Step2Data & {
    updateFields: (fields: Partial<Step2Data>) => void
}

const Step2 = ({ Work, Connect, Support, updateFields }: Step2Props) => {
    return (
        <>
            <Flex
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                color="#ffffff"
                fontFamily="Montserrat"
                mb="10"
            >
                <Heading fontFamily="Montserrat" fontWeight="700" mb="5">Let your colleagues know how you can thrive</Heading>
                <Text fontSize="lg" fontWeight="700">"It is only in your thriving that you have anything to offer anyone."</Text>
                <Text fontSize="sm" fontWeight="400">- Esther Hicks</Text>
            </Flex>
            <Box mb="5" fontFamily="Montserrat" fontWeight="500">
                <Text color="#ffffff">How do I work?</Text>
                <Textarea
                    bg="#ffffff"
                    border="none"
                    placeholder="Type here..."
                    value={Work}
                    onChange={e => updateFields({ Work: e.target.value })}
                />
            </Box>
            <Box mb="5" fontFamily="Montserrat" fontWeight="500">
                <Text color="#ffffff">How do I connect and learn?</Text>
                <Textarea
                    bg="#ffffff"
                    border="none"
                    placeholder="Type here..."
                    value={Connect}
                    onChange={e => updateFields({ Connect: e.target.value })}
                />
            </Box>
            <Box mb="20" fontFamily="Montserrat" fontWeight="500">
                <Text color="#ffffff">What I need support in?</Text>
                <Textarea
                    bg="#ffffff"
                    border="none"
                    placeholder="Type here..."
                    value={Support}
                    onChange={e => updateFields({ Support: e.target.value })}
                />
            </Box>
        </>
    );
};

export default Step2;
