// lib
import { Flex, Heading, Textarea } from "@chakra-ui/react";

// local
import { FormItem } from "../../components/Form/FormItem";

type Step2Data = {
  Vision: string;
  Mission: string;
};

type Step2Props = Step2Data & {
  updateFields: (fields: Partial<Step2Data>) => void;
};

export const Step2 = ({ Vision, Mission, updateFields }: Step2Props) => {
  return (
    <Flex flexDirection="column" padding={[8, 16]} paddingBottom={[8, 4]}>
      <Heading fontSize="1.5rem" textAlign="center">
        &quot;A well-aligned workplace culture can improve productivity by
        25%&quot;
      </Heading>
      <Heading
        fontSize="1.25rem"
        fontWeight="medium"
        marginBottom={10}
        textAlign="center"
      >
        - LSA Global
      </Heading>
      <Flex flexDirection="column" gap={4}>
        <FormItem htmlFor="company-vision" label="VISION" isRequired>
          <Textarea
            id="company-vision"
            name="company-vision"
            onChange={(e) => {
              updateFields({ Vision: e.target.value });
            }}
            placeholder="Type here..."
            value={Vision}
          />
        </FormItem>
        <FormItem htmlFor="company-mission" label="MISSION" isRequired>
          <Textarea
            id="company-mission"
            name="company-mission"
            onChange={(e) => {
              updateFields({ Mission: e.target.value });
            }}
            placeholder="Type here..."
            value={Mission}
          />
        </FormItem>
      </Flex>
    </Flex>
  );
};
