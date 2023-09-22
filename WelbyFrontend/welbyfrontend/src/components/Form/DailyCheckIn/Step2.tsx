import { Box, Flex, HStack, Icon, Spacer, Text } from '@chakra-ui/react';
import { TbTargetArrow } from 'react-icons/tb';
import CustomSlider from '../Slider';

type Step2Data = {
    FocusAtWork: number;
};

type Step2Props = Step2Data & {
    updateFields: (fields: Partial<Step2Data>) => void;
};

const Step2 = ({ FocusAtWork, updateFields }: Step2Props) => {
    return (
        <>
            <Text
                fontFamily="Montserrat"
                fontWeight="700"
                fontSize="20"
                textAlign="center"
            >
                Focus At Work
            </Text>
            <Flex justifyContent="space-between">
                <Spacer />
                <HStack spacing="2" width="50%">
                    <Icon as={TbTargetArrow} boxSize={16} color="#24a2f0" />
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
                defaultValue={FocusAtWork}
                onChange={(value) => updateFields({ FocusAtWork: value })}
            />
            <Flex
                justifyContent="space-between"
                color="#ffffff"
                fontFamily="Montserrat"
                fontWeight="700"
            >
                <Box
                    bgGradient="linear(to-r, #faf1bb, #f3da4e)"
                    textAlign="center"
                    py="8"
                    px="16"
                >
                    Low
                </Box>
                <Box
                    bgGradient="linear(to-r, #f3da4e, #f0d124)"
                    textAlign="center"
                    py="8"
                    px="16"
                >
                    Average
                </Box>
                <Box
                    bgGradient="linear(to-r, #f0d124, #f08d24)"
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

export default Step2;
