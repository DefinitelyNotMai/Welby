import {
    Flex,
    Modal,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spacer,
    ModalBody,
    ModalFooter,
    Progress,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useMultistepForm } from '../../../hooks/useMultistepForm';

import CustomButton from '../../Button';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';
import Step8 from './Step8';

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
        setCurrentStepIndex,
        step,
        isFirstStep,
        isLastStep,
        prevStep,
        nextStep,
    } = useMultistepForm([
        <Step1
            {...QuarterlyAssessmentData}
            updateFields={updateQuarterlyAssessmentFields}
        />,
        <Step2
            {...QuarterlyAssessmentData}
            updateFields={updateQuarterlyAssessmentFields}
        />,
        <Step3
            {...QuarterlyAssessmentData}
            updateFields={updateQuarterlyAssessmentFields}
        />,
        <Step4
            {...QuarterlyAssessmentData}
            updateFields={updateQuarterlyAssessmentFields}
        />,
        <Step5
            {...QuarterlyAssessmentData}
            updateFields={updateQuarterlyAssessmentFields}
        />,
        <Step6
            {...QuarterlyAssessmentData}
            updateFields={updateQuarterlyAssessmentFields}
        />,
        <Step7
            {...QuarterlyAssessmentData}
            updateFields={updateQuarterlyAssessmentFields}
        />,
        <Step8
            {...QuarterlyAssessmentData}
            updateFields={updateQuarterlyAssessmentFields}
        />,
    ]);

    const handleSubmit = () => { };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                closeOnEsc={false}
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent minW="50%">
                    <ModalHeader>
                        <Flex flexDirection="column">
                            <Text
                                color="#24a2f0"
                                fontFamily="Montserrat"
                                fontWeight="600"
                                fontSize="32"
                                mb="4"
                            >
                                Welby Workplace Assessment
                            </Text>
                            <Text
                                color="#000000"
                                fontFamily="Montserrat"
                                fontWeight="500"
                                fontSize="16"
                                mb="4"
                            >
                                We want to know whether your basic psychological needs in the
                                workplace are fulfilled.
                                <br />
                                Kindly indicate how true each statement is for you.
                            </Text>
                            <Progress
                                borderRadius="0.5em"
                                bg="#d9d9d9"
                                color="#24a2f0"
                                value={currentStepIndex + 1}
                                max={steps.length}
                            />
                        </Flex>
                    </ModalHeader>
                    <ModalBody>{step}</ModalBody>
                    <ModalFooter>
                        {isFirstStep ? (
                            <CustomButton bg="#bcbcbc" color="#ffffff" onClick={onClose}>
                                Cancel
                            </CustomButton>
                        ) : (
                            <CustomButton bg="#bcbcbc" color="#ffffff" onClick={prevStep}>
                                Previous
                            </CustomButton>
                        )}
                        <Spacer />
                        <CustomButton
                            color="#ffffff"
                            onClick={isLastStep ? onClose : nextStep} // change onClose to handleSubmit when calls are added
                        >
                            {isLastStep ? 'Submit' : 'Next'}
                        </CustomButton>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default QuarterlyAssessment;
