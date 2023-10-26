import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import FormItem from "../../components/Form/FormItem";
import { SelectStrength } from "../../components/Form/Select";
import Heading from "../../components/Typography/Heading";

interface Step3Data {
  realizedStrengths: string[];
  unrealizedStrengths: string[];
  learnedBehaviors: string[];
  weakness: string;
}

interface Step3Props extends Step3Data {
  updateFields: (fields: Partial<Step3Data>) => void;
}

const Step3 = ({
  realizedStrengths,
  unrealizedStrengths,
  learnedBehaviors,
  weakness,
  updateFields,
}: Step3Props) => {
  const handleRealizedStrengthSelect = (index: number, value: string) => {
    const updatedStrengths = [...realizedStrengths];
    updatedStrengths[index] = value;
    updateFields({ realizedStrengths: updatedStrengths });
  };

  const handleUnrealizedStrengthSelect = (index: number, value: string) => {
    const updatedStrengths = [...unrealizedStrengths];
    updatedStrengths[index] = value;
    updateFields({ unrealizedStrengths: updatedStrengths });
  };

  const handleLearnedBehaviorSelect = (index: number, value: string) => {
    const updatedStrengths = [...learnedBehaviors];
    updatedStrengths[index] = value;
    updateFields({ learnedBehaviors: updatedStrengths });
  };

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
                  value={realizedStrengths[index]}
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
                  value={unrealizedStrengths[index]}
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
                  value={learnedBehaviors[index]}
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
                  updateFields({ weakness: e.target.value });
                }}
                value={weakness}
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
