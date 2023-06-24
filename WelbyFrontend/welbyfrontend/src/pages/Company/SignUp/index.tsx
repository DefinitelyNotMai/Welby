import { Box, Icon, Flex, Grid, Heading, Text, Select, Center, Image } from "@chakra-ui/react";
import { FiPlus } from 'react-icons/fi';
import { useState } from "react";
import MainFooter from "../../../components/Main/Footer";
import MainFormButton from "../../../components/Main/FormButton";
import MainFormCard from "../../../components/Main/FormCard";
import CustomTextbox from "../../../components/Main/FormTextbox";
import MainHeader from "../../../components/Main/Header";
import MainLayout from "../../../components/Main/Layout";
import WelbyLogo from "../../../assets/images/welby.svg"

enum SignupStep {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
}

const SignUp = () => {
    const [step, setStep] = useState<SignupStep>(SignupStep.Step1);

    const handleNextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const handlePreviousStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const renderStep = () => {
        switch (step) {
            case SignupStep.Step1:
                return renderStep1();
            default:
                return null;
        }
    };

    const renderStep1 = () => {
        return (
            <>
                <Grid templateColumns={{ base: '1fr', md: '1.5fr 2fr' }} gap={0}>
                    <Box
                        bg="#ffffff"
                        h={{ base: '50vh', md: '70vh' }}
                        m="0"
                        borderLeftRadius="2xl"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Center>
                            <Image src={WelbyLogo} boxSize="32" />
                        </Center>
                    </Box>
                    <Box
                        bg="#24a2f0"
                        p={{ base: '8', md: '16' }}
                        borderRightRadius="2xl"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                    >
                        <Heading
                            fontFamily="Montserrat"
                            fontWeight="500"
                            color="#ffffff"
                        >
                            First of all, thank you for choosing Welby!
                        </Heading>
                        <Heading
                            fontFamily="Montserrat"
                            fontWeight="500"
                            color="#ffffff"
                            mb="5"
                        >
                            Let's start your <b>registration.</b>
                        </Heading>
                        <Box
                            color="#ffffff"
                            fontFamily="Montserrat"
                            fontWeight="500"
                        >
                        </Box>
                        <Box
                        >
                            <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Company Name</Text>
                            <CustomTextbox placeholder="Name" />
                        </Box>
                        <Box>
                            <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Company Email Address</Text>
                            <CustomTextbox placeholder="hello@email.com" />
                        </Box>
                        <Box
                        >
                            <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Set Password</Text>
                            <CustomTextbox placeholder="Set password" type="password" />
                        </Box>
                        <Box
                        >
                            <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Confirm Password</Text>
                            <CustomTextbox placeholder="Confirm password" type="password" />
                        </Box>
                        <MainFormButton
                            width={['100%', '50%', '25%']}
                            onClickEvent={handleNextStep}
                        >
                            Submit
                        </MainFormButton>
                    </Box>
                </Grid>
            </>
        );
    };

    return (
        <MainLayout>
            <MainHeader />
            <MainFormCard>
                {renderStep()}
            </MainFormCard>
            <MainFooter />
        </MainLayout>
    );
};

export default SignUp;