import { Box, Flex } from "@chakra-ui/react";
import FormItem from "../../components/Form/FormItem";
import Textarea from "../../components/Form/Textarea";
import Heading from "../../components/Typography/Heading";

interface Step2Data {
  work: string;
  connect: string;
  support: string;
}

interface Step2Props extends Step2Data {
  updateFields: (fields: Partial<Step2Data>) => void;
}

const Step2 = ({ work, connect, support, updateFields }: Step2Props) => {
  return (
    <Flex flexDirection="column" padding={[8, 16]}>
      <Box marginBottom={10} textAlign="center">
        <Heading variant="white">
          Let your colleagues know how you can thrive
        </Heading>
        <Heading fontSize={["xl", "2xl"]} marginBottom={4} variant="white">
          &quot;It is only in your thriving that you have anything to offer
          anyone&quot;
        </Heading>
        <Heading fontSize={["lg", "xl"]} fontWeight="normal" variant="white">
          - Esther Hicks
        </Heading>
      </Box>
      <Flex flexDirection="column" gap={4}>
        <FormItem htmlFor="work" label="How do I work?" isRequired>
          <Textarea
            id="work"
            name="work"
            onChange={(e) => updateFields({ work: e.target.value })}
            placeholder="Type here..."
            value={work}
          />
        </FormItem>
        <FormItem
          htmlFor="connect"
          label="How do I connect and learn?"
          isRequired
        >
          <Textarea
            id="connect"
            name="connect"
            onChange={(e) => updateFields({ connect: e.target.value })}
            placeholder="Type here..."
            value={connect}
          />
        </FormItem>
        <FormItem htmlFor="support" label="What I need support in?" isRequired>
          <Textarea
            id="support"
            name="support"
            onChange={(e) => updateFields({ support: e.target.value })}
            placeholder="Type here..."
            value={support}
          />
        </FormItem>
      </Flex>
    </Flex>
  );
};

export default Step2;
