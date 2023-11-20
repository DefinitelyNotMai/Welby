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
import { TbTargetArrow } from "react-icons/tb";

type Step2Data = {
  FocusAtWork: {
    int: number;
    value: string;
  };
};

type Step2Props = Step2Data & {
  updateFields: (fields: Partial<Step2Data>) => void;
};

export const Step2 = ({ FocusAtWork, updateFields }: Step2Props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSliderChange = (value: number) => {
    const updatedValue = value <= 2 ? "Low" : "High";
    updateFields({ FocusAtWork: { int: value, value: updatedValue } });
  };

  return (
    <>
      <Heading color="#000000" fontSize="1.25rem" textAlign="center">
        Focus At Work
      </Heading>
      <Flex justifyContent="space-between">
        <Spacer />
        <HStack gap={4} width="55%">
          <Icon as={TbTargetArrow} boxSize={16} color="#24a2f0" />
          <Heading as="h2" color="#5a5a5a" fontSize="1rem">
            your ability to perform work with strength and vitality
          </Heading>
        </HStack>
        <Spacer />
      </Flex>
      <Slider
        defaultValue={FocusAtWork.int}
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
          label={FocusAtWork.int}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
      <Flex flexDirection="row" gap={4}>
        <Flex
          bgGradient="linear(to-r, #faf1bb, #f3da4e)"
          flex={1}
          paddingX={16}
          paddingY={8}
          justifyContent="center"
        >
          <Text color="#000000" variant="slider-label">
            Low
          </Text>
        </Flex>
        <Flex
          bgGradient="linear(to-r, #f0d124, #f08d24)"
          flex={1}
          paddingX={16}
          paddingY={8}
          justifyContent="center"
        >
          <Text color="#000000" variant="slider-label">
            High
          </Text>
        </Flex>
      </Flex>
    </>
  );
};
