import { Avatar, Flex } from "@chakra-ui/react";
import Heading from "../../components/Typography/Heading";

interface Step6Props {
  nickname: string;
  profilePhoto: string;
}

const Step6 = ({ nickname, profilePhoto }: Step6Props) => {
  return (
    <Flex flexDirection="column" alignItems="center" gap={8} padding={[8, 16]}>
      <Heading
        fontSize={["2xl", "4xl"]}
        marginBottom={-8}
        textAlign="center"
        variant="white"
      >
        Welcome to the Team!
      </Heading>
      <Heading fontSize={["3xl", "5xl"]} variant="white">
        {nickname}
      </Heading>
      <Avatar boxSize={[32, 64]} src={profilePhoto} />
      <Heading fontSize={["2xl", "4xl"]} fontWeight="normal" variant="white">
        You are all set-up!
      </Heading>
    </Flex>
  );
};

export default Step6;
