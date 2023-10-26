import {
  Center,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { Form } from "react-router-dom";
import useMultiStepForm from "../../../hooks/useMultiStepForm";
import Button from "../../Form/Button";
import Heading from "../../Typography/Heading";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

type ForgotPasswordFormData = {
  Email: string;
  VerificationCode: string;
  NewPassword: string;
  ConfirmNewPassword: string;
};

const FORGOT_PASSWORD_INITIAL_DATA = {
  Email: "",
  VerificationCode: "",
  NewPassword: "",
  ConfirmNewPassword: "",
};

type ForgotPasswordProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ForgotPassword = ({ isOpen, onClose }: ForgotPasswordProps) => {
  const [forgotPasswordData, setForgotPasswordData] = useState(
    FORGOT_PASSWORD_INITIAL_DATA,
  );

  const toast = useToast();

  const updateForgotPasswordFields = (
    fields: Partial<ForgotPasswordFormData>,
  ) => {
    setForgotPasswordData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const { currentStepIndex, step, isFirstStep, nextStep } = useMultiStepForm([
    <Step1
      key={1}
      {...forgotPasswordData}
      updateFields={updateForgotPasswordFields}
    />,
    <Step2
      key={2}
      {...forgotPasswordData}
      updateFields={updateForgotPasswordFields}
    />,
    <Step3
      key={3}
      {...forgotPasswordData}
      updateFields={updateForgotPasswordFields}
    />,
  ]);

  const handleSendCode = () => {
    nextStep();
  };

  // this will be for comparing if entered value is same as expectedCode
  const handleVerification = () => {
    const expectedCode = "687532"; // value should be the generated otp
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

  // axios stuff update password
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
      handleSendCode();
    } else if (currentStepIndex === 1) {
      handleVerification();
    } else {
      handleSubmitNewPassword();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent backgroundColor="primary.1" marginX={4} padding={8}>
        <ModalHeader textAlign="center">
          <Heading fontSize="2xl" variant="white">
            Forgot Password?
          </Heading>
        </ModalHeader>
        <ModalCloseButton color="white" />
        <Form onSubmit={handleSubmit}>
          <Flex flexDirection="column" gap={8}>
            {step}
            <Center>
              <Button
                onClick={() => {}}
                type="submit"
                variant="primary"
                width={["50%"]}
              >
                {isFirstStep
                  ? "NEXT"
                  : currentStepIndex === 1
                  ? "VERIFY"
                  : "SUBMIT"}
              </Button>
            </Center>
          </Flex>
        </Form>
      </ModalContent>
    </Modal>
  );
};

export default ForgotPassword;
