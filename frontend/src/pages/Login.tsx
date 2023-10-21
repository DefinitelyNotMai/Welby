import { Flex, Link, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { FormEvent, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import CustomText from "../components/CustomText";
import { CustomTextbox } from "../components/Form/CustomInput";
import FormItem from "../components/Form/FormItem";
import ForgotPassword from "../components/Modals/ForgotPassword";
import WelcomeCard from "../components/Welcome/WelcomeCard";
import WelcomeCardHeader from "../components/Welcome/WelcomeCardHeader";
import useUserContext from "../hooks/useUserContext";
import WelcomeLayout from "../layout/WelcomeLayout";

const Login = () => {
  document.title = "Welby | Login";

  const { setUserId, setIsLoggedIn } = useUserContext();
  const [UserName, setUserName] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] =
    useState<boolean>(false);

  const toast = useToast();
  const navigate = useNavigate();

  const adminUserName = "Venancio";
  const adminUserPassword = "Jones";

  const toggleForgotPassword = () => {
    setIsForgotPasswordOpen(!isForgotPasswordOpen);
  };

  const handleLogin = async () => {
    const tokenUrl = "http://localhost:58258/token";
    const header = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
    };

    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("username", adminUserName);
    formData.append("password", adminUserPassword);

    try {
      const tokenResponse = await fetch(tokenUrl, {
        method: "POST",
        headers: header,
        body: formData,
      }).then((res) => {
        return res.json();
      });
      if (tokenResponse != null) {
        const token = tokenResponse.access_token;
        const loginUrl = "http://localhost:58258/api/GetSystemUsers";
        let result = null;

        const param = {
          UserName: UserName, // Username
          Active: true,
        };
        axios
          .get(loginUrl, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            params: param,
          })
          .then((response) => {
            result = response.data;
            if (result != null) {
              if (result.length > 0) {
                const storedPassword = result[0].Password; // Use the same salt rounds used during registration
                setUserId(result[0].UserCode);

                bcrypt.compare(Password, storedPassword, (err, result) => {
                  if (err) {
                    // Handle error
                    alert(err);
                    console.log(err);
                  } else if (result) {
                    // Passwords match; login is successful
                    //alert("PasswordMatch")
                    toast({
                      title: "SUCCESS",
                      description:
                        "Login successful. Welcome to your Dashboard.",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    });
                    setIsLoggedIn(true);
                    navigate("/dashboard");
                  } else {
                    // Passwords do not match; login failed
                    toast({
                      title: "ERROR",
                      description: "Login failed. Please try again.",
                      status: "error",
                      duration: 5000,
                      isClosable: true,
                    });
                    alert("WrongPassword");
                  }
                });
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } catch (error) {
      // Handle network or other error
      console.error("An error occurred:", error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <WelcomeLayout>
      <WelcomeCard>
        <Flex
          flexDirection="column"
          height="full"
          width="full"
          padding={[8, 16]}
        >
          <WelcomeCardHeader isCentered>
            Welcome to your happy portal
          </WelcomeCardHeader>
          <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <VStack gap={5}>
              <FormItem htmlFor="username" label="Email" isRequired>
                <CustomTextbox
                  autoComplete="email"
                  id="username"
                  name="username"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  placeholder="Email Address"
                  type="email"
                  value={UserName}
                />
              </FormItem>
              <FormItem htmlFor="password" label="Password" isRequired>
                <CustomTextbox
                  autoComplete="current-password"
                  id="password"
                  name="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                  type="password"
                  value={Password}
                />
              </FormItem>
              <Link
                alignSelf="left"
                width="full"
                onClick={toggleForgotPassword}
              >
                <CustomText>Forgot Password?</CustomText>
              </Link>
              <CustomButton onClick={() => {}} type="submit" width={["50%"]}>
                Log In
              </CustomButton>
            </VStack>
          </Form>
        </Flex>
      </WelcomeCard>
      {isForgotPasswordOpen && (
        <ForgotPassword
          isOpen={isForgotPasswordOpen}
          onClose={toggleForgotPassword}
        />
      )}
    </WelcomeLayout>
  );
};

export default Login;
