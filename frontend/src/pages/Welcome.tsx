import { Flex, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import CustomText from "../components/CustomText";
import WelcomeCard from "../components/Welcome/WelcomeCard";
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
      <WelcomeCard width={["90%", "75%", "60%", "40%"]}>
        <Flex
          alignItems="center"
          flexDirection="column"
          gap={4}
          padding={[8, 10, 12, 16]}
          width="full"
        >
          <Heading
            as="h1"
            fontSize={["2xl", "4xl"]}
            marginBottom={10}
            textAlign="center"
          >
            <CustomText fontWeight="bold">
              Welcome to your happy portal
            </CustomText>
          </Heading>
          <CustomButton onClick={() => navigate("/signup")} type="button">
            <CustomText fontWeight="medium">Sign Up</CustomText>
          </CustomButton>
          <CustomButton onClick={() => navigate("/login")} type="button">
            <CustomText fontWeight="medium">Log In</CustomText>
          </CustomButton>
        </Flex>
      </WelcomeCard>
    </WelcomeLayout>
  );
};

export default Welcome;
