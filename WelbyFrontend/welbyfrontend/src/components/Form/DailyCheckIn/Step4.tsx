import { Box, Flex, HStack, Icon, Spacer, Text } from '@chakra-ui/react';
import { FaRegThumbsDown } from 'react-icons/fa';
import CustomSlider from '../Slider';

type Step4Data = {
    NegativeEmotions: number;
};

type Step4Props = Step4Data & {
    updateFields: (fields: Partial<Step4Data>) => void;
};

const Step4 = ({ NegativeEmotions, updateFields }: Step4Props) => {
    return (
        <>
            <Text
                fontFamily="Montserrat"
                fontWeight="700"
                fontSize="20"
                textAlign="center"
            >
                Negative Emotions
            </Text>
            <Flex justifyContent="space-between">
                <Spacer />
                <HStack spacing="2" width="50%">
                    <Icon as={FaRegThumbsDown} boxSize={16} color="#24a2f0" />
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
                defaultValue={NegativeEmotions}
                onChange={(value) => updateFields({ NegativeEmotions: value })}
            />
            <Flex
                justifyContent="space-between"
                color="#ffffff"
                fontFamily="Montserrat"
                fontWeight="700"
            >
                <Box
                    bgGradient="linear(to-r, #d7ede2, #8ab1b9)"
                    textAlign="center"
                    py="8"
                    px="16"
                >
                    Low
                </Box>
                <Box
                    bgGradient="linear(to-r, #8ab1b9, #306c8a)"
                    textAlign="center"
                    py="8"
                    px="16"
                >
                    Average
                </Box>
                <Box
                    bgGradient="linear(to-r, #306c8a, #014871)"
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

export default Step4;
