import { Box, Flex } from "@chakra-ui/react";
import FormItem from "../../components/Form/FormItem";
import Textarea from "../../components/Form/Textarea";
import Heading from "../../components/Typography/Heading";

interface Step5Data {
  otherNotes: string;
}

interface Step5Props extends Step5Data {
  updateFields: (fields: Partial<Step5Data>) => void;
}

const Step5 = ({ otherNotes, updateFields }: Step5Props) => {
  return (
    <Flex flexDirection="column" padding={[8, 16]}>
      <Heading
        fontSize={["xl", "2xl", "3xl"]}
        marginBottom={16}
        textAlign="center"
        variant="white"
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
            onChange={(e) => updateFields({ otherNotes: e.target.value })}
            placeholder="Type here..."
            value={otherNotes}
          />
        </FormItem>
      </Box>
    </Flex>
  );
};

export default Step5;
