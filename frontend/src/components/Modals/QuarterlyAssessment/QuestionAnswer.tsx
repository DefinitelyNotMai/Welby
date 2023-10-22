import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import CustomText from "../../CustomText";

type QuestionAnswerProps = {
  onClick: (value: number) => void;
  value?: number;
};

const QuestionAnswer = ({ onClick, value }: QuestionAnswerProps) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleBoxClick = (newValue: number) => {
    setSelectedValue(newValue);
    onClick(newValue);
  };

  return (
    <>
      <CustomText>Not at all true</CustomText>
      {[1, 2, 3, 4, 5, 6, 7].map((val) => (
        <Box
          borderRadius="50% 50% 50% 50%"
          backgroundColor="#fffef1"
          boxShadow="2xl"
          cursor="pointer"
          key={val}
          onClick={() => handleBoxClick(val)}
          paddingX={6}
          paddingY={4}
        >
          {selectedValue === val && <FaCheck color="#24a2f0" size={16} />}
        </Box>
      ))}
      <CustomText>Very True</CustomText>
    </>
  );
};

export default QuestionAnswer;
