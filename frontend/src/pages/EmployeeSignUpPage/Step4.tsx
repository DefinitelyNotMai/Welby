import { Box, Flex } from "@chakra-ui/react";
import InterestCheckbox from "../../components/Form/InterestCheckbox";
import Heading from "../../components/Typography/Heading";

interface Step4Data {
  interests: string[];
}

interface Step4Props extends Step4Data {
  updateFields: (fields: Partial<Step4Data>) => void;
}

const Step4 = ({ interests, updateFields }: Step4Props) => {
  // const handleInterestsChange = (values: string[]) => {
  //   updateFields({ interests: values });
  // };

  return (
    <Flex flexDirection="column" padding={[8, 16]}>
      <Box marginBottom={10} textAlign="center">
        <Heading fontSize={["2xl", "3xl", "4xl"]} variant="white">
          Share your strengths to the team.
        </Heading>
        <Heading
          fontSize={["lg", "xl", "2xl"]}
          marginBottom={4}
          variant="white"
        >
          &quot;Play with your strengths.&quot;
        </Heading>
        <Heading
          fontSize={["md", "lg", "xl"]}
          fontWeight="normal"
          variant="white"
        >
          - Jennifer Lopez
        </Heading>
      </Box>
      <Flex flexDirection="column" width="full">
        <InterestCheckbox
          value={interests}
          onChange={(e) => updateFields({ interests: e })}
        />
      </Flex>
    </Flex>
  );
};

export default Step4;
