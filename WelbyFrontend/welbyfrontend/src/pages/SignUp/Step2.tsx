import { Flex, Heading, Text, Textarea } from '@chakra-ui/react';

type Step2Data = {
    Vision: string;
    Mission: string;
};

type Step2Props = Step2Data & {
    updateFields: (fields: Partial<Step2Data>) => void;
};

const Step2 = ({ Vision, Mission, updateFields }: Step2Props) => {
    return (
        <>
            <Flex flexDirection="column" p="8">
                <Heading
                    as="h1"
                    textAlign="center"
                    fontFamily="Montserrat"
                    fontWeight="700"
                    fontSize="2xl"
                    mb="12"
                    color="#ffffff"
                >
                    Let your workforce know more about your company.
                    <Text align="center" fontSize="md" fontWeight="bold">
                        "A well-aligned workplace culture can improve productivity by 25%"
                    </Text>
                    <Text align="center" fontSize="sm" fontWeight="normal">
                        - LSA Global
                    </Text>
                </Heading>
                <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                    VISION
                </Text>
                <Textarea
                    bg="#ffffff"
                    fontFamily="Montserrat"
                    fontWeight="500"
                    h="10rem"
                    mb="5"
                    placeholder="Type here"
                    resize="none"
                    value={Vision}
                    onChange={(e) => updateFields({ Vision: e.target.value })}
                />
                <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">
                    MISSION
                </Text>
                <Textarea
                    bg="#ffffff"
                    fontFamily="Montserrat"
                    fontWeight="500"
                    h="10rem"
                    mb="5"
                    placeholder="Type here..."
                    resize="none"
                    value={Mission}
                    onChange={(e) => updateFields({ Mission: e.target.value })}
                />
            </Flex>
        </>
    );
};

export default Step2;
