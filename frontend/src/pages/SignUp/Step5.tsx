import { Avatar, Box, Flex, Heading } from "@chakra-ui/react";
import CustomText from "../../components/CustomText";

type Step5Props = {
  Name: string;
  Logo: string;
};

const Step5 = ({ Name, Logo }: Step5Props) => {
  return (
    <Flex flexDirection="column" alignItems="center" gap={8} padding={[8, 16]}>
      <Heading as="h1" textAlign="center">
        <Box fontSize={["2xl", "4xl"]}>
          <CustomText fontWeight="bold">CONGRATULATIONS,</CustomText>
        </Box>
        <Box fontSize={["xl", "3xl"]}>
          <CustomText fontWeight="bold">{Name}</CustomText>
        </Box>
      </Heading>
      <Avatar boxSize={[32, 64]} src={Logo} />
      <Heading as="h2" fontSize={["2xl", "4xl"]}>
        <CustomText fontWeight="light">You are all set-up!</CustomText>
      </Heading>
    </Flex>
  );
};

export default Step5;
