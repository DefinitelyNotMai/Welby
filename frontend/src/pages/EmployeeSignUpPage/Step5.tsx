// lib
import { Box, Flex, Heading, Textarea } from "@chakra-ui/react";

// local
import { FormItem } from "../../components/Form/FormItem";

type Step5Data = {
  Other_Notes: string;
};

type Step5Props = Step5Data & {
  updateFields: (fields: Partial<Step5Data>) => void;
};

export const Step5 = ({ Other_Notes, updateFields }: Step5Props) => {
  return (
    <Flex flexDirection="column" padding={[8, 16]}>
      <Heading
        fontSize="1.75rem"
        marginBottom={16}
        noOfLines={2}
        textAlign="center"
      >
        Anything else you want your colleagues to take note of?
      </Heading>
      <Box marginX={32}>
        <FormItem
          htmlFor="other-notes"
          label="Other things I want to share for my team to know me more:"
        >
          <Textarea
            id="other-notes"
            name="other-notes"
            onChange={(e) => updateFields({ Other_Notes: e.target.value })}
            placeholder="Type here..."
            value={Other_Notes}
          />
        </FormItem>
      </Box>
    </Flex>
  );
};
