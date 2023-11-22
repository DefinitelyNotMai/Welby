import { AnswerSelect } from "./AnswerSelect";
import { QuestionItem } from "./QuestionItem";

type Step5Data = {
  SubjectiveWellBeing: number[];
};

type Step5Props = Step5Data & {
  updateFields: (fields: Partial<Step5Data>) => void;
};

const Step5 = ({ SubjectiveWellBeing, updateFields }: Step5Props) => {
  const questions = [
    "1. Mostly I feel happy.",
    "2. My life has primarily been sorrowful.",
    "3. I feel good about myself.",
  ];

  const handleQuestionItemClick = (index: number, value: number) => {
    const updatedSubjectiveWellBeing = [...SubjectiveWellBeing];
    updatedSubjectiveWellBeing[index] = value;
    updateFields({ SubjectiveWellBeing: updatedSubjectiveWellBeing });
  };

  return (
    <>
      {SubjectiveWellBeing.map((value, index) => (
        <QuestionItem key={index} question={questions[index]} marginBottom="4">
          <AnswerSelect
            value={value}
            onClick={(newValue) => handleQuestionItemClick(index, newValue)}
          />
        </QuestionItem>
      ))}
    </>
  );
};

export default Step5;
