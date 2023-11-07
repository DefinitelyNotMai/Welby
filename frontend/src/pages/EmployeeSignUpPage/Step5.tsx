import { Box, Flex } from "@chakra-ui/react";
import FormItem from "../../components/Form/FormItem";
import Textarea from "../../components/Form/Textarea";
import Heading from "../../components/Typography/Heading";

type Step5Data = {
  Other_Notes: string;
};

type Step5Props = Step5Data & {
  updateFields: (fields: Partial<Step5Data>) => void;
};

const Step5 = ({ Other_Notes, updateFields }: Step5Props) => {
  return (
    <Flex flexDirection="column" padding={[8, 16]}>
      <Heading
        color="white"
        fontSize={["xl", "2xl", "3xl"]}
        marginBottom={16}
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

export default Step5;
