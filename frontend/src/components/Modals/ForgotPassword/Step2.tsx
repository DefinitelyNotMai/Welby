import { Flex } from "@chakra-ui/react";
import CustomText from "../../CustomText";
import { CustomTextbox } from "../../Form/CustomInput";
import FormItem from "../../Form/FormItem";

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
        <CustomText fontSize={["md"]}>
          Enter the 6-digit verification code you received.
        </CustomText>
      </Flex>
      <FormItem htmlFor="code" label="Verification Code" isRequired>
        <CustomTextbox
          autoComplete="none"
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
