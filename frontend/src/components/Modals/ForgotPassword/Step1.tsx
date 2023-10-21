import { Flex } from "@chakra-ui/react";
import CustomText from "../../CustomText";
import { CustomTextbox } from "../../Form/CustomInput";
import FormItem from "../../Form/FormItem";

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
        <CustomText fontSize={["md"]}>
          Please enter your email address to receive a <br />
          6-digit verification code.
        </CustomText>
      </Flex>
      <FormItem htmlFor="email" label="Email Address" isRequired>
        <CustomTextbox
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
