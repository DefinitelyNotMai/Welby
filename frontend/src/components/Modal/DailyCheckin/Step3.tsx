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
import { FaRegThumbsUp } from "react-icons/fa";

type Step3Data = {
  PositiveEmotions: {
    int: number;
    value: string;
  };
};

type Step3Props = Step3Data & {
  updateFields: (fields: Partial<Step3Data>) => void;
};

export const Step3 = ({ PositiveEmotions, updateFields }: Step3Props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSliderChange = (value: number) => {
    const updatedValue = value <= 2 ? "Low" : "High";
    updateFields({ PositiveEmotions: { int: value, value: updatedValue } });
  };

  return (
    <>
      <Heading color="#000000" fontSize="1.25rem" textAlign="center">
        Positive Emotions
      </Heading>
      <Flex justifyContent="space-between">
        <Spacer />
        <HStack gap={4} width="55%">
          <Icon as={FaRegThumbsUp} boxSize={16} color="#24a2f0" />
          <Heading as="h2" color="#5a5a5a" fontSize="1rem">
            your ability to perform work with strength and vitality
          </Heading>
        </HStack>
        <Spacer />
      </Flex>
      <Slider
        defaultValue={PositiveEmotions.int}
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
          label={PositiveEmotions.int}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
      <Flex flexDirection="row" gap={4}>
        <Flex
          bgGradient="linear(to-r, #cdddbf, #84c18c)"
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
          bgGradient="linear(to-r, #4d9b57, #26682f)"
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
