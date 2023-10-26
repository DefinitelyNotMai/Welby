import { Flex } from "@chakra-ui/react";
import FormItem from "../../components/Form/FormItem";
import Input from "../../components/Form/Input";
import Textarea from "../../components/Form/Textarea";
import Heading from "../../components/Typography/Heading";
import Link from "../../components/Typography/Link";

interface CompanyValue {
  title: string;
  description: string;
}

interface Step3Data {
  companyValues: CompanyValue[];
}

interface Step3Props extends Step3Data {
  updateFields: (fields: Partial<Step3Data>) => void;
}

const Step3 = ({ companyValues, updateFields }: Step3Props) => {
  const handleTitleChange = (index: number, value: string) => {
    const updatedValues = [...companyValues];
    updatedValues[index].title = value;
    updateFields({ companyValues: updatedValues });
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const updatedValues = [...companyValues];
    updatedValues[index].description = value;
    updateFields({ companyValues: updatedValues });
  };

  const handleAddValue = () => {
    const updatedValues = [...companyValues, { title: "", description: "" }];
    updateFields({ companyValues: updatedValues });
  };

  const handleRemoveValue = () => {
    if (companyValues.length > 1) {
      const updatedValues = [...companyValues];
      updatedValues.pop();
      updateFields({ companyValues: updatedValues });
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
      {companyValues.map((value, index) => (
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
        justifyContent={
          companyValues.length === 1 ? "flex-end" : "space-between"
        }
        marginY={2}
      >
        {companyValues.length > 1 && (
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
