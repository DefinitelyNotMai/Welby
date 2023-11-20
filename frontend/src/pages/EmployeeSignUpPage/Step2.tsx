// lib
import { Box, Flex, Heading, Textarea } from "@chakra-ui/react";

// local
import { FormItem } from "../../components/Form/FormItem";

type Step2Data = {
  Work: string;
  Connect: string;
  Support: string;
};

type Step2Props = Step2Data & {
  updateFields: (fields: Partial<Step2Data>) => void;
};

export const Step2 = ({ Work, Connect, Support, updateFields }: Step2Props) => {
  return (
    <Flex flexDirection="column" padding={[8, 16]}>
      <Box marginBottom={10} textAlign="center">
        <Heading fontSize="1.875rem">
          Let your colleagues know how you can thrive
        </Heading>
        <Heading fontSize="1.25rem" marginBottom={4}>
          &quot;It is only in your thriving that you have anything to offer
          anyone&quot;
        </Heading>
        <Heading fontSize="0.875rem" fontWeight="normal">
          - Esther Hicks
        </Heading>
      </Box>
      <Flex flexDirection="column" gap={4}>
        <FormItem htmlFor="work" label="How do I work?" isRequired>
          <Textarea
            height="2rem"
            id="work"
            name="work"
            onChange={(e) => updateFields({ Work: e.target.value })}
            placeholder="Type here..."
            value={Work}
          />
        </FormItem>
        <FormItem
          htmlFor="connect"
          label="How do I connect and learn?"
          isRequired
        >
          <Textarea
            height="2rem"
            id="connect"
            name="connect"
            onChange={(e) => updateFields({ Connect: e.target.value })}
            placeholder="Type here..."
            value={Connect}
          />
        </FormItem>
        <FormItem htmlFor="support" label="What I need support in?" isRequired>
          <Textarea
            height="2rem"
            id="support"
            name="support"
            onChange={(e) => updateFields({ Support: e.target.value })}
            placeholder="Type here..."
            value={Support}
          />
        </FormItem>
      </Flex>
    </Flex>
  );
};
