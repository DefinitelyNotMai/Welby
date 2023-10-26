import { Flex } from "@chakra-ui/react";
import FormItem from "../../Form/FormItem";
import Input from "../../Form/Input";
import Text from "../../Typography/Text";

type Step1Data = {
  Email: string;
};

type Step1Props = Step1Data & {
  updateFields: (fields: Partial<Step1Data>) => void;
};

const Step1 = ({ Email, updateFields }: Step1Props) => {
  return (
    <>
      <Flex textAlign="center">
        <Text fontSize={["md"]} variant="white">
          Please enter your email address to receive a <br />
          6-digit verification code.
        </Text>
      </Flex>
      <FormItem htmlFor="email" label="Email Address" isRequired>
        <Input
          autoComplete="email"
          id="email"
          name="email"
          value={Email}
          onChange={(e) => updateFields({ Email: e.target.value })}
          placeholder="Email Address"
          type="email"
        />
      </FormItem>
    </>
  );
};

export default Step1;
