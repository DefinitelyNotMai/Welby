import { Flex } from "@chakra-ui/react";
import CustomButton from "../CustomButton";

const CompanyValuesList = () => {
  return (
    <Flex flexDirection="column" width="full" gap={4}>
      <CustomButton type="button" onClick={() => console.log("CORE VALUE 1")}>
        CORE VALUE 1
      </CustomButton>
      <CustomButton
        backgroundColor="#afafaf"
        type="button"
        onClick={() => console.log("CORE VALUE 2")}
      >
        CORE VALUE 2
      </CustomButton>
      <CustomButton
        backgroundColor="#afafaf"
        type="button"
        onClick={() => console.log("CORE VALUE 3")}
      >
        CORE VALUE 3
      </CustomButton>
      <CustomButton
        backgroundColor="#afafaf"
        type="button"
        onClick={() => console.log("CORE VALUE 4")}
      >
        CORE VALUE 4
      </CustomButton>
      <CustomButton type="button" onClick={() => console.log("ADD CORE VALUE")}>
        ADD CORE VALUE +
      </CustomButton>
    </Flex>
  );
};

export default CompanyValuesList;
