import { Flex, Heading, Link } from "@chakra-ui/react";
import CustomText from "../../components/CustomText";
import {
  CustomTextarea,
  CustomTextbox,
} from "../../components/Form/CustomInput";
import FormItem from "../../components/Form/FormItem";

type CompanyValue = {
  title: string;
  description: string;
};

type Step3Data = {
  CompanyValues: CompanyValue[];
};

type Step3Props = Step3Data & {
  updateFields: (fields: Partial<Step3Data>) => void;
};

const Step3 = ({ CompanyValues, updateFields }: Step3Props) => {
  const handleTitleChange = (index: number, value: string) => {
    const updatedValues = [...CompanyValues];
    updatedValues[index].title = value;
    updateFields({ CompanyValues: updatedValues });
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const updatedValues = [...CompanyValues];
    updatedValues[index].description = value;
    updateFields({ CompanyValues: updatedValues });
  };

  const handleAddValue = () => {
    const updatedValues = [...CompanyValues, { title: "", description: "" }];
    updateFields({ CompanyValues: updatedValues });
  };

  const handleRemoveValue = () => {
    if (CompanyValues.length > 1) {
      const updatedValues = [...CompanyValues];
      updatedValues.pop();
      updateFields({ CompanyValues: updatedValues });
    }
  };

  const generateIdAndName = (fieldName: string, index: number) => {
    return `${fieldName}-${index}`;
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
          Next, let your workforce know what you value as a company.
        </CustomText>
      </Heading>
      <Flex flexDirection="column" gap={4}>
        {CompanyValues.map((value, index) => (
          <Flex flexDirection="column" gap={2} key={index}>
            <FormItem
              htmlFor={generateIdAndName("value-title", index)}
              isRequired
            >
              <CustomTextbox
                autoComplete="off"
                id={generateIdAndName("value-title", index)}
                name={generateIdAndName("value-title", index)}
                onChange={(e) => handleTitleChange(index, e.target.value)}
                placeholder={`VALUE ${index + 1}`}
                type="text"
                value={value.title}
              />
            </FormItem>
            <FormItem
              htmlFor={generateIdAndName("value-description", index)}
              isRequired
            >
              <CustomTextarea
                id={generateIdAndName("value-description", index)}
                name={generateIdAndName("value-description", index)}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                placeholder="What it means..."
                value={value.description}
              />
            </FormItem>
          </Flex>
        ))}
      </Flex>
      <Flex
        flexDirection="row"
        justifyContent={
          CompanyValues.length === 1 ? "flex-end" : "space-between"
        }
        marginY={2}
      >
        {CompanyValues.length > 1 && (
          <Link fontSize={["xs", "sm"]} onClick={handleRemoveValue}>
            <CustomText>- Remove Value</CustomText>
          </Link>
        )}
        <Link fontSize={["xs", "sm"]} onClick={handleAddValue}>
          <CustomText>+ Add Value</CustomText>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Step3;
