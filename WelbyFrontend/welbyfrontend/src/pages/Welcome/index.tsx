import { Box, Center, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainFooter from '../../components/Main/Footer';
import MainFormButton from '../../components/Main/FormButton';
import MainFormCard from '../../components/Main/FormCard';
import MainHeader from '../../components/Main/Header';
import MainLayout from '../../components/Main/Layout';

const Welcome = () => {
    enum WelcomeStep {
        Initial,
        Login,
        SignUp,
    }

    const [step, setStep] = useState<WelcomeStep>(WelcomeStep.Initial);

    const handlePreviousStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const renderStep = () => {
        switch (step) {
            case WelcomeStep.Initial:
                return renderInitial();
            case WelcomeStep.SignUp:
                return renderSignUp();
            case WelcomeStep.Login:
                return renderLogin();
            default:
                return null;
        }
    };

    const navigate = useNavigate();

    const handleCompanySignUpClick = () => {
        navigate("company/signup");
    };
    const handleCompanyLoginClick = () => {
        navigate("company/login");
    };
    const handleEmployeeSignUpClick = () => {
        navigate("employee/signup");
    };
    const handleEmployeeLoginClick = () => {
        navigate("employee/login");
    };


    const renderInitial = () => {
        return (
            <MainLayout>
                <MainHeader />
                <MainFormCard>
                    <Heading
                        as="h1"
                        fontFamily="Montserrat"
                        fontWeight="700"
                        mb="5"
                        color="#ffffff"
                    >
                        <Text align="center">Welcome to your happy portal</Text>
                    </Heading>
                    <MainFormButton onClickEvent={() => setStep(WelcomeStep.SignUp)}>Sign Up</MainFormButton>
                    <MainFormButton onClickEvent={() => setStep(WelcomeStep.Login)}>Log In</MainFormButton>
                </MainFormCard>
                <MainFooter />
            </MainLayout>

        )
    }

    const renderSignUp = () => {
        return (
            <MainLayout>
                <MainHeader />
                <MainFormCard w="25%">
                    <Heading
                        as="h1"
                        fontFamily="Montserrat"
                        fontWeight="700"
                        mb="5"
                        color="#ffffff"
                    >
                        <Text align="center">Sign Up As:</Text>
                    </Heading>
                    <MainFormButton onClickEvent={handleCompanySignUpClick}>Company</MainFormButton>
                    <MainFormButton onClickEvent={handleEmployeeSignUpClick}>Employee</MainFormButton>
                </MainFormCard>
                <MainFooter />
            </MainLayout>
        )
    }

    const renderLogin = () => {
        return (
            <MainLayout>
                <MainHeader />
                <MainFormCard w="25%">
                    <Heading
                        as="h1"
                        fontFamily="Montserrat"
                        fontWeight="700"
                        mb="5"
                        color="#ffffff"
                    >
                        <Text align="center">Login As:</Text>
                    </Heading>
                    <MainFormButton onClickEvent={handleCompanyLoginClick}>Company</MainFormButton>
                    <MainFormButton onClickEvent={handleEmployeeLoginClick}>Employee</MainFormButton>
                </MainFormCard>
                <MainFooter />
            </MainLayout>
        )
    }

    return <Box>{renderStep()}</Box>
};

export default Welcome;