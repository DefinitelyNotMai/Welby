import { Box, Flex } from "@chakra-ui/react";
import InterestCheckbox from "../../components/Form/InterestCheckbox";
import Heading from "../../components/Typography/Heading";

type Step4Data = {
  Interests: string[];
};

type Step4Props = Step4Data & {
  updateFields: (fields: Partial<Step4Data>) => void;
};

const Step4 = ({ Interests, updateFields }: Step4Props) => {
  return (
    <Flex flexDirection="column" padding={[8, 16]}>
      <Box marginBottom={10} textAlign="center">
        <Heading color="white" fontSize={["2xl", "3xl", "4xl"]}>
          Share your strengths to the team.
        </Heading>
        <Heading color="white" fontSize={["lg", "xl", "2xl"]} marginBottom={4}>
          &quot;Play with your strengths.&quot;
        </Heading>
        <Heading
          color="white"
          fontSize={["md", "lg", "xl"]}
          fontWeight="normal"
        >
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
