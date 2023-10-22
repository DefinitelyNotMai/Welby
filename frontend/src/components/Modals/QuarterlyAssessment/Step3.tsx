import QuestionAnswer from "./QuestionAnswer";
import QuestionItem from "./QuestionItem";

type Step3Data = {
  NurturedPsychologicalNeeds: number[];
};

type Step3Props = Step3Data & {
  updateFields: (fields: Partial<Step3Data>) => void;
};

const Step3 = ({ NurturedPsychologicalNeeds, updateFields }: Step3Props) => {
  const questions = [
    "1. There is not much opportunity for me to decide for myself how to go about my work.",
    "2. In my job, I do not get much of a chance to show how capable I am.",
    "3. I do not feel very competent when I am at work.",
    "4. When I am working, I often do not feel very capable.",
    "5. I pretty much keep to myself when I am at work.",
    "6. The people I work with do not seem to like me much.",
    "7. I do little because I don't think this work is worth putting efforts into.",
    "8. I don't put effort into doing my work because I feel that I'm just wasting my time.",
    "9. I feel like I can make a lot of inputs to deciding how my job gets done.",
    "10. I am free to express my ideas and opinions on the job.",
    "11. My supervisor genuinely cares about my ideas and opinions.",
    "12. My supervisor encourages my development.",
    "13. I can apply a variety of my skills and talents to perform many different things at work.",
  ];

  const handleQuestionItemClick = (index: number, value: number) => {
    const updatedNurturedPsychologicalNeeds = [...NurturedPsychologicalNeeds];
    updatedNurturedPsychologicalNeeds[index] = value;
    updateFields({
      NurturedPsychologicalNeeds: updatedNurturedPsychologicalNeeds,
    });
  };

  return (
    <>
      {NurturedPsychologicalNeeds.map((value, index) => (
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

export default Step3;
