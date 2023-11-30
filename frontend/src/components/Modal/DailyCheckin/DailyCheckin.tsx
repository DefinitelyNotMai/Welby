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
import { FormEvent, useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { fetchData } from "../../../api/fetchData";

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

  function getSimpleDate(): string {
    const today: Date = new Date();
    const year: number = today.getFullYear();
    const month: number = today.getMonth() + 1; // Months are zero-based, so we add 1
    const day: number = today.getDate();

    // Pad single-digit month/day with leading zero
    const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
    const formattedDay: string = day < 10 ? `0${day}` : `${day}`;

    return `${year}-${formattedMonth}-${formattedDay}`;
}

const simpleDate: string = getSimpleDate();

function getDateToday(): Date {
  const today: Date = new Date();
  const year: number = today.getFullYear();
  const month: number = today.getMonth(); // Months are zero-based, so no need to add 1
  const day: number = today.getDate();

  return new Date(year, month, day);
}

const dateToday: Date = getDateToday();

  const userContext = useContext(UserContext);
  // NOTE: this is where api call for submitting daily check in should be done
  const handleDailyCheckInSubmit = async () => {
    const dailyCheckInUrl = "https://localhost:44373/api/AddDailyCheckIn";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const dailyCheckin = {
      EmployeeId: localStorage.getItem("userId"),
      CompanyId: userContext.companyId,
      EnergyAtWork_int: dailyCheckinData.EnergyAtWork.int,
      EnergyAtWork_value: dailyCheckinData.EnergyAtWork.value,
      FocusAtWork_int: dailyCheckinData.FocusAtWork.int,
      FocusAtWork_value: dailyCheckinData.FocusAtWork.value,
      PositiveEmotions_int: dailyCheckinData.PositiveEmotions.int,
      PositiveEmotions_value: dailyCheckinData.PositiveEmotions.value,
      NegativeEmotions_int: dailyCheckinData.NegativeEmotions.int,
      NegativeEmotions_value: dailyCheckinData.PositiveEmotions.value,
      Productivity: 0,
      Active: true,
    };
    const getDailyCheckin = await axios
      .post(dailyCheckInUrl, dailyCheckin, config)
      .then((response) => {
        console.log(response.data);
        const result = response.data;
        return result;
      })
      .catch((error) => {
        console.log(error);
      });

      if (getDailyCheckin != null) {
        const getDailyCheckinIdUrl = "https://localhost:44373/api/GetAllDailyCheckIn";
        try {
          const getDailyCheckin = await fetchData(getDailyCheckinIdUrl, {
            EmployeeId: localStorage.getItem("userId"),
            CompanyId: userContext.companyId,
            DateTo:  simpleDate,
            DateFrom:  simpleDate,
            Active: true,
          });
          if (getDailyCheckin) {
            console.log(getDailyCheckin)
            localStorage.setItem("dailyCheckinId", getDailyCheckin[0].DailyCheckInId);
          }
        } catch(error) {
          console.log(error);
        }
      }

    // if successful statement here:
    //console.log(dailyCheckinData);
    const trybool = true;

    // NOTE: use this to store dailyCheckinId so it will persist through refreshes
    // This will be cleared on logout

    //localStorage.setItem("dailyCheckinId", response.data[0].DailyCheckInId); // this is for setting the id

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
