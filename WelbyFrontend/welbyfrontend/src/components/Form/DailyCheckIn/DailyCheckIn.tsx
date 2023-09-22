import {
    Flex,
    Box,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Icon,
} from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useMultistepForm } from '../../../hooks/useMultistepForm';

import CustomButton from '../../Button';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

type DailyCheckInFormData = {
    EnergyAtWork: number;
    FocusAtWork: number;
    PositiveEmotions: number;
    NegativeEmotions: number;
};

const DAILY_CHECKIN_INITIAL_DATA = {
    EnergyAtWork: 0,
    FocusAtWork: 0,
    PositiveEmotions: 0,
    NegativeEmotions: 0,
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
    } = useMultistepForm([
        <Step1 {...DailyCheckInData} updateFields={updateDailyCheckInFields} />,
        <Step2 {...DailyCheckInData} updateFields={updateDailyCheckInFields} />,
        <Step3 {...DailyCheckInData} updateFields={updateDailyCheckInFields} />,
        <Step4 {...DailyCheckInData} updateFields={updateDailyCheckInFields} />,
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
                <ModalContent minW="35%">
                    <ModalHeader>
                        <Flex flexDirection="row" alignItems="center">
                            <Spacer />
                            {steps.map((step, index) => (
                                <Box
                                    key={index}
                                    boxSize="4"
                                    borderRadius="full"
                                    bg={currentStepIndex === index ? '#24a2f0' : '#d9d9d9'}
                                    cursor="pointer"
                                    ml="4"
                                    onClick={() => setCurrentStepIndex(index)}
                                />
                            ))}
                            <Spacer />
                            <Icon as={AiOutlineInfoCircle} color="#24a2f0" boxSize="8" />
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

export default DailyCheckIn;
