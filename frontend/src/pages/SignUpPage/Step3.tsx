import { Flex } from "@chakra-ui/react";
import FormItem from "../../components/Form/FormItem";
import Input from "../../components/Form/Input";
import Textarea from "../../components/Form/Textarea";
import Heading from "../../components/Typography/Heading";
import Link from "../../components/Typography/Link";
import { Value } from "../../data/typesForm";

type Step3Data = {
  values: Value[];
};

type Step3Props = Step3Data & {
  updateFields: (fields: Partial<Step3Data>) => void;
};

const Step3 = ({ values, updateFields }: Step3Props) => {
  const handleTitleChange = (index: number, value: string) => {
    const updatedValues = [...values];
    updatedValues[index].title = value;
    updateFields({ values: updatedValues });
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const updatedValues = [...values];
    updatedValues[index].description = value;
    updateFields({ values: updatedValues });
  };

  const handleAddValue = () => {
    const updatedValues = [...values, { title: "", description: "" }];
    updateFields({ values: updatedValues });
  };

  const handleRemoveValue = () => {
    if (values.length > 1) {
      const updatedValues = [...values];
      updatedValues.pop();
      updateFields({ values: updatedValues });
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
        Next, let your workforce know what you value as a company.
      </Heading>
      {values.map((value, index) => (
        <Flex key={index} flexDirection="column" marginBottom={8}>
          <FormItem
            htmlFor={generateIdAndName("value-title", index)}
            label={`Value ${index + 1}`}
            isRequired
          >
            <Input
              id={generateIdAndName("value-title", index)}
              name={generateIdAndName("value-title", index)}
              onChange={(e) => {
                handleTitleChange(index, e.target.value);
              }}
              placeholder={`VALUE ${index + 1}`}
              type="text"
              value={value.title}
            />
          </FormItem>
          <FormItem
            key={index}
            htmlFor={generateIdAndName("value-description", index)}
            hideIndicator
            isRequired
          >
            <Textarea
              id={generateIdAndName("value-description", index)}
              name={generateIdAndName("value-description", index)}
              onChange={(e) => {
                handleDescriptionChange(index, e.target.value);
              }}
              placeholder="What it means..."
              value={value.description}
            />
          </FormItem>
        </Flex>
      ))}
      <Flex
        flexDirection="row"
        justifyContent={values.length === 1 ? "flex-end" : "space-between"}
        marginY={2}
      >
        {values.length > 1 && (
          <Link fontSize={["xs", "sm"]} onClick={handleRemoveValue}>
            - Remove Value
          </Link>
        )}
        <Link fontSize={["xs", "sm"]} onClick={handleAddValue}>
          + Add Value
        </Link>
      </Flex>
    </Flex>
  );
};

export default Step3;
