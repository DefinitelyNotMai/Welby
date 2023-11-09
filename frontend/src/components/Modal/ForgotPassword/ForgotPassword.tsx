// lib
import {
  Button,
  Flex,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { useState, FormEvent } from "react";

// local
import { FORGOT_PASSWORD_INITIAL_DATA } from "../../../data/initForm";
import { ForgotPasswordData } from "../../../data/typesForm";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { useMultiStepForm } from "../../../hooks/useMultiStepForm";

type ForgotPasswordProps = {
  onClose: () => void;
};

export const ForgotPassword = ({ onClose }: ForgotPasswordProps) => {
  document.title = "Password Recovery | Welby";

  const toast = useToast();
  const [forgotPasswordData, setForgotPasswordData] =
    useState<ForgotPasswordData>(FORGOT_PASSWORD_INITIAL_DATA);

  const updateForgotPaswordFields = (fields: Partial<ForgotPasswordData>) => {
    setForgotPasswordData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const { currentStepIndex, isFirstStep, nextStep, step } = useMultiStepForm([
    <Step1
      key={1}
      {...forgotPasswordData}
      updateFields={updateForgotPaswordFields}
    />,
    <Step2
      key={2}
      {...forgotPasswordData}
      updateFields={updateForgotPaswordFields}
    />,
    <Step3
      key={3}
      {...forgotPasswordData}
      updateFields={updateForgotPaswordFields}
    />,
  ]);

  // NOTE: Add calls here for sending email to request for otp
  const handleRequestCode = () => {
    nextStep();
  };

  const handleVerification = () => {
    const expectedCode = "69420"; // NOTE: value here should be the generated otp
    if (forgotPasswordData.VerificationCode === expectedCode) {
      nextStep();
    } else {
      toast({
        title: "ERROR",
        description: "Invalid verification code.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSubmitNewPassword = () => {
    if (
      forgotPasswordData.NewPassword === forgotPasswordData.ConfirmNewPassword
    ) {
      toast({
        title: "SUCCESS",
        description:
          "Password successfully updated. You can now log in with your new password.",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } else {
      toast({
        title: "ERROR",
        description: "Passwords do not match.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isFirstStep) {
      handleRequestCode();
    } else if (currentStepIndex === 1) {
      handleVerification();
    } else {
      handleSubmitNewPassword();
    }
  };
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Forgot Password</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleSubmit}>
          <Flex
            alignItems="center"
            flexDirection="column"
            gap={4}
            margin={8}
            marginTop={0}
          >
            {step}
            <Button type="submit">
              {isFirstStep
                ? "NEXT"
                : currentStepIndex === 1
                ? "VERIFY"
                : "SUBMIT"}
            </Button>
          </Flex>
        </Form>
      </ModalContent>
    </>
  );
};
