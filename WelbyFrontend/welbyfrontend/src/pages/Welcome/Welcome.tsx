import { Flex, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import MainFooter from '../../components/Main/Footer';
import MainFormButton from '../../components/Main/FormButton';
import MainFormCard from '../../components/Main/FormCard';
import MainHeader from '../../components/Main/Header';
import MainLayout from '../../components/Main/Layout';

const Welcome = () => {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate('signup');
    };
    const handleLoginClick = () => {
        navigate('login');
    };

    return (
        <MainLayout>
            <MainHeader />
            <MainFormCard w={['100%', '75%', '50%']}>
                <Flex flexDirection="column" p="16">
                    <Heading
                        as="h1"
                        fontFamily="Montserrat"
                        fontWeight="700"
                        mb="10"
                        color="#ffffff"
                    >
                        <Text align="center">Welcome to your happy portal</Text>
                    </Heading>
                    <MainFormButton onClickEvent={handleSignUpClick}>
                        Sign Up
                    </MainFormButton>
                    <MainFormButton onClickEvent={handleLoginClick}>
                        Log In
                    </MainFormButton>
                </Flex>
            </MainFormCard>
            <MainFooter />
        </MainLayout>
    );
};

export default Welcome;
