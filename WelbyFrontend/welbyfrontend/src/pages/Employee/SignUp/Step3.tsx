import { Box, Flex, Heading, Select, Text } from "@chakra-ui/react";
import StrengthSelect from "../../../components/Main/StrengthSelection";

type Step3Data = {
    RealizedStrength1: string;
    RealizedStrength2: string;
    RealizedStrength3: string;
    UnrealizedStrength1: string;
    UnrealizedStrength2: string;
    UnrealizedStrength3: string;
    LearnedBehavior1: string;
    LearnedBehavior2: string;
    Weakness: string;
}

type Step3Props = Step3Data & {
    updateFields: (fields: Partial<Step3Data>) => void
}

const Step3 = ({
    RealizedStrength1,
    RealizedStrength2,
    RealizedStrength3,
    UnrealizedStrength1,
    UnrealizedStrength2,
    UnrealizedStrength3,
    LearnedBehavior1,
    LearnedBehavior2,
    Weakness,
    updateFields
}: Step3Props) => {

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
                <Text fontSize="lg" fontWeight="700">Input your results from the Strengths Profile</Text>
            </Box>
            <Box mb="5" fontFamily="Montserrat" fontWeight="500">
                <Text color="#ffffff">Top 3 Realized Strengths</Text>
                <Flex justifyContent="space-between">
                    <StrengthSelect
                        value={RealizedStrength1}
                        onChange={e => updateFields({ RealizedStrength1: e.target.value })}
                        width="30%"
                    />
                    <StrengthSelect
                        value={RealizedStrength2}
                        onChange={e => updateFields({ RealizedStrength2: e.target.value })}
                        width="30%"
                    />
                    <StrengthSelect
                        value={RealizedStrength3}
                        onChange={e => updateFields({ RealizedStrength3: e.target.value })}
                        width="30%"
                    />
                </Flex>
            </Box>
            <Box mb="5" fontFamily="Montserrat" fontWeight="500">
                <Text color="#ffffff">Top 3 Unrealized Strengths</Text>
                <Flex justifyContent="space-between">
                    <StrengthSelect
                        value={UnrealizedStrength1}
                        onChange={e => updateFields({ UnrealizedStrength1: e.target.value })}
                        width="30%"
                    />
                    <StrengthSelect
                        value={UnrealizedStrength2}
                        onChange={e => updateFields({ UnrealizedStrength2: e.target.value })}
                        width="30%"
                    />
                    <StrengthSelect
                        value={UnrealizedStrength3}
                        onChange={e => updateFields({ UnrealizedStrength3: e.target.value })}
                        width="30%"
                    />
                </Flex>
            </Box>
            <Box mb="5" fontFamily="Montserrat" fontWeight="500">
                <Text color="#ffffff">Top 2 Learned Behaviors</Text>
                <Flex flexDirection="row" flexFlow="flex-start">
                    <StrengthSelect
                        value={LearnedBehavior1}
                        onChange={e => updateFields({ LearnedBehavior1: e.target.value })}
                        width="30%"
                        mr="10"
                    />
                    <StrengthSelect
                        value={LearnedBehavior2}
                        onChange={e => updateFields({ LearnedBehavior2: e.target.value })}
                        width="30%"
                    />
                </Flex>
            </Box>
            <Box mb="20" fontFamily="Montserrat" fontWeight="500">
                <Text color="#ffffff">Top 1 Weaknesses</Text>
                <StrengthSelect
                    value={Weakness}
                    onChange={e => updateFields({ Weakness: e.target.value })}
                    width="30%"
                />
            </Box>
        </>
    );
};

export default Step3;
