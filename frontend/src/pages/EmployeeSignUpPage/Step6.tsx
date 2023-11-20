// lib
import { Avatar, Flex, Heading } from "@chakra-ui/react";

type Step6Props = {
  Nickname: string;
  ProfilePhoto: string;
};

export const Step6 = ({ Nickname, ProfilePhoto }: Step6Props) => {
  return (
    <Flex flexDirection="column" alignItems="center" gap={8} padding={[8, 16]}>
      <Heading>Welcome to the Team!</Heading>
      <Heading fontSize="4rem">{Nickname}</Heading>
      <Avatar boxSize={[32, 64]} src={ProfilePhoto} />
      <Heading fontSize="2rem" fontWeight="normal">
        You are all set-up!
      </Heading>
    </Flex>
  );
};
