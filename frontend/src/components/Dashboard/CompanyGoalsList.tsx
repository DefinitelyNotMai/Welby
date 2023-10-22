import { Flex } from "@chakra-ui/react";
import CustomButton from "../CustomButton";

const CompanyGoalsList = () => {
  return (
    <Flex flexDirection="column" width="full" gap={4}>
      <CustomButton onClick={() => console.log("GOAL 1")} type="button">
        GOAL 1
      </CustomButton>
      <CustomButton
        backgroundColor="#afafaf"
        onClick={() => console.log("GOAL 2")}
        type="button"
      >
        GOAL 2
      </CustomButton>
      <CustomButton
        backgroundColor="#afafaf"
        onClick={() => console.log("GOAL 3")}
        type="button"
      >
        GOAL 3
      </CustomButton>
      <CustomButton
        backgroundColor="#afafaf"
        onClick={() => console.log("GOAL 4")}
        type="button"
      >
        GOAL 4
      </CustomButton>
      <CustomButton onClick={() => console.log("ADD GOAL")} type="button">
        ADD GOAL +
      </CustomButton>
    </Flex>
  );
};

export default CompanyGoalsList;
