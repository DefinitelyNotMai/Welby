import { Flex } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { Form } from "react-router-dom";
import Card from "../../components/DataDisplay/Card";
import Button from "../../components/Form/Button";
import { EMPLOYEE_INITIAL_DATA } from "../../data/initForm";
import { EmployeeFormData } from "../../data/typesForm";
import useMultiStepForm from "../../hooks/useMultiStepForm";
import WelcomeLayout from "../../layout/WelcomeLayout";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";

const EmployeeSignUpPage = () => {
  const [employeeData, setEmployeeData] = useState<EmployeeFormData>(
    EMPLOYEE_INITIAL_DATA,
  );

  const updateEmployeeFields = (fields: Partial<EmployeeFormData>) => {
    setEmployeeData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  const {
    currentStepIndex,
    step,
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
    <Step6 key={5} {...employeeData} />,
  ]);

  return (
    <WelcomeLayout>
      <Card cardVariant="welcome" width={["90%", "75%", "60%"]}>
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
                buttonVariant={isLastStep ? "secondary" : "primary"}
                type="submit"
                width={["50%", "25%"]}
              >
                {isLastStep ? "Go to My Dashboard" : "NEXT"}
              </Button>
            </Flex>
          ) : (
            <Flex
              flexDirection="row"
              justifyContent="space-around"
              marginRight={8}
              marginBottom={8}
            >
              <Button
                buttonVariant="primary"
                onClick={() => prevStep()}
                type="button"
                width={["50%", "25%"]}
              >
                BACK
              </Button>
              <Button
                buttonVariant={currentStepIndex === 4 ? "secondary" : "primary"}
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

export default EmployeeSignUpPage;
