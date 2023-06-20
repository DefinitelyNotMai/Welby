import { Center, Heading, Link, Text } from '@chakra-ui/react';
import MainLayout from '../../components/MainLayout';
import MainHeader from '../../components/MainHeader';
import MainFooter from '../../components/MainFooter';
import MainFormCard from '../../components/MainFormCard';
import MainFormTextbox from '../../components/MainFormTextbox';
import MainFormButton from '../../components/MainFormButton';

const Login = () => {
  return (
    <MainLayout>
      <MainHeader />
      <Center m="auto">
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
          <MainFormTextbox placeholder="Email Address" />
          <MainFormTextbox placeholder="Password" type="password" />
          <Link
            fontFamily="Montserrat"
            fontWeight="300"
            color="#ffffff"
            ml="3"
            mb="5"
            maxW="8.5rem"
            display="inline-block"
          >
            <Text as="u">Forgot Password</Text>
          </Link>
          <Center>
            <MainFormButton width={['70%', '50%', '50%']}>
              Submit
            </MainFormButton>
          </Center>
        </MainFormCard>
      </Center>
      <MainFooter />
    </MainLayout>
  );
};

export default Login;
