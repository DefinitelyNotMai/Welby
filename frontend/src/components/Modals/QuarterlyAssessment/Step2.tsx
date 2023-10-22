import QuestionAnswer from "./QuestionAnswer";
import QuestionItem from "./QuestionItem";

type Step2Data = {
  SenseOfBeingValued: number[];
};

type Step2Props = Step2Data & {
  updateFields: (fields: Partial<Step2Data>) => void;
};

const Step2 = ({ SenseOfBeingValued, updateFields }: Step2Props) => {
  const questions = [
    "1. I have security in my job.",
    "2. My organization genuinely cares about my well-being.",
    "3. My organization strongly considers my goals and values.",
    "4. I feel a strong sense of belonging to my organization.",
    "5. My values are similar to the organization's values.",
    "6. I put effort into doing my work because I receive recognition for my contributions.",
    "7. I put effort into doing my work because the compensations I receive allow me to provide for my family.",
  ];

  const handleQuestionItemClick = (index: number, value: number) => {
    const updatedSenseOfBeingValued = [...SenseOfBeingValued];
    updatedSenseOfBeingValued[index] = value;
    updateFields({ SenseOfBeingValued: updatedSenseOfBeingValued });
  };

  return (
    <>
      {SenseOfBeingValued.map((value, index) => (
        <QuestionItem key={index} question={questions[index]} marginBottom={4}>
          <QuestionAnswer
            value={value}
            onClick={(newValue) => handleQuestionItemClick(index, newValue)}
          />
        </QuestionItem>
      ))}
    </>
  );
};

export default Step2;
