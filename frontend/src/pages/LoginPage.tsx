// lib
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Input,
  Link,
  Modal,
  useToast,
} from "@chakra-ui/react";
import { Form, useNavigate } from "react-router-dom";
import { FormEvent, useState, useContext } from "react";

// local
import { ForgotPassword } from "../components/Modal/ForgotPassword/ForgotPassword";
import { FormItem } from "../components/Form/FormItem";
import { INITIAL_LOGIN_DATA } from "../data/initForm";
import { LoginData } from "../data/typesForm";
import { SystemUsers } from "../data/typesOWS";
import { WelcomeLayout } from "../layout/WelcomeLayout";
import { processLogin } from "../api/loginService";
import { UserContext } from "../context/UserContext";

export const LoginPage = () => {
  document.title = "Login | Welby";

  const [userData, setUserData] = useState<LoginData>(INITIAL_LOGIN_DATA);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const toast = useToast();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const updateLoginFields = (fields: Partial<SystemUsers>) => {
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
      UserName: userData.UserName,
      Password: userData.Password,
    };

    const loginSuccess = await processLogin(data);

    if (loginSuccess.loginSuccess) {
      toast({
        title: "SUCCESS",
        description: "Welcome to your dashboard",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      navigate(loginSuccess.path);
    } else {
      toast({
        title: "ERROR",
        description:
          "Login failed. Please check your credentials and try again.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <WelcomeLayout>
      <Card variant="welcome">
        <Flex flexDirection="column" padding={[8, 12, 16]}>
          <Heading marginBottom={10} textAlign="center">
            Welcome to your happy portal
          </Heading>
          <Form onSubmit={handleSubmit}>
            <Flex alignSelf="center" flexDirection="column" gap={[4]}>
              <FormItem htmlFor="user-email" isRequired label="Email">
                <Input
                  id="user-email"
                  name="user-email"
                  onChange={(e) =>
                    updateLoginFields({ UserName: e.target.value })
                  }
                  placeholder="Email"
                  type="email"
                />
              </FormItem>
              <FormItem htmlFor="user-password" isRequired label="Password">
                <Input
                  id="user-password"
                  name="user-password"
                  onChange={(e) =>
                    updateLoginFields({ Password: e.target.value })
                  }
                  placeholder="Password"
                  type="password"
                />
              </FormItem>
              <Box>
                <Link onClick={toggleModal}>Forgot Password?</Link>
              </Box>
              <Button alignSelf="center" type="submit" width="50%">
                Log In
              </Button>
            </Flex>
          </Form>
        </Flex>
      </Card>
      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        isCentered
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <ForgotPassword onClose={toggleModal} />
      </Modal>
    </WelcomeLayout>
  );
};
