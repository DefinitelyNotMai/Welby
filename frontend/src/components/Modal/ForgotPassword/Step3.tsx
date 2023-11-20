// lib
import { Flex, Input, Text } from "@chakra-ui/react";

// local
import { FormItem } from "../../Form/FormItem";

type Step3Data = {
  NewPassword: string;
  ConfirmNewPassword: string;
};

type Step3Props = Step3Data & {
  updateFields: (fields: Partial<Step3Data>) => void;
};

export const Step3 = ({
  NewPassword,
  ConfirmNewPassword,
  updateFields,
}: Step3Props) => {
  return (
    <>
      <Flex flexDirection="column" gap={4} textAlign="center">
        <Text marginBottom={4}>
          Enter the 6-digit verification code you received.
        </Text>
        <FormItem htmlFor="new-password" label="New Password" isRequired>
          <Input
            backgroundColor="#ffffff"
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
          label="Confirm Password"
          isRequired
        >
          <Input
            backgroundColor="#ffffff"
            id="confirm-new-password"
            name="confirm-new-password"
            onChange={(e) =>
              updateFields({ ConfirmNewPassword: e.target.value })
            }
            placeholder="Confirm Password"
            type="password"
            value={ConfirmNewPassword}
          />
        </FormItem>
      </Flex>
    </>
  );
};
