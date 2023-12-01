// lib
import { Box, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";

// local
import { FormItem } from "../../components/Form/FormItem";
import { SelectStrength } from "../../components/Form/Select";

type Step3Data = {
  RealizedStrengths: [number, number, number];
  UnrealizedStrengths: [number, number, number];
  LearnedBehaviors: [number, number];
  Weakness: number;
};

type Step3Props = Step3Data & {
  updateFields: (fields: Partial<Step3Data>) => void;
};

export const Step3 = ({
  RealizedStrengths,
  UnrealizedStrengths,
  LearnedBehaviors,
  Weakness,
  updateFields,
}: Step3Props) => {
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
      <Grid templateColumns={["1fr", "1fr", "1fr 1fr 1fr"]} gap={8}>
        <GridItem colSpan={[1, 1, 3]}>
          <Flex flexDirection={["column", "row"]} gap={[1, 4]}>
            {[...Array(3)].map((_, index) => (
              <FormItem
                key={`realized-strength-${index}`}
                hideIndicator={true}
                htmlFor={`realized-strength-${index}`}
                isRequired
                label={index === 0 ? "Top 3 Realized Strengths" : "⠀"}
              >
                <SelectStrength
                  id={`realized-strength-${index}`}
                  name={`realized-strength-${index}`}
                  onChange={(e) => {
                    const updatedRealizedStrengths = [
                      ...(RealizedStrengths || []),
                    ];
                    updatedRealizedStrengths[index] = parseInt(e.target.value);
                    updateFields({
                      RealizedStrengths: updatedRealizedStrengths,
                    });
                  }}
                  value={(RealizedStrengths || [])[index]}
                />
              </FormItem>
            ))}
          </Flex>
        </GridItem>
        <GridItem colSpan={[1, 1, 3]}>
          <Flex flexDirection={["column", "row"]} gap={[1, 4]}>
            {[...Array(3)].map((_, index) => (
              <FormItem
                key={`unrealized-strength-${index}`}
                hideIndicator={true}
                htmlFor={`unrealized-strength-${index}`}
                isRequired
                label={index === 0 ? "Top 3 Unrealized Strengths" : "⠀"}
              >
                <SelectStrength
                  id={`unrealized-strength-${index}`}
                  name={`unrealized-strength-${index}`}
                  onChange={(e) => {
                    const updatedUnrealizedStrengths = [
                      ...(UnrealizedStrengths || []),
                    ];
                    updatedUnrealizedStrengths[index] = parseInt(
                      e.target.value,
                    );
                    updateFields({
                      UnrealizedStrengths: updatedUnrealizedStrengths,
                    });
                  }}
                  value={(UnrealizedStrengths || [])[index]}
                />
              </FormItem>
            ))}
          </Flex>
        </GridItem>
        <GridItem colSpan={[1, 1, 3]}>
          <Flex flexDirection={["column", "row"]} gap={[1, 4]}>
            {[...Array(2)].map((_, index) => (
              <FormItem
                key={`learned-behavior-${index}`}
                hideIndicator={true}
                htmlFor={`learned-behavior-${index}`}
                isRequired
                label={index === 0 ? "Top 2 Learned Behaviors" : "⠀"}
              >
                <SelectStrength
                  id={`learned-behavior-${index}`}
                  name={`learned-behavior-${index}`}
                  onChange={(e) => {
                    const updatedLearnedBehaviors = [
                      ...(LearnedBehaviors || []),
                    ];
                    updatedLearnedBehaviors[index] = parseInt(e.target.value);
                    updateFields({
                      LearnedBehaviors: updatedLearnedBehaviors,
                    });
                  }}
                  value={(LearnedBehaviors || [])[index]}
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
                  updateFields({ Weakness: parseInt(e.target.value) });
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
