import { Box, Flex, VStack, useToast } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { Form } from "react-router-dom";
import processLogin from "../api/loginService";
import Card from "../components/DataDisplay/Card";
import Button from "../components/Form/Button";
import FormItem from "../components/Form/FormItem";
import Input from "../components/Form/Input";
import Heading from "../components/Typography/Heading";
import Link from "../components/Typography/Link";
import { INITIAL_LOGIN_DATA } from "../data/initForm";
import { LoginData } from "../data/typesForm";
import useRedirect from "../hooks/useRedirect";
import useUserContext from "../hooks/useUserContext";
import WelcomeLayout from "../layout/WelcomeLayout";

const LoginPage = () => {
  document.title = "Login | Welby";

  const [userData, setUserData] = useState<LoginData>(INITIAL_LOGIN_DATA);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] =
    useState<boolean>(false);

  const toast = useToast();
  const { setUserId } = useUserContext();

  const toggleForgotPassword = () => {
    setIsForgotPasswordOpen(!isForgotPasswordOpen);
  };

  const updateLoginFields = (fields: Partial<LoginData>) => {
    setUserData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  const handleLogin = async () => {
    const data = {
      email: userData.email,
      password: userData.password,
    };

    const loginSuccess = await processLogin(data, setUserId);

    if (loginSuccess) {
      toast({
        title: "SUCCESS",
        description: "Welcome to your dashboard",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "ERROR",
        description: "Login failed. Please check your credentials.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useRedirect();
  return (
    <WelcomeLayout>
      <Card variant="welcome">
        <Flex flexDirection="column" padding={[8, 12, 16]}>
          <Box marginBottom={10}>
            <Heading textAlign="center" variant="white">
              Welcome to your happy portal
            </Heading>
          </Box>
          <Form onSubmit={handleSubmit}>
            <VStack gap={4} marginBottom={4}>
              <FormItem htmlFor="email" label="Email Address" isRequired>
                <Input
                  autoComplete="email"
                  id="email"
                  name="email"
                  onChange={(e) => updateLoginFields({ email: e.target.value })}
                  placeholder="Email"
                  type="email"
                  value={userData.email}
                />
              </FormItem>
              <FormItem htmlFor="password" label="Password" isRequired>
                <Input
                  id="password"
                  name="password"
                  onChange={(e) =>
                    updateLoginFields({ password: e.target.value })
                  }
                  placeholder="Password"
                  type="password"
                  value={userData.password}
                />
              </FormItem>
            </VStack>
            <Link onClick={toggleForgotPassword} textAlign="left">
              Forgot Password?
            </Link>
            <Flex justifyContent="center" marginTop={4}>
              <Button variant="primary" type="submit" width="50%">
                Login
              </Button>
            </Flex>
          </Form>
        </Flex>
      </Card>
      {/* {isForgotPasswordOpen && (
        <ForgotPassword
          isOpen={isForgotPasswordOpen}
          onClose={toggleForgotPassword}
        />
      )} */}
    </WelcomeLayout>
  );
};

export default LoginPage;
