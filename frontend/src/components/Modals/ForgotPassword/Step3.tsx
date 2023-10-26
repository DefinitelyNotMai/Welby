import { Flex } from "@chakra-ui/react";
import FormItem from "../../Form/FormItem";
import Input from "../../Form/Input";
import Text from "../../Typography/Text";

type Step3Data = {
  NewPassword: string;
  ConfirmNewPassword: string;
};

type Step3Props = Step3Data & {
  updateFields: (fields: Partial<Step3Data>) => void;
};

const Step3 = ({
  NewPassword,
  ConfirmNewPassword,
  updateFields,
}: Step3Props) => {
  return (
    <>
      <Flex textAlign="center">
        <Text fontSize={["md"]} variant="white">
          Enter your new password
        </Text>
      </Flex>
      <FormItem htmlFor="new-password" label="New Password" isRequired>
        <Input
          autoComplete="new-password"
          id="new-password"
          name="new-password"
          onChange={(e) => updateFields({ NewPassword: e.target.value })}
          placeholder="New Password"
          type="password"
          value={NewPassword}
        />
      </FormItem>
      <FormItem
        htmlFor="confirm-new-password"
        label="Confirm New Password"
        isRequired
      >
        <Input
          autoComplete="new-password"
          id="confirm-new-password"
          name="confirm-new-password"
          onChange={(e) => updateFields({ ConfirmNewPassword: e.target.value })}
          placeholder="Confirm New Password"
          type="password"
          value={ConfirmNewPassword}
        />
      </FormItem>
    </>
  );
};

export default Step3;
