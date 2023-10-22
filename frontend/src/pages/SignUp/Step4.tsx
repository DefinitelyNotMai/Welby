import { Flex, Heading, Link } from "@chakra-ui/react";
import CustomText from "../../components/CustomText";
import {
  CustomTextarea,
  CustomTextbox,
  DateTimePicker,
} from "../../components/Form/CustomInput";
import FormItem from "../../components/Form/FormItem";

type CompanyGoal = {
  title: string;
  description: string;
  durationTo: string;
};

type Step4Data = {
  CompanyGoals: CompanyGoal[];
};

type Step4Props = Step4Data & {
  updateFields: (fields: Partial<Step4Data>) => void;
};

const Step4 = ({ CompanyGoals, updateFields }: Step4Props) => {
  const handleTitleChange = (index: number, value: string) => {
    const updatedGoals = [...CompanyGoals];
    updatedGoals[index].title = value;
    updateFields({ CompanyGoals: updatedGoals });
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const updatedGoals = [...CompanyGoals];
    updatedGoals[index].description = value;
    updateFields({ CompanyGoals: updatedGoals });
  };

  const handleDurationChange = (index: number, value: string) => {
    const updatedGoals = [...CompanyGoals];
    updatedGoals[index].durationTo = value;
    updateFields({ CompanyGoals: updatedGoals });
  };

  const handleAddGoal = () => {
    const updatedGoals = [
      ...(CompanyGoals || []),
      { title: "", description: "", durationTo: "" },
    ];
    updateFields({ CompanyGoals: updatedGoals });
  };

  const generateIdAndName = (fieldName: string, index: number) => {
    return `${fieldName}-${index}`;
  };

  const handleRemoveGoal = () => {
    if (CompanyGoals.length > 1) {
      const updatedGoals = [...CompanyGoals];
      updatedGoals.pop();
      updateFields({ CompanyGoals: updatedGoals });
    }
  };

  return (
    <Flex flexDirection="column" padding={[8, 16]} paddingBottom={[2, 1]}>
      <Heading
        as="h1"
        fontSize={["lg", "2xl"]}
        marginBottom={10}
        textAlign="center"
      >
        <CustomText fontWeight="bold">
          Lastly, let your workforce know what your goals are as a company.
        </CustomText>
      </Heading>
      <Flex flexDirection="column" gap={4}>
        {CompanyGoals.map((goal, index) => (
          <Flex flexDirection="column" gap={2} key={index}>
            <FormItem
              htmlFor={generateIdAndName("goal-title", index)}
              isRequired
            >
              <CustomTextbox
                autoComplete="off"
                id={generateIdAndName("goal-title", index)}
                name={generateIdAndName("goal-title", index)}
                onChange={(e) => handleTitleChange(index, e.target.value)}
                placeholder={`GOAL ${index + 1}`}
                type="text"
                value={goal.title}
              />
            </FormItem>
            <FormItem
              htmlFor={generateIdAndName("goal-description", index)}
              isRequired
            >
              <CustomTextarea
                id={generateIdAndName("goal-description", index)}
                name={generateIdAndName("goal-description", index)}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                placeholder="What it means..."
                value={goal.description}
              />
            </FormItem>
            <FormItem
              htmlFor={generateIdAndName("goal-duration", index)}
              isRequired
            >
              <DateTimePicker
                id={generateIdAndName("goal-duration", index)}
                name={generateIdAndName("goal-duration", index)}
                onChange={(e) => handleDurationChange(index, e.target.value)}
                value={goal.durationTo}
              />
            </FormItem>
          </Flex>
        ))}
      </Flex>
      <Flex
        flexDirection="row"
        justifyContent={
          CompanyGoals.length === 1 ? "flex-end" : "space-between"
        }
        marginY={2}
      >
        {CompanyGoals.length > 1 && (
          <Link fontSize={["xs", "sm"]} onClick={handleRemoveGoal}>
            <CustomText>- Remove Goal</CustomText>
          </Link>
        )}
        <Link fontSize={["xs", "sm"]} onClick={handleAddGoal}>
          <CustomText>+ Add Goal</CustomText>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Step4;
