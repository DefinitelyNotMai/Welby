import { Flex } from "@chakra-ui/react";
import { FaRegThumbsUp } from "react-icons/fa";
import CustomSlider from "../../Form/CustomSlider";
import ItemInfo from "./ItemInfo";
import SliderIndicator from "./SliderIndicator";

type Step3Data = {
  PositiveEmotions: number;
};

type Step3Props = Step3Data & {
  updateFields: (fields: Partial<Step3Data>) => void;
};

const Step3 = ({ PositiveEmotions, updateFields }: Step3Props) => {
  return (
    <>
      <ItemInfo
        description="your ability to perform work with strength and vitality"
        icon={FaRegThumbsUp}
      >
        Energy At Work
      </ItemInfo>
      <CustomSlider
        defaultValue={PositiveEmotions}
        onChange={(value) => updateFields({ PositiveEmotions: value })}
      />
      <Flex flexDirection="row" fontSize="lg" fontWeight="bold">
        <SliderIndicator bgGradient="linear(to-r, #cdddbf, #84c18c)">
          Low
        </SliderIndicator>
        <SliderIndicator bgGradient="linear(to-r, #84c18c, #4d9b57)">
          Average
        </SliderIndicator>
        <SliderIndicator bgGradient="linear(to-r, #4d9b57, #26682f)">
          High
        </SliderIndicator>
      </Flex>
    </>
  );
};

export default Step3;
