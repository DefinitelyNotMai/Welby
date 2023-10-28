import { Flex } from "@chakra-ui/react";
import FormItem from "../../components/Form/FormItem";
import Input from "../../components/Form/Input";
import Textarea from "../../components/Form/Textarea";
import Heading from "../../components/Typography/Heading";
import Link from "../../components/Typography/Link";
import { Goal } from "../../data/typesForm";

type Step4Data = {
  goals: Goal[];
};

type Step4Props = Step4Data & {
  updateFields: (fields: Partial<Step4Data>) => void;
};

const Step4 = ({ goals, updateFields }: Step4Props) => {
  const handleTitleChange = (index: number, value: string) => {
    const updatedGoals = [...goals];
    updatedGoals[index].title = value;
    updateFields({ goals: updatedGoals });
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const updatedGoals = [...goals];
    updatedGoals[index].description = value;
    updateFields({ goals: updatedGoals });
  };

  const handleDurationChange = (index: number, value: string) => {
    const updatedGoals = [...goals];
    updatedGoals[index].durationTo = value;
    updateFields({ goals: updatedGoals });
  };

  const handleAddGoal = () => {
    const updatedGoals = [
      ...goals,
      { title: "", description: "", durationTo: "" },
    ];
    updateFields({ goals: updatedGoals });
  };

  const handleRemoveGoal = () => {
    if (goals.length > 1) {
      const updatedGoals = [...goals];
      updatedGoals.pop();
      updateFields({ goals: updatedGoals });
    }
  };

  const generateIdAndName = (fieldName: string, index: number) => {
    return `${fieldName}-${index}`;
  };

  return (
    <Flex flexDirection="column" padding={[8, 16]} paddingBottom={[2, 1]}>
      <Heading
        fontSize={["lg", "2xl"]}
        marginBottom={10}
        textAlign="center"
        variant="white"
      >
        Lastly, let your workforce know what your goals are as a company.
      </Heading>
      {goals.map((goal, index) => (
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
              type="text"
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
        justifyContent={goals.length === 1 ? "flex-end" : "space-between"}
        marginY={2}
      >
        {goals.length > 1 && (
          <Link fontSize={["xs", "sm"]} onClick={handleRemoveGoal}>
            - Remove Goal
          </Link>
        )}
        <Link fontSize={["xs", "sm"]} onClick={handleAddGoal}>
          + Add Goal
        </Link>
      </Flex>
    </Flex>
  );
};

export default Step4;
