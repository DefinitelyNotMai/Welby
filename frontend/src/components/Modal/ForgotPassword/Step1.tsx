// lib
import { Flex, Input, Text } from "@chakra-ui/react";

// local
import { FormItem } from "../../Form/FormItem";

type Step1Data = {
  Email: string;
};

type Step1Props = Step1Data & {
  updateFields: (field: Partial<Step1Data>) => void;
};

export const Step1 = ({ Email, updateFields }: Step1Props) => {
  return (
    <>
      <Flex flexDirection="column" textAlign="center">
        <Text marginBottom={4}>
          Please enter your email to receive a 6-digit verification code.
        </Text>
        <FormItem htmlFor="forgot-email" label="Email Address" isRequired>
          <Input
            autoComplete="email"
            backgroundColor="#ffffff"
            id="forgot-email"
            name="forgot-email"
            onChange={(e) => updateFields({ Email: e.target.value })}
            placeholder="Email Address"
            type="email"
            value={Email}
          />
        </FormItem>
      </Flex>
    </>
  );
};
