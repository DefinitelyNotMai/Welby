import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import InterestCheckbox from "../../../components/Main/InterestCheckbox";

type Step4Data = {
    Interests: string[];
}

type Step4Props = Step4Data & {
    updateFields: (fields: Partial<Step4Data>) => void
}

const Step4 = ({ Interests, updateFields }: Step4Props) => {
    return (
        <>
            <Flex
                flexDirection="column"
                alignItems="center"
                color="#ffffff"
                fontFamily="Montserrat"
                mb="10"
            >
                <Heading fontFamily="Montserrat" fontWeight="700" mb="5">Share your strengths to the team.</Heading>
                <Text fontSize="lg" fontWeight="700">"Play with your strengths"</Text>
                <Text fontSize="sm" fontWeight="400">- Jennifer Lopez</Text>
            </Flex>
            <Box color="#ffffff" fontFamily="Montserrat" mb="10">
                <Text fontSize="lg" fontWeight="400">Choose all that apply</Text>
            </Box>
            <Box bg="#ffffff" borderRadius="xl" fontFamily="Montserrat" fontWeight="400" mb="10">
                <InterestCheckbox
                    value={Interests}
                    onChange={(values) => updateFields({ Interests: values })}
                />
            </Box>
        </>
    );
};

export default Step4;
