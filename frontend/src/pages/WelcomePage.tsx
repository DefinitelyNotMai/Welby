import { Box, Flex, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Card from "../components/DataDisplay/Card";
import Button from "../components/Form/Button";
import Heading from "../components/Typography/Heading";
import WelcomeLayout from "../layout/WelcomeLayout";

const WelcomePage = () => {
  document.title = "Welcome to your happy portal | Welby";

  const navigate = useNavigate();

  //useRedirect();
  return (
    <WelcomeLayout>
      <Card variant="welcome">
        <Flex flexDirection="column" padding={[8, 12, 16]}>
          <Box marginBottom={10}>
            <Heading textAlign="center" variant="white">
              Welcome to your happy portal
            </Heading>
          </Box>
          <VStack alignSelf="center" gap={4} width="50%">
            <Button onClick={() => navigate("/signup")} variant="primary">
              Sign Up
            </Button>
            <Button onClick={() => navigate("/login")} variant="primary">
              Login
            </Button>
          </VStack>
        </Flex>
      </Card>
    </WelcomeLayout>
  );
};

export default WelcomePage;
