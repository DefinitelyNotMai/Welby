// lib
import { Flex, Input, Text } from "@chakra-ui/react";

// local
import { FormItem } from "../../Form/FormItem";

type Step2Data = {
  VerificationCode: string;
};

type Step2Props = Step2Data & {
  updateFields: (fields: Partial<Step2Data>) => void;
};

export const Step2 = ({ VerificationCode, updateFields }: Step2Props) => {
  return (
    <>
      <Flex flexDirection="column" textAlign="center">
        <Text marginBottom={4}>
          Enter the 6-digit verification code you received.
        </Text>
        <FormItem
          htmlFor="verification-code"
          label="Verification Code"
          isRequired
        >
          <Input
            autoComplete="email"
            backgroundColor="#ffffff"
            id="verification-code"
            name="verification-code"
            onChange={(e) => updateFields({ VerificationCode: e.target.value })}
            placeholder="Verification Code"
            value={VerificationCode}
          />
        </FormItem>
      </Flex>
    </>
  );
};
