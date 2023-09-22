import { Box, Flex, HStack, Icon, Spacer, Text } from '@chakra-ui/react';
import { FaRegThumbsUp } from 'react-icons/fa';
import CustomSlider from '../Slider';

type Step3Data = {
    PositiveEmotions: number;
};

type Step3Props = Step3Data & {
    updateFields: (fields: Partial<Step3Data>) => void;
};

const Step3 = ({ PositiveEmotions, updateFields }: Step3Props) => {
    return (
        <>
            <Text
                fontFamily="Montserrat"
                fontWeight="700"
                fontSize="20"
                textAlign="center"
            >
                Positive Emotions
            </Text>
            <Flex justifyContent="space-between">
                <Spacer />
                <HStack spacing="2" width="50%">
                    <Icon as={FaRegThumbsUp} boxSize={16} color="#24a2f0" />
                    <Text
                        color="#5a5a5a"
                        textAlign="center"
                        fontFamily="Montserrat"
                        fontWeight="400"
                        fontSize="16"
                        noOfLines={2}
                    >
                        your ability to perform work with strength and vitality
                    </Text>
                </HStack>
                <Spacer />
            </Flex>
            <CustomSlider
                defaultValue={PositiveEmotions}
                onChange={(value) => updateFields({ PositiveEmotions: value })}
            />
            <Flex
                justifyContent="space-between"
                color="#ffffff"
                fontFamily="Montserrat"
                fontWeight="700"
            >
                <Box
                    bgGradient="linear(to-r, #cdddbf, #84c18c)"
                    textAlign="center"
                    py="8"
                    px="16"
                >
                    Low
                </Box>
                <Box
                    bgGradient="linear(to-r, #84c18c, #4d9b57)"
                    textAlign="center"
                    py="8"
                    px="16"
                >
                    Average
                </Box>
                <Box
                    bgGradient="linear(to-r, #4d9b57, #26682f)"
                    textAlign="center"
                    py="8"
                    px="16"
                >
                    High
                </Box>
            </Flex>
        </>
    );
};

export default Step3;
