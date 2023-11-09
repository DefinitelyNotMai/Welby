// lib
import { Avatar, Flex, Heading } from "@chakra-ui/react";

type Step8Props = {
  Nickname: string;
  ProfilePhoto: string;
};

export const Step8 = ({ Nickname, ProfilePhoto }: Step8Props) => {
  return (
    <Flex alignItems="center" flexDirection="column" gap={8} padding={[8, 16]}>
      <Heading>Welcome to the Team!</Heading>
      <Heading fontSize="4rem">{Nickname}</Heading>
      <Avatar boxSize={[32, 64]} src={ProfilePhoto} />
      <Heading fontSize="2rem" fontWeight="normal">
        You are all set-up!
      </Heading>
    </Flex>
  );
};
