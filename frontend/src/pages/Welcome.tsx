import { Center, Flex, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import WelcomeCard from "../components/Welcome/WelcomeCard";
import WelcomeCardHeader from "../components/Welcome/WelcomeCardHeader";
import useUserContext from "../hooks/useUserContext";
import WelcomeLayout from "../layout/WelcomeLayout";

const Welcome = () => {
  document.title = "Welcome | Welby";

  const { isLoggedIn } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  return (
    <WelcomeLayout>
      <WelcomeCard>
        <Flex
          flexDirection="column"
          alignItems="center"
          height="full"
          padding={[8, 16]}
        >
          <WelcomeCardHeader isCentered>
            Welcome to your happy portal
          </WelcomeCardHeader>
          <Center width="full">
            <VStack gap={4} width={["50%", "80%"]}>
              <CustomButton
                onClick={() => {
                  navigate("signup");
                }}
                type="button"
              >
                Sign Up
              </CustomButton>
              <CustomButton
                onClick={() => {
                  navigate("login");
                }}
                type="button"
              >
                Log In
              </CustomButton>
            </VStack>
          </Center>
        </Flex>
      </WelcomeCard>
    </WelcomeLayout>
  );
};

export default Welcome;
