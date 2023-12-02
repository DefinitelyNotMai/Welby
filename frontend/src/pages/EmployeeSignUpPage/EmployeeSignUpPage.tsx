// lib
import { Button, Card, Flex } from "@chakra-ui/react";
import { Form, useNavigate } from "react-router-dom";
import { FormEvent, useState, useEffect, useContext } from "react";

// local
import Step4 from "./Step4";
import { EMPLOYEESIGNUP_DATA, EmployeeSignup } from "../../data/employeeSignup";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step5 } from "./Step5";
import { Step6 } from "./Step6";
import { UserContext } from "../../context/UserContext";
import { WelcomeLayout } from "../../layout/WelcomeLayout";
import { fetchData } from "../../api/fetchData";
import { signUpEmployee } from "../../api/signUpEmployee";
import { useMultiStepForm } from "../../hooks/useMultiStepForm";

export const EmployeeSignUpPage = () => {
  document.title = "Employee Sign Up | Welby";

  const [employeeData, setEmployeeData] =
    useState<EmployeeSignup>(EMPLOYEESIGNUP_DATA);

  const navigate = useNavigate();

  const updateEmployeeFields = (fields: Partial<EmployeeSignup>) => {
    setEmployeeData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const userId = localStorage.getItem("userId") || 0;

  useEffect(() => {
    const employeeUrl = "https://localhost:44373/api/GetEmployees";

    const fetchAndSetEmployee = async () => {
      try {
        const data = await fetchData(employeeUrl, { EmployeeId: userId });
        setEmployeeData({ ...data[0], FirstLogIn: true });
      } catch (error) {
        console.log(error);
      }
    };
    fetchAndSetEmployee();
  }, [userId]);

  const {
    currentStepIndex,
    step,
    steps,
    isFirstStep,
    isLastStep,
    prevStep,
    nextStep,
  } = useMultiStepForm([
    <Step1 key={1} {...employeeData} updateFields={updateEmployeeFields} />,
    <Step2 key={2} {...employeeData} updateFields={updateEmployeeFields} />,
    <Step3 key={3} {...employeeData} updateFields={updateEmployeeFields} />,
    <Step4 key={4} {...employeeData} updateFields={updateEmployeeFields} />,
    <Step5 key={5} {...employeeData} updateFields={updateEmployeeFields} />,
    <Step6 key={6} {...employeeData} />,
  ]);

  // NOTE: This is where the api call for signing up employee should be done
  const handleEmployeeSignUp = () => {
    signUpEmployee(employeeData, userId);
    nextStep();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLastStep) {
      localStorage.clear();
      navigate("/login");
    } else if (currentStepIndex === steps.length - 2) {
      handleEmployeeSignUp();
    } else {
      nextStep();
    }
  };

  return (
    <WelcomeLayout>
      <Card variant="welcome" width={["90%", "75%", "50%"]}>
        <Form onSubmit={handleSubmit}>
          {step}
          {isFirstStep || isLastStep ? (
            <Flex
              flexDirection="row"
              justifyContent={isLastStep ? "center" : "flex-end"}
              marginRight={isLastStep ? 0 : 8}
              marginBottom={8}
            >
              <Button
                type="submit"
                variant={isLastStep ? "submit" : "primary"}
                width={["50%", "25%"]}
              >
                {isLastStep ? "Proceed to Login" : "NEXT"}
              </Button>
            </Flex>
          ) : (
            <Flex
              flexDirection="row"
              justifyContent="space-around"
              marginRight={8}
              marginBottom={8}
            >
              <Button onClick={prevStep} width={["50%", "25%"]}>
                BACK
              </Button>
              <Button
                variant={currentStepIndex === 4 ? "submit" : "primary"}
                type="submit"
                width={["50%", "25%"]}
              >
                {currentStepIndex === 4 ? "SUBMIT" : "NEXT"}
              </Button>
            </Flex>
          )}
        </Form>
      </Card>
    </WelcomeLayout>
  );
};
