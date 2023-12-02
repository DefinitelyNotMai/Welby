import axios from "axios";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { FormEvent, useState, useContext } from "react";
import { useMultiStepForm } from "../../../hooks/useMultiStepForm";
import { Form } from "react-router-dom";
import Step1 from "./Step1";
import Step3 from "./Step3";
import Step2 from "./Step2";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import Step8 from "./Step8";
import { UserContext } from "../../../context/UserContext";

type QuarterlyAssessmentFormData = {
  SocialMutualism: number[];
  SenseOfBeingValued: number[];
  NurturedPsychologicalNeeds: number[];
  PositiveWorkRelationships: number[];
  SubjectiveWellBeing: number[];
  OrganizationalCommitment: number[];
  IntentToQuit: number[];
  Presenteeism: number[];
};

const QUARTERLY_ASSESSMENT_INITIAL_DATA = {
  SocialMutualism: [0, 0, 0, 0, 0, 0, 0],
  SenseOfBeingValued: [0, 0, 0, 0, 0, 0, 0],
  NurturedPsychologicalNeeds: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  PositiveWorkRelationships: [0, 0, 0, 0, 0],
  SubjectiveWellBeing: [0, 0, 0],
  OrganizationalCommitment: [0, 0, 0, 0],
  IntentToQuit: [0, 0, 0],
  Presenteeism: [0, 0, 0],
};

type QuarterlyAssessmentProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const QuarterlyAssessment = ({
  isOpen,
  onClose,
}: QuarterlyAssessmentProps) => {
  const [QuarterlyAssessmentData, setQuarterlyAssessmentData] = useState(
    QUARTERLY_ASSESSMENT_INITIAL_DATA,
  );

  const updateQuarterlyAssessmentFields = (
    fields: Partial<QuarterlyAssessmentFormData>,
  ) => {
    setQuarterlyAssessmentData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const userContext = useContext(UserContext);

  // NOTE: this is where api call for submitting daily check in should be done
  const handleQuarterlyAssessmentSubmit = () => {
    const calculateSum = (numbers: number[]): number => {
      return numbers.reduce((acc, num) => acc + num, 0);
    };

    const calculateMean = (numbers: number[]): number | null => {
      if (numbers.length === 0) {
        return null; // Return null for an empty array
      }
      const mean = calculateSum(numbers) / numbers.length;
      return mean;
    };

    const quarterlyAssesmentUrl = "https://localhost:44373/api/AddTise";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const tise = {
      EmployeeId: localStorage.getItem("userId"),
      CompanyId: userContext.companyId,
      Factor_1: calculateMean(QuarterlyAssessmentData.SocialMutualism),
      Factor_2: calculateMean(QuarterlyAssessmentData.SenseOfBeingValued),
      Factor_3: calculateMean(
        QuarterlyAssessmentData.NurturedPsychologicalNeeds,
      ),
      Factor_4: calculateMean(
        QuarterlyAssessmentData.PositiveWorkRelationships,
      ),
      Factor_5: calculateSum(QuarterlyAssessmentData.SubjectiveWellBeing),
      Factor_6: calculateSum(QuarterlyAssessmentData.OrganizationalCommitment),
      Factor_7: calculateSum(QuarterlyAssessmentData.IntentToQuit),
      Factor_8:
        QuarterlyAssessmentData.Presenteeism[1] -
        QuarterlyAssessmentData.Presenteeism[0],
      Encoded_by: localStorage.getItem("userId"),
    };
    axios
      .post(quarterlyAssesmentUrl, tise, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const {
    currentStepIndex,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
    step,
    steps,
  } = useMultiStepForm([
    <Step1
      key={1}
      {...QuarterlyAssessmentData}
      updateFields={updateQuarterlyAssessmentFields}
    />,
    <Step2
      key={2}
      {...QuarterlyAssessmentData}
      updateFields={updateQuarterlyAssessmentFields}
    />,
    <Step3
      key={3}
      {...QuarterlyAssessmentData}
      updateFields={updateQuarterlyAssessmentFields}
    />,
    <Step4
      key={4}
      {...QuarterlyAssessmentData}
      updateFields={updateQuarterlyAssessmentFields}
    />,
    <Step5
      key={5}
      {...QuarterlyAssessmentData}
      updateFields={updateQuarterlyAssessmentFields}
    />,
    <Step6
      key={6}
      {...QuarterlyAssessmentData}
      updateFields={updateQuarterlyAssessmentFields}
    />,
    <Step7
      key={7}
      {...QuarterlyAssessmentData}
      updateFields={updateQuarterlyAssessmentFields}
    />,
    <Step8
      key={8}
      {...QuarterlyAssessmentData}
      updateFields={updateQuarterlyAssessmentFields}
    />,
  ]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLastStep) {
      handleQuarterlyAssessmentSubmit();
    } else {
      nextStep();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent backgroundColor="#ffffff" minWidth="50%">
        <ModalHeader textAlign="left">
          <Flex flexDirection="column" gap={4}>
            <Text color="#24a2f0" fontSize="2.1875rem">
              Welby Workplace Assessment
            </Text>
            <Text color="#000000" fontSize="1rem">
              We want to know whether your basic psychological needs in the
              workplace are fulfilled.
              <br />
              Kindly indicate how true each statement is for you.
            </Text>
            <Progress
              backgroundColor="#d9d9d9"
              color="#24a2f0"
              borderRadius="0.5em"
              value={currentStepIndex + 1}
              max={steps.length}
            />
          </Flex>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody>{step}</ModalBody>
          <ModalFooter>
            <Button
              backgroundColor="#bcbcbc"
              color="#ffffff"
              onClick={isFirstStep ? onClose : prevStep}
              width="25%"
            >
              {isFirstStep ? "Cancel" : "Previous"}
            </Button>
            <Spacer />
            <Button type="submit" width="25%">
              {isLastStep ? "Submit" : "Next"}
            </Button>
          </ModalFooter>
        </Form>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};
