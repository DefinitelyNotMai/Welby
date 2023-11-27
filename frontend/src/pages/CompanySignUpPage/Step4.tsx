// lib
import { Flex, Heading, Input, Link, Textarea } from "@chakra-ui/react";

// local
import { FormItem } from "../../components/Form/FormItem";
import { Goal } from "../../data/typesForm";

type Step4Data = {
  Goals: Goal[];
};

type Step4Props = Step4Data & {
  updateFields: (fields: Partial<Step4Data>) => void;
};

export const Step4 = ({ Goals, updateFields }: Step4Props) => {
  const handleTitleChange = (index: number, value: string) => {
    const updatedGoals = [...Goals];
    updatedGoals[index].title = value;
    updateFields({ Goals: updatedGoals });
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const updatedGoals = [...Goals];
    updatedGoals[index].description = value;
    updateFields({ Goals: updatedGoals });
  };

  const handleDurationChange = (index: number, value: string) => {
    const updatedGoals = [...Goals];
    updatedGoals[index].durationTo = value;
    updateFields({ Goals: updatedGoals });
  };

  const handleAddGoal = () => {
    if (Goals.length < 5) {
      const updatedGoals = [
        ...Goals,
        { title: "", description: "", durationTo: "" },
      ];
      updateFields({ Goals: updatedGoals });
    }
  };

  const handleRemoveGoal = () => {
    if (Goals.length > 1) {
      const updatedGoals = [...Goals];
      updatedGoals.pop();
      updateFields({ Goals: updatedGoals });
    }
  };

  const generateIdAndName = (fieldName: string, index: number) => {
    return `${fieldName}-${index}`;
  };

  return (
    <Flex flexDirection="column" padding={[8, 16]} paddingBottom={[2, 1]}>
      <Heading fontSize="1.5rem" marginBottom={8} textAlign="center">
        Lastly, let your workforce know what your goals are as a company.
      </Heading>

      {Goals.map((goal, index) => (
        <Flex flexDirection="column" key={index} marginBottom={8}>
          <FormItem
            htmlFor={generateIdAndName("goal-title", index)}
            label={`Goal ${index + 1}`}
            isRequired
          >
            <Input
              id={generateIdAndName("goal-title", index)}
              name={generateIdAndName("goal-title", index)}
              onChange={(e) => {
                handleTitleChange(index, e.target.value);
              }}
              placeholder={`GOAL ${index + 1}`}
              value={goal.title}
            />
          </FormItem>

          <FormItem
            hideIndicator
            htmlFor={generateIdAndName("goal-description", index)}
            isRequired
          >
            <Textarea
              id={generateIdAndName("goal-description", index)}
              name={generateIdAndName("goal-description", index)}
              onChange={(e) => {
                handleDescriptionChange(index, e.target.value);
              }}
              placeholder="What it means..."
              value={goal.description}
            />
          </FormItem>

          <FormItem
            hideIndicator
            htmlFor={generateIdAndName("goal-duration", index)}
            isRequired
          >
            <Input
              id={generateIdAndName("goal-duration", index)}
              name={generateIdAndName("goal-duration", index)}
              onChange={(e) => {
                handleDurationChange(index, e.target.value);
              }}
              placeholder="yyyy-mm-dd"
              type="date"
              value={goal.durationTo}
            />
          </FormItem>
        </Flex>
      ))}

      <Flex
        flexDirection="row"
        justifyContent={Goals.length === 1 ? "flex-end" : "space-between"}
        marginY={2}
      >
        {Goals.length > 1 && (
          <Link onClick={handleRemoveGoal}>- Remove Goal</Link>
        )}
        {Goals.length < 5 && <Link onClick={handleAddGoal}>+ Add Goal</Link>}
      </Flex>
    </Flex>
  );
};
