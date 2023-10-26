import { Flex } from "@chakra-ui/react";
import FormItem from "../../Form/FormItem";
import Input from "../../Form/Input";
import Text from "../../Typography/Text";

type Step2Data = {
  VerificationCode: string;
};

type Step2Props = Step2Data & {
  updateFields: (fields: Partial<Step2Data>) => void;
};

const Step2 = ({ VerificationCode, updateFields }: Step2Props) => {
  return (
    <>
      <Flex textAlign="center">
        <Text fontSize={["md"]} variant="white">
          Enter the 6-digit verification code you received.
        </Text>
      </Flex>
      <FormItem htmlFor="code" label="Verification Code" isRequired>
        <Input
          id="code"
          maxLength={6}
          name="code"
          onChange={(e) => updateFields({ VerificationCode: e.target.value })}
          placeholder="Code"
          type="number"
          value={VerificationCode}
        />
      </FormItem>
    </>
  );
};

export default Step2;
