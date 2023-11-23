import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from "@chakra-ui/react";
import { QuestionItem } from "./QuestionItem";
import { useState } from "react";

type Step8Data = {
  Presenteeism: number[];
};

type Step8Props = Step8Data & {
  updateFields: (fields: Partial<Step8Data>) => void;
};

const Step8 = ({ Presenteeism, updateFields }: Step8Props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const questions = [
    "1. On a scale from 0 to 10 where 0 is the score of the lowest performer at your job and 10 is the score of a top worker, how would you rate the usual performance of most workers in your line of work ?",
    "2. On the same 0 to 10 scale, how would you rate your usual job performance over the past year or two ?",
    "3. On the same 0 to 10 scale, how would you rate your overall performance on the days you worked during the past 4 weeks ?",
  ];

  const handleQuestionItemClick = (index: number, value: number) => {
    const updatedPresenteeism = [...Presenteeism];
    updatedPresenteeism[index] = value;
    updateFields({ Presenteeism: updatedPresenteeism });
  };

  return (
    <>
      {Presenteeism.map((value, index) => (
        <QuestionItem key={index} question={questions[index]} marginBottom="4">
          <Slider
            defaultValue={value}
            max={10}
            min={0}
            step={1}
            onChange={(e) => handleQuestionItemClick(index, e)}
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
              label={value}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        </QuestionItem>
      ))}
    </>
  );
};

export default Step8;
