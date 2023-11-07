import { Avatar, Flex } from "@chakra-ui/react";
import Heading from "../../components/Typography/Heading";

type Step6Props = {
  Nickname: string;
  ProfilePhoto: string;
};

const Step6 = ({ Nickname, ProfilePhoto }: Step6Props) => {
  return (
    <Flex flexDirection="column" alignItems="center" gap={8} padding={[8, 16]}>
      <Heading
        color="white"
        fontSize={["2xl", "4xl"]}
        marginBottom={-8}
        textAlign="center"
      >
        Welcome to the Team!
      </Heading>
      <Heading color="white" fontSize={["3xl", "5xl"]}>
        {Nickname}
      </Heading>
      <Avatar boxSize={[32, 64]} src={ProfilePhoto} />
      <Heading color="white" fontSize={["2xl", "4xl"]} fontWeight="normal">
        You are all set-up!
      </Heading>
    </Flex>
  );
};

export default Step6;
