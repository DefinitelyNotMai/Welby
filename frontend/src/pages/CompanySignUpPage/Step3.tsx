// lib
import { Flex, Heading, Input, Link, Textarea } from "@chakra-ui/react";

// local
import { FormItem } from "../../components/Form/FormItem";
import { Value } from "../../data/typesForm";

type Step3Data = {
  Values: Value[];
};

type Step3Props = Step3Data & {
  updateFields: (fields: Partial<Step3Data>) => void;
};

export const Step3 = ({ Values, updateFields }: Step3Props) => {
  const handleTitleChange = (index: number, value: string) => {
    const updatedValues = [...Values];
    updatedValues[index].title = value;
    updateFields({ Values: updatedValues });
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const updatedValues = [...Values];
    updatedValues[index].description = value;
    updateFields({ Values: updatedValues });
  };

  const handleAddValue = () => {
    const updatedValues = [...Values, { title: "", description: "" }];
    updateFields({ Values: updatedValues });
  };

  const handleRemoveValue = () => {
    if (Values.length > 1) {
      const updatedValues = [...Values];
      updatedValues.pop();
      updateFields({ Values: updatedValues });
    }
  };

  const generateIdAndName = (fieldName: string, index: number) => {
    return `${fieldName}-${index}`;
  };

  return (
    <Flex flexDirection="column" padding={[8, 16]} paddingBottom={[2, 1]}>
      <Heading fontSize="1.5rem" marginBottom={10} textAlign="center">
        Next, let your workforce know what you value as a company.
      </Heading>

      {Values.map((value, index) => (
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
        justifyContent={Values.length === 1 ? "flex-end" : "space-between"}
        marginY={2}
      >
        {Values.length > 1 && (
          <Link onClick={handleRemoveValue}>- Remove Value</Link>
        )}

        <Link onClick={handleAddValue}>+ Add Value</Link>
      </Flex>
    </Flex>
  );
};
