import { Flex } from "@chakra-ui/react";
import FormItem from "../../components/Form/FormItem";
import Input from "../../components/Form/Input";
import Textarea from "../../components/Form/Textarea";
import Heading from "../../components/Typography/Heading";
import Link from "../../components/Typography/Link";

interface CompanyGoal {
  title: string;
  description: string;
  durationTo: string;
}

interface Step4Data {
  companyGoals: CompanyGoal[];
}

interface Step4Props extends Step4Data {
  updateFields: (fields: Partial<Step4Data>) => void;
}

const Step4 = ({ companyGoals, updateFields }: Step4Props) => {
  const handleTitleChange = (index: number, value: string) => {
    const updatedGoals = [...companyGoals];
    updatedGoals[index].title = value;
    updateFields({ companyGoals: updatedGoals });
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const updatedGoals = [...companyGoals];
    updatedGoals[index].description = value;
    updateFields({ companyGoals: updatedGoals });
  };

  const handleDurationChange = (index: number, value: string) => {
    const updatedGoals = [...companyGoals];
    updatedGoals[index].durationTo = value;
    updateFields({ companyGoals: updatedGoals });
  };

  const handleAddGoal = () => {
    const updatedGoals = [
      ...companyGoals,
      { title: "", description: "", durationTo: "" },
    ];
    updateFields({ companyGoals: updatedGoals });
  };

  const handleRemoveGoal = () => {
    if (companyGoals.length > 1) {
      const updatedGoals = [...companyGoals];
      updatedGoals.pop();
      updateFields({ companyGoals: updatedGoals });
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
      {companyGoals.map((goal, index) => (
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
        justifyContent={
          companyGoals.length === 1 ? "flex-end" : "space-between"
        }
        marginY={2}
      >
        {companyGoals.length > 1 && (
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
