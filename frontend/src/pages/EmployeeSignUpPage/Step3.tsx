import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import FormItem from "../../components/Form/FormItem";
import { SelectStrength } from "../../components/Form/Select";
import Heading from "../../components/Typography/Heading";

type Step3Data = {
  RealizedStrengths: string[];
  UnrealizedStrengths: string[];
  LearnedBehaviors: string[];
  Weakness: string;
};

type Step3Props = Step3Data & {
  updateFields: (fields: Partial<Step3Data>) => void;
};

const Step3 = ({
  RealizedStrengths,
  UnrealizedStrengths,
  LearnedBehaviors,
  Weakness,
  updateFields,
}: Step3Props) => {
  const handleRealizedStrengthSelect = (index: number, value: string) => {
    const updatedStrengths = [...RealizedStrengths];
    updatedStrengths[index] = value;
    updateFields({ RealizedStrengths: updatedStrengths });
  };

  const handleUnrealizedStrengthSelect = (index: number, value: string) => {
    const updatedStrengths = [...UnrealizedStrengths];
    updatedStrengths[index] = value;
    updateFields({ UnrealizedStrengths: updatedStrengths });
  };

  const handleLearnedBehaviorSelect = (index: number, value: string) => {
    const updatedStrengths = [...LearnedBehaviors];
    updatedStrengths[index] = value;
    updateFields({ LearnedBehaviors: updatedStrengths });
  };

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
      <Grid templateColumns={["1fr", "1fr", "1fr 1fr 1fr"]} gap={8}>
        <GridItem colSpan={[1, 1, 3]}>
          <Flex flexDirection={["column", "row"]} gap={[1, 4]}>
            {[...Array(3)].map((_, index) => (
              <FormItem
                key={index}
                hideIndicator={index !== 0}
                htmlFor={`realized-strength-${index}`}
                isRequired
                label={index == 0 ? "Top 3 Realized Strengths" : "⠀"}
              >
                <SelectStrength
                  id={`realized-strength-${index}`}
                  name={`realized-strength-${index}`}
                  onChange={(e) => {
                    handleRealizedStrengthSelect(index, e.target.value);
                  }}
                  value={RealizedStrengths[index]}
                />
              </FormItem>
            ))}
          </Flex>
        </GridItem>
        <GridItem colSpan={[1, 1, 3]}>
          <Flex flexDirection={["column", "row"]} gap={[1, 4]}>
            {[...Array(3)].map((_, index) => (
              <FormItem
                key={index}
                hideIndicator={index !== 0}
                htmlFor={`unrealized-strength-${index}`}
                isRequired
                label={index == 0 ? "Top 3 Unrealized Strengths" : "⠀"}
              >
                <SelectStrength
                  id={`unrealized-strength-${index}`}
                  name={`unrealized-strength-${index}`}
                  onChange={(e) => {
                    handleUnrealizedStrengthSelect(index, e.target.value);
                  }}
                  value={UnrealizedStrengths[index]}
                />
              </FormItem>
            ))}
          </Flex>
        </GridItem>
        <GridItem colSpan={[1, 1, 3]}>
          <Flex flexDirection={["column", "row"]} gap={[1, 4]}>
            {[...Array(2)].map((_, index) => (
              <FormItem
                key={index}
                hideIndicator={index !== 0}
                htmlFor={`learned-behavior-${index}`}
                isRequired
                label={index == 0 ? "Top 2 Learned Behaviors" : "⠀"}
              >
                <SelectStrength
                  id={`learned-behavior-${index}`}
                  name={`learned behavior-${index}`}
                  onChange={(e) => {
                    handleLearnedBehaviorSelect(index, e.target.value);
                  }}
                  value={LearnedBehaviors[index]}
                />
              </FormItem>
            ))}
            <Flex width="full" />
          </Flex>
        </GridItem>
        <GridItem colSpan={[1, 1, 3]}>
          <Flex flexDirection={["column", "row"]}>
            <FormItem htmlFor="weakness" isRequired label="Top 1 Weakness">
              <SelectStrength
                id="weakness"
                name="weakness"
                onChange={(e) => {
                  updateFields({ Weakness: e.target.value });
                }}
                value={Weakness}
              />
            </FormItem>
            <Flex width="full" />
            <Flex width="full" />
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Step3;
