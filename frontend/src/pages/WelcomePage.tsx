// lib
import { Button, Card, Flex, Heading, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// local
import { WelcomeLayout } from "../layout/WelcomeLayout";

export const WelcomePage = () => {
  document.title = "Welcome | Welby";

  const navigate = useNavigate();

  return (
    <WelcomeLayout>
      <Card variant="welcome">
        <Flex flexDirection="column" padding={[8, 12, 16]}>
          <Heading marginBottom={10} textAlign="center">
            Welcome to your happy portal
          </Heading>
          <Stack
            alignSelf="center"
            direction="column"
            gap={4}
            width={["75%", "50%"]}
          >
            <Button onClick={() => navigate("/signup")}>Sign Up</Button>
            <Button onClick={() => navigate("/login")}>Log In</Button>
          </Stack>
        </Flex>
      </Card>
    </WelcomeLayout>
  );
};
