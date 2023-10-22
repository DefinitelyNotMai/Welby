import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
import useMultiStepForm from "../../../hooks/useMultiStepForm";
import CustomButton from "../../CustomButton";
import CustomText from "../../CustomText";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import Step8 from "./Step8";

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

const QuarterlyAssessment = ({ isOpen, onClose }: QuarterlyAssessmentProps) => {
  const [QuarterlyAssessmentData, setQuarterlyAssessmentData] = useState(
    QUARTERLY_ASSESSMENT_INITIAL_DATA,
  );

  function updateQuarterlyAssessmentFields(
    fields: Partial<QuarterlyAssessmentFormData>,
  ) {
    setQuarterlyAssessmentData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const {
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    prevStep,
    nextStep,
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

  //const handleSubmit = () => { };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent minWidth="50%">
        <ModalHeader>
          <Flex flexDirection="column" gap={4}>
            <Box fontSize="2xl">
              <CustomText color="#24a2f0" fontWeight="semibold">
                Welby Workplace Assessment
              </CustomText>
            </Box>
            <Box fontSize="md">
              <CustomText color="#000000">
                We want to know whether your basic psychological needs in the
                workplace are fulfilled.
                <br />
                Kindly indicate how true each statement is for you.
              </CustomText>
            </Box>
            <Progress
              backgroundColor="#d9d9d9"
              borderRadius="0.5em"
              color="#24a2f0"
              max={steps.length}
              value={currentStepIndex + 1}
            />
          </Flex>
        </ModalHeader>
        <ModalBody>{step}</ModalBody>
        <ModalFooter>
          {isFirstStep ? (
            <CustomButton
              backgroundColor="#bcbcbc"
              onClick={onClose}
              type="button"
            >
              Cancel
            </CustomButton>
          ) : (
            <CustomButton
              backgroundColor="#bcbcbc"
              onClick={prevStep}
              type="button"
            >
              Previous
            </CustomButton>
          )}
          <Spacer />
          <CustomButton
            onClick={isLastStep ? onClose : nextStep} // change onClose to handleSubmit when calls are added
            type="button"
          >
            {isLastStep ? "Submit" : "Next"}
          </CustomButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default QuarterlyAssessment;
