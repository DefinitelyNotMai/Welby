import { Flex } from "@chakra-ui/react";
import FormItem from "../../components/Form/FormItem";
import Textarea from "../../components/Form/Textarea";
import Heading from "../../components/Typography/Heading";

type Step2Data = {
  vision: string;
  mission: string;
};

type Step2Props = Step2Data & {
  updateFields: (fields: Partial<Step2Data>) => void;
};

const Step2 = ({ vision, mission, updateFields }: Step2Props) => {
  return (
    <Flex flexDirection="column" padding={[8, 16]} paddingBottom={[8, 4]}>
      <Heading fontSize={["lg", "2xl"]} textAlign="center" variant="white">
        &quot;A well-aligned workplace culture can improve productivity by
        25%&quot;
      </Heading>
      <Heading
        fontSize={["md", "lg"]}
        fontWeight="medium"
        textAlign="center"
        variant="white"
      >
        - LSA Global
      </Heading>
      <Flex flexDirection="column" gap={4}>
        <FormItem htmlFor="company-vision" label="VISION" isRequired>
          <Textarea
            id="company-vision"
            name="company-vision"
            onChange={(e) => {
              updateFields({ vision: e.target.value });
            }}
            placeholder="Type here..."
            value={vision}
          />
        </FormItem>
        <FormItem htmlFor="company-mission" label="MISSION" isRequired>
          <Textarea
            id="company-mission"
            name="company-mission"
            onChange={(e) => {
              updateFields({ mission: e.target.value });
            }}
            placeholder="Type here..."
            value={mission}
          />
        </FormItem>
      </Flex>
    </Flex>
  );
};

export default Step2;
