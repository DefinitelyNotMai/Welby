import { Box, Flex, HStack, Icon, Spacer, Text } from '@chakra-ui/react';
import { BsPerson } from 'react-icons/bs';
import CustomSlider from '../Slider';

type Step1Data = {
    EnergyAtWork: number;
};

type Step1Props = Step1Data & {
    updateFields: (fields: Partial<Step1Data>) => void;
};

const Step1 = ({ EnergyAtWork, updateFields }: Step1Props) => {
    return (
        <>
            <Text
                fontFamily="Montserrat"
                fontWeight="700"
                fontSize="20"
                textAlign="center"
            >
                Energy At Work
            </Text>
            <Flex justifyContent="space-between">
                <Spacer />
                <HStack spacing="2" width="50%">
                    <Icon as={BsPerson} boxSize={16} color="#24a2f0" />
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
                defaultValue={EnergyAtWork}
                onChange={(value) => updateFields({ EnergyAtWork: value })}
            />

            <Flex
                justifyContent="space-between"
                color="#ffffff"
                fontFamily="Montserrat"
                fontWeight="700"
            >
                <Box
                    bgGradient="linear(to-r, #78c6f6, #24a2f0)"
                    textAlign="center"
                    py="8"
                    px="16"
                >
                    Low
                </Box>
                <Box
                    bgGradient="linear(to-r, #24a2f0, #1d81c0)"
                    textAlign="center"
                    py="8"
                    px="16"
                >
                    Average
                </Box>
                <Box
                    bgGradient="linear(to-r, #1d81c0, #125178)"
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

export default Step1;
