import { Box, Flex, Heading } from "@chakra-ui/react";
import CustomText from "../../components/CustomText";
import { CustomTextarea } from "../../components/Form/CustomInput";
import FormItem from "../../components/Form/FormItem";

type Step2Data = {
  Vision: string;
  Mission: string;
};

type Step2Props = Step2Data & {
  updateFields: (fields: Partial<Step2Data>) => void;
};

const Step2 = ({ Vision, Mission, updateFields }: Step2Props) => {
  return (
    <Flex flexDirection="column" padding={[8, 16]} paddingBottom={[8, 4]}>
      <Heading as="h1" marginBottom={10} textAlign="center">
        <Box fontSize={["lg", "2xl"]}>
          <CustomText fontWeight="bold">
            &quot;A well-aligned workplace culture can improve productivity by
            25%&quot;
          </CustomText>
        </Box>
        <Box fontSize={["md", "lg"]}>
          <CustomText>- LSA Global</CustomText>
        </Box>
      </Heading>
      <Flex flexDirection="column" gap={4}>
        <FormItem htmlFor="company-vision" label="VISION" isRequired>
          <CustomTextarea
            id="company-vision"
            name="company-vision"
            onChange={(e) => updateFields({ Vision: e.target.value })}
            placeholder="Type here..."
            value={Vision}
          />
        </FormItem>
        <FormItem htmlFor="company-mission" label="MISSION" isRequired>
          <CustomTextarea
            id="company-mission"
            name="company-mission"
            onChange={(e) => updateFields({ Mission: e.target.value })}
            placeholder="Type here..."
            value={Mission}
          />
        </FormItem>
      </Flex>
    </Flex>
  );
};

export default Step2;
