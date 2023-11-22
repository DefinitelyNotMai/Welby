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
import { FaRegThumbsDown } from "react-icons/fa";

type Step4Data = {
  NegativeEmotions: {
    int: number;
    value: string;
  };
};

type Step4Props = Step4Data & {
  updateFields: (fields: Partial<Step4Data>) => void;
};

export const Step4 = ({ NegativeEmotions, updateFields }: Step4Props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSliderChange = (value: number) => {
    const updatedValue = value <= 2 ? "Low" : "High";
    updateFields({ NegativeEmotions: { int: value, value: updatedValue } });
  };

  return (
    <>
      <Heading color="#000000" fontSize="1.25rem" textAlign="center">
        Negative Emotions
      </Heading>
      <Flex justifyContent="space-between">
        <Spacer />
        <HStack gap={4} width="55%">
          <Icon as={FaRegThumbsDown} boxSize={16} color="#24a2f0" />
          <Heading as="h2" color="#5a5a5a" fontSize="1rem">
            your ability to perform work with strength and vitality
          </Heading>
        </HStack>
        <Spacer />
      </Flex>
      <Slider
        defaultValue={NegativeEmotions.int}
        max={5}
        min={1}
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
          label={NegativeEmotions.int}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
      <Flex flexDirection="row" gap={4}>
        <Flex
          bgGradient="linear(to-r, #d7ede2, #8ab1b9)"
          flex={1}
          paddingX={16}
          paddingY={8}
          justifyContent="center"
        >
          <Text variant="slider-label">Low</Text>
        </Flex>
        <Flex
          bgGradient="linear(to-r, #306c8a, #014871)"
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
