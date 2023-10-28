import { Avatar, Flex } from "@chakra-ui/react";
import Heading from "../../components/Typography/Heading";

type Step5Props = {
  name: string;
  logo: string;
};

const Step5 = ({ name, logo }: Step5Props) => {
  return (
    <Flex flexDirection="column" alignItems="center" gap={8} padding={[8, 16]}>
      <Heading fontSize={["2xl", "4xl"]} marginBottom={-8} variant="white">
        CONGRATULATIONS,
      </Heading>
      <Heading fontSize={["xl", "3xl"]} variant="white">
        {name}
      </Heading>
      <Avatar boxSize={[32, 64]} src={logo} />
      <Heading fontSize={["2xl", "4xl"]} fontWeight="normal" variant="white">
        You are all set-up!
      </Heading>
    </Flex>
  );
};

export default Step5;
