import { Flex } from "@chakra-ui/react";
import { FaRegThumbsDown } from "react-icons/fa";
import CustomSlider from "../../Form/CustomSlider";
import ItemInfo from "./ItemInfo";
import SliderIndicator from "./SliderIndicator";

type Step4Data = {
  NegativeEmotions: number;
};

type Step4Props = Step4Data & {
  updateFields: (fields: Partial<Step4Data>) => void;
};

const Step4 = ({ NegativeEmotions, updateFields }: Step4Props) => {
  return (
    <>
      <ItemInfo
        description="your ability to perform work with strength and vitality"
        icon={FaRegThumbsDown}
      >
        Negative Emotions
      </ItemInfo>
      <CustomSlider
        defaultValue={NegativeEmotions}
        onChange={(value) => updateFields({ NegativeEmotions: value })}
      />
      <Flex flexDirection="row" fontSize="lg" fontWeight="bold">
        <SliderIndicator bgGradient="linear(to-r, #d7ede2, #8ab1b9)">
          Low
        </SliderIndicator>
        <SliderIndicator bgGradient="linear(to-r, #8ab1b9, #306c8a)">
          Average
        </SliderIndicator>
        <SliderIndicator bgGradient="linear(to-r, #306c8a, #014871)">
          High
        </SliderIndicator>
      </Flex>
    </>
  );
};

export default Step4;
