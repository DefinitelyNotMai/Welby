// lib
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";

// local
import { DAILY_CHECKIN_INITIAL_DATA } from "../../../data/initForm";
import { DailyCheckInFormData } from "../../../data/typesForm";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { useMultiStepForm } from "../../../hooks/useMultiStepForm";
import { Step4 } from "./Step4";
import { Form } from "react-router-dom";
import axios from "axios";

type DailyCheckinProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const DailyCheckin = ({ isOpen, onClose }: DailyCheckinProps) => {
  const [dailyCheckinData, setDailyCheckinData] =
    useState<DailyCheckInFormData>(DAILY_CHECKIN_INITIAL_DATA);

  const updateDailyCheckInFields = (fields: Partial<DailyCheckInFormData>) => {
    setDailyCheckinData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const toast = useToast();

  const {
    currentStepIndex,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
    setCurrentStepIndex,
    step,
    steps,
  } = useMultiStepForm([
    <Step1
      {...dailyCheckinData}
      key={1}
      updateFields={updateDailyCheckInFields}
    />,
    <Step2
      {...dailyCheckinData}
      key={2}
      updateFields={updateDailyCheckInFields}
    />,
    <Step3
      {...dailyCheckinData}
      key={3}
      updateFields={updateDailyCheckInFields}
    />,
    <Step4
      {...dailyCheckinData}
      key={4}
      updateFields={updateDailyCheckInFields}
    />,
  ]);

  // NOTE: this is where api call for submitting daily check in should be done
  const handleDailyCheckInSubmit = () => {
    const dailyCheckInUrl = "https://localhost:44373/api/AddDailyCheckIn";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    try {
      const dailyCheckin = {
        "EmployeeId": dailyCheckinData.EmployeeId,
        "CompanyId": dailyCheckinData.CompanyId,
        "EnergyAtWork_int": dailyCheckinData.EnergyAtWork.int,
        "EnergyAtWork_value": dailyCheckinData.EnergyAtWork.value,
        "FocusAtWork_int": dailyCheckinData.FocusAtWork.int,
        "FocusAtWork_value": dailyCheckinData.FocusAtWork.value,
        "PositiveEmotions_int": dailyCheckinData.PositiveEmotions.int,
        "PositiveEmotions_value": dailyCheckinData.PositiveEmotions.value,
        "NegativeEmotions_int": dailyCheckinData.NegativeEmotions.int, 
        "NegativeEmotions_value": dailyCheckinData.PositiveEmotions.value,
        "Completion": "Partial",
        "Productivity": 0,
        "Active": true
      }
      const addDailyCheckin = await axios
        .post(dailyCheckInUrl, dailyCheckin, config)
        .then((response) => {
          console.log(response);
          return response.data[0]
        }).catch((error) => {console.log(error)});
  
        if (addDailyCheckin) {
          const getDailyCheckinUrl = "https://localhost:44373/api/GetDailyCheckIn";
          axios
          .get(getDailyCheckinUrl, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            params: {
              "DateFrom": new Date(),
              "EmployeeId": dailyCheckinData.EmployeeId
            },
          }).then((response) => {
            const result = response.data;
            if (result && result.length > 0) {
              localStorage.setItem("dailyCheckinId", result[0].DailyCheckInId); // this is for setting the id
            }
          }).catch((error) => {console.log(error)});
        } 

    } catch (error) {
      console.log(error)
    }
    
      
    // if successful statement here:
    console.log(dailyCheckinData);
    const trybool = true;

    // NOTE: use this to store dailyCheckinId so it will persist through refreshes
    // This will be cleared on logout

    //localStorage.setItem("dailyCheckinId", result[0].dailyCheckinId); // this is for setting the id

    if (trybool) {
      toast({
        title: "SUCCESS",
        description: "Your daily check-in is complete. Good Job!",
        status: "success",
        isClosable: true,
        duration: 5000,
        position: "top",
      });
      onClose();
    } else {
      toast({
        title: "ERROR",
        description:
          "Your daily check-in is unsuccessful. Please try submitting again.",
        status: "error",
        isClosable: true,
        duration: 5000,
        position: "top",
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLastStep) {
      handleDailyCheckInSubmit();
    } else {
      nextStep();
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
      <ModalContent backgroundColor="#ffffff" minWidth="35%">
        <ModalHeader>
          <Flex flexDirection="row" gap={4} justifyContent="center">
            {steps.map((step, index) => (
              <Box
                key={index}
                boxSize={4}
                borderRadius="full"
                backgroundColor={
                  currentStepIndex === index ? "#24a2f0" : "#d9d9d9"
                }
                cursor="pointer"
                onClick={() => setCurrentStepIndex(index)}
              />
            ))}
          </Flex>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody>{step}</ModalBody>
          <ModalFooter>
            <Flex justifyContent="space-between" width="full">
              <Button
                backgroundColor="#bcbcbc"
                color="#ffffff"
                onClick={isFirstStep ? onClose : prevStep}
                width="25%"
              >
                {isFirstStep ? "Cancel" : "Previous"}
              </Button>
              <Button type="submit" width="25%">
                {isLastStep ? "Submit" : "Next"}
              </Button>
            </Flex>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  );
};
