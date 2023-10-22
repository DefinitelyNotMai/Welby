import { Flex } from "@chakra-ui/react";
import { BsPerson } from "react-icons/bs";
import CustomSlider from "../../Form/CustomSlider";
import ItemInfo from "./ItemInfo";
import SliderIndicator from "./SliderIndicator";

type Step1Data = {
  EnergyAtWork: number;
};

type Step1Props = Step1Data & {
  updateFields: (fields: Partial<Step1Data>) => void;
};

const Step1 = ({ EnergyAtWork, updateFields }: Step1Props) => {
  return (
    <>
      <ItemInfo
        description="your ability to perform work with strength and vitality"
        icon={BsPerson}
      >
        Energy At Work
      </ItemInfo>
      <CustomSlider
        defaultValue={EnergyAtWork}
        onChange={(value) => updateFields({ EnergyAtWork: value })}
      />
      <Flex flexDirection="row" fontSize="lg" fontWeight="bold">
        <SliderIndicator bgGradient="linear(to-r, #78c6f6, #24a2f0)">
          Low
        </SliderIndicator>
        <SliderIndicator bgGradient="linear(to-r, #24a2f0, #1d81c0)">
          Average
        </SliderIndicator>
        <SliderIndicator bgGradient="linear(to-r, #1d81c0, #125178)">
          High
        </SliderIndicator>
      </Flex>
    </>
  );
};

export default Step1;
