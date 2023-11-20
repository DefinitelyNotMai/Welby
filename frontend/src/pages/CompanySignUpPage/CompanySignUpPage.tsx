// lib
import { Form, useNavigate } from "react-router-dom";
import { FormEvent, useContext, useState } from "react";

// local
import {
  COMPANY_ADMIN_INITIAL_DATA,
  COMPANY_INITIAL_DATA,
} from "../../data/initForm";
import { Button, Card, Flex, Grid } from "@chakra-ui/react";
import { CompanyAdminFormData, CompanyFormData } from "../../data/typesForm";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { Step5 } from "./Step5";
import { Step6 } from "./Step6";
import { Step7 } from "./Step7";
import { Step8 } from "./Step8";
import { UserContext } from "../../context/UserContext";
import { WelcomeLayout } from "../../layout/WelcomeLayout";
import { signUpCompany } from "../../api/signUpCompany";
import { signUpCompanyAdmin } from "../../api/signUpCompanyAdmin";
import { useMultiStepForm } from "../../hooks/useMultiStepForm";

export const CompanySignUpPage = () => {
  document.title = "Sign Up | Welby";

  const [companyData, setCompanyData] =
    useState<CompanyFormData>(COMPANY_INITIAL_DATA);
  const [companyAdminData, setCompanyAdminData] =
    useState<CompanyAdminFormData>(COMPANY_ADMIN_INITIAL_DATA);

  const { companyId, setCompanyId } = useContext(UserContext);

  const navigate = useNavigate();

  const updateCompanyFields = (fields: Partial<CompanyFormData>) => {
    setCompanyData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const updateCompanyAdminFields = (fields: Partial<CompanyAdminFormData>) => {
    setCompanyAdminData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const handleCompanySignUp = async () => {
    await signUpCompany(companyData, companyId, setCompanyId);
    nextStep();
  };

  const handleCompanyAdminSignUp = async () => {
    await signUpCompanyAdmin(companyAdminData, companyData, companyId);
    nextStep();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLastStep) {
      navigate("/login");
    } else if (currentStepIndex === 3) {
      handleCompanySignUp();
    } else if (currentStepIndex === steps.length - 2) {
      handleCompanyAdminSignUp();
    } else {
      nextStep();
    }
  };

  const {
    currentStepIndex,
    step,
    steps,
    isFirstStep,
    isLastStep,
    prevStep,
    nextStep,
  } = useMultiStepForm([
    <Step1 key={1} {...companyData} updateFields={updateCompanyFields} />,
    <Step2 key={2} {...companyData} updateFields={updateCompanyFields} />,
    <Step3 key={3} {...companyData} updateFields={updateCompanyFields} />,
    <Step4 key={4} {...companyData} updateFields={updateCompanyFields} />,
    <Step5 key={5} {...companyData} />,
    <Step6
      key={6}
      {...companyData}
      {...companyAdminData}
      updateFields={updateCompanyAdminFields}
    />,
    <Step7
      key={7}
      {...companyAdminData}
      updateFields={updateCompanyAdminFields}
    />,
    <Step8 key={8} {...companyAdminData} />,
  ]);

  return (
    <WelcomeLayout>
      <Card variant="welcome" width={["90%", "75%", "60%"]}>
        <Form onSubmit={handleSubmit}>
          {step}
          {isFirstStep || currentStepIndex === 5 ? (
            <Grid templateColumns={["1fr", "1fr", "1fr 2fr"]}>
              <Flex
                backgroundColor={currentStepIndex === 5 ? "#24a2f0" : "#ffffff"}
                borderBottomLeftRadius="xl"
                flexDirection="row"
              />
              <Flex
                flexDirection="row"
                justifyContent="flex-end"
                marginRight={8}
                marginBottom={8}
              >
                <Button type="submit" width={["50%", "25%"]}>
                  NEXT
                </Button>
              </Flex>
            </Grid>
          ) : currentStepIndex === 4 ? (
            <Flex
              flexDirection="row"
              gap={4}
              justifyContent="space-evenly"
              marginX={8}
              marginBottom={8}
            >
              <Button type="submit" variant="submit">
                Proceed to Admin Sign Up
              </Button>
            </Flex>
          ) : isLastStep ? (
            <Flex
              flexDirection="row"
              gap={4}
              justifyContent="space-evenly"
              marginX={8}
              marginBottom={8}
            >
              <Button type="submit" variant="submit" width={["75%", "25%"]}>
                Proceed to Login
              </Button>
            </Flex>
          ) : (
            <Flex
              flexDirection="row"
              gap={4}
              justifyContent="space-evenly"
              marginX={8}
              marginBottom={8}
            >
              {currentStepIndex !== 4 && !isFirstStep && (
                <Button onClick={prevStep} width={["50%", "25%"]}>
                  BACK
                </Button>
              )}
              <Button
                type="submit"
                variant={
                  currentStepIndex === 3 || currentStepIndex === 6
                    ? "submit"
                    : "primary"
                }
                width={
                  currentStepIndex === 4 ? ["100%", "25%"] : ["50%", "25%"]
                }
              >
                {currentStepIndex === 3 || currentStepIndex === 6
                  ? "SUBMIT"
                  : "NEXT"}
              </Button>
            </Flex>
          )}
        </Form>
      </Card>
    </WelcomeLayout>
  );
};
