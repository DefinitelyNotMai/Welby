// lib
import { Box, Flex, Heading } from "@chakra-ui/react";
import { InterestCheckbox } from "../../components/Form/InterestCheckbox";

type Step4Data = {
  Interests: number[];
};

type Step4Props = Step4Data & {
  updateFields: (fields: Partial<Step4Data>) => void;
};

const Step4 = ({ Interests, updateFields }: Step4Props) => {
  return (
    <Flex flexDirection="column" padding={[8, 16]}>
      <Box marginBottom={10} textAlign="center">
        <Heading fontSize="1.875rem">Share your strengths to the team.</Heading>
        <Heading fontSize="1.25rem" marginBottom={4}>
          &quot;Play with your strengths.&quot;
        </Heading>
        <Heading fontSize="0.875rem" fontWeight="normal">
          - Jennifer Lopez
        </Heading>
      </Box>
      <Flex flexDirection="column" width="full">
        <InterestCheckbox
          value={Interests}
          onChange={(e) => updateFields({ Interests: e })}
        />
      </Flex>
    </Flex>
  );
};

export default Step4;
