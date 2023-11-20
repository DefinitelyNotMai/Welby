import {
  Flex,
  HStack,
  Heading,
  Icon,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spacer,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsPerson } from "react-icons/bs";

type Step1Data = {
  EnergyAtWork: {
    int: number;
    value: string;
  };
};

type Step1Props = Step1Data & {
  updateFields: (fields: Partial<Step1Data>) => void;
};

export const Step1 = ({ EnergyAtWork, updateFields }: Step1Props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSliderChange = (value: number) => {
    const updatedValue = value <= 2 ? "Low" : "High";
    updateFields({ EnergyAtWork: { int: value, value: updatedValue } });
  };

  return (
    <>
      <Heading color="#000000" fontSize="1.25rem" textAlign="center">
        Energy At Work
      </Heading>
      <Flex justifyContent="space-between">
        <Spacer />
        <HStack gap={4} width="55%">
          <Icon as={BsPerson} boxSize={16} color="#24a2f0" />
          <Heading as="h2" color="#5a5a5a" fontSize="1rem">
            your ability to perform work with strength and vitality
          </Heading>
        </HStack>
        <Spacer />
      </Flex>
      <Slider
        defaultValue={EnergyAtWork.int}
        max={5}
        min={0}
        step={1}
        onChange={handleSliderChange}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          backgroundColor="#24a2f0"
          color="#ffffff"
          hasArrow
          placement="top"
          isOpen={showTooltip}
          label={EnergyAtWork.int}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
      <Flex flexDirection="row" gap={4}>
        <Flex
          bgGradient="linear(to-r, #78c6f6, #24a2f0)"
          flex={1}
          paddingX={16}
          paddingY={8}
          justifyContent="center"
        >
          <Text variant="slider-label">Low</Text>
        </Flex>
        <Flex
          bgGradient="linear(to-r, #1d81c0, #125178)"
          flex={1}
          paddingX={16}
          paddingY={8}
          justifyContent="center"
        >
          <Text variant="slider-label">High</Text>
        </Flex>
      </Flex>
    </>
  );
};
