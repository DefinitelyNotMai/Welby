import { Flex } from "@chakra-ui/react";
import { TbTargetArrow } from "react-icons/tb";
import CustomSlider from "../../Form/CustomSlider";
import ItemInfo from "./ItemInfo";
import SliderIndicator from "./SliderIndicator";

type Step2Data = {
  FocusAtWork: number;
};

type Step2Props = Step2Data & {
  updateFields: (fields: Partial<Step2Data>) => void;
};

const Step2 = ({ FocusAtWork, updateFields }: Step2Props) => {
  return (
    <>
      <ItemInfo
        description="your ability to perform work with strength and vitality"
        icon={TbTargetArrow}
      >
        Focus At Work
      </ItemInfo>
      <CustomSlider
        defaultValue={FocusAtWork}
        onChange={(value) => updateFields({ FocusAtWork: value })}
      />
      <Flex flexDirection="row" fontSize="lg" fontWeight="bold">
        <SliderIndicator bgGradient="linear(to-r, #faf1bb, #f3da4e)">
          Low
        </SliderIndicator>
        <SliderIndicator bgGradient="linear(to-r, #f3da4e, #f0d124)">
          Average
        </SliderIndicator>
        <SliderIndicator bgGradient="linear(to-r, #f0d124, #f3a34f, #f08d24)">
          High
        </SliderIndicator>
      </Flex>
    </>
  );
};

export default Step2;
