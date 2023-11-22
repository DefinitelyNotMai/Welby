import { AnswerSelect } from "./AnswerSelect";
import { QuestionItem } from "./QuestionItem";

type Step7Data = {
  IntentToQuit: number[];
};

type Step7Props = Step7Data & {
  updateFields: (fields: Partial<Step7Data>) => void;
};

const Step7 = ({ IntentToQuit, updateFields }: Step7Props) => {
  const questions = [
    "1. I frequently think of quitting my job.",
    "2. I am planning to search for a new job during the next 12 months.",
    "3. If I have my own way, I will be working for this organization one year from now.",
  ];

  const handleQuestionItemClick = (index: number, value: number) => {
    const updatedIntentToQuit = [...IntentToQuit];
    updatedIntentToQuit[index] = value;
    updateFields({ IntentToQuit: updatedIntentToQuit });
  };

  return (
    <>
      {IntentToQuit.map((value, index) => (
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

export default Step7;
