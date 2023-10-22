import {
  Box,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Form } from "react-router-dom";

import useMultiStepForm from "../../../hooks/useMultiStepForm";
import CustomButton from "../../CustomButton";
import CustomText from "../../CustomText";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

type DailyCheckInFormData = {
  EnergyAtWork: number;
  FocusAtWork: number;
  PositiveEmotions: number;
  NegativeEmotions: number;
};

const DAILY_CHECKIN_INITIAL_DATA = {
  EnergyAtWork: 1,
  FocusAtWork: 1,
  PositiveEmotions: 1,
  NegativeEmotions: 1,
};

type ModalDailyCheckInProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DailyCheckIn = ({ isOpen, onClose }: ModalDailyCheckInProps) => {
  const [DailyCheckInData, setDailyCheckInData] = useState(
    DAILY_CHECKIN_INITIAL_DATA,
  );

  function updateDailyCheckInFields(fields: Partial<DailyCheckInFormData>) {
    setDailyCheckInData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const {
    steps,
    currentStepIndex,
    setCurrentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    prevStep,
    nextStep,
  } = useMultiStepForm([
    <Step1
      key={1}
      {...DailyCheckInData}
      updateFields={updateDailyCheckInFields}
    />,
    <Step2
      key={2}
      {...DailyCheckInData}
      updateFields={updateDailyCheckInFields}
    />,
    <Step3
      key={3}
      {...DailyCheckInData}
      updateFields={updateDailyCheckInFields}
    />,
    <Step4
      key={4}
      {...DailyCheckInData}
      updateFields={updateDailyCheckInFields}
    />,
  ]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isLastStep) {
      nextStep();
    } else {
      console.log(DailyCheckInData);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent minWidth="35%">
        <ModalHeader>
          <Flex alignItems="center" flexDirection="row">
            <Spacer />
            {steps.map((step, index) => (
              <Box
                key={index}
                boxSize={4}
                borderRadius="full"
                backgroundColor={
                  currentStepIndex === index ? "#24a2f0" : "#d9d9d9"
                }
                cursor="pointer"
                marginLeft={4}
                onClick={() => setCurrentStepIndex(index)}
              />
            ))}
            <Spacer />
            <Icon as={AiOutlineInfoCircle} boxSize={8} color="#24a2f0" />
          </Flex>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody>{step}</ModalBody>
          <ModalFooter>
            <Flex flexDirection="row" gap={40} width="full">
              <CustomButton
                backgroundColor="#bcbcbc"
                onClick={isFirstStep ? onClose : prevStep}
                type="button"
              >
                <CustomText color="#ffffff">
                  {isFirstStep ? "Cancel" : "Previous"}
                </CustomText>
              </CustomButton>
              <CustomButton onClick={() => {}} type="submit">
                <CustomText color="#ffffff">
                  {isLastStep ? "Submit" : "Next"}
                </CustomText>
              </CustomButton>
            </Flex>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  );
};

export default DailyCheckIn;
