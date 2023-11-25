import { FormEvent, useState, useEffect, useContext } from "react";
import { useMultiStepForm } from "../../hooks/useMultiStepForm";
import { Step1 } from "./Step1";
import { WelcomeLayout } from "../../layout/WelcomeLayout";
import { Button, Card, Flex } from "@chakra-ui/react";
import { Form, useNavigate } from "react-router-dom";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import Step4 from "./Step4";
import { Step5 } from "./Step5";
import { Step6 } from "./Step6";
import { fetchData } from "../../api/fetchData";
import { signUpEmployee } from "../../api/signUpEmployee";
import { UserContext } from "../../context/UserContext";
import { EMPLOYEESIGNUP_DATA, EmployeeSignup } from "../../data/employeeSignup";

export const EmployeeSignUpPage = () => {
  document.title = "Employee Sign Up | Welby";

  const userContext = useContext(UserContext);

  const [employeeData, setEmployeeData] = useState<EmployeeSignup>({
    ...EMPLOYEESIGNUP_DATA,
    Email: userContext.email,
  });

  const navigate = useNavigate();

  const updateEmployeeFields = (fields: Partial<EmployeeSignup>) => {
    setEmployeeData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const userId = localStorage.getItem("userId") || 0;

  useEffect(() => {
    const employeeUrl = "https://localhost:44373/api/GetEmployee";

    const fetchAndSetEmployee = async () => {
      try {
        //console.log(userId); // NOTE: this works
        const data = await fetchData(employeeUrl, { EmployeeId: userId });
        //console.log(data); // NOTE: this works
        setEmployeeData(data);
        //console.log(dumdum);
        //setEmployeeData(data);
        //console.log(employeeData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAndSetEmployee();
    //console.log(employeeData);
  }, [userId]);
  //console.log(dumdum);

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
