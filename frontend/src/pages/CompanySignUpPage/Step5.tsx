// lib
import { Avatar, Flex, Heading } from "@chakra-ui/react";

type Step5Props = {
  Name: string;
  Logo: string;
};

export const Step5 = ({ Name, Logo }: Step5Props) => {
  return (
    <Flex flexDirection="column" alignItems="center" gap={8} padding={[8, 16]}>
      <Heading>CONGRATULATIONS,</Heading>
      <Heading fontSize="4rem">{Name}</Heading>
      <Avatar boxSize={[32, 64]} src={Logo} />
      <Heading fontSize="2rem" fontWeight="normal">
        You are all set-up!
      </Heading>
    </Flex>
  );
};
