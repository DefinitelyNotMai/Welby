import { Center, Heading, Link, Text } from '@chakra-ui/react';
import MainLayout from '../../components/MainLayout';
import MainHeader from '../../components/MainHeader';
import MainFooter from '../../components/MainFooter';
import MainFormCard from '../../components/MainFormCard';
import MainFormTextbox from '../../components/MainFormTextbox';
import MainFormButton from '../../components/MainFormButton';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    const apiUrl = 'your-api-url';

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Handle successful API response
        console.log('Login successful');
      } else {
        // Handle API error
        console.error('Login failed');
      }
    } catch (error) {
      // Handle network or other error
      console.error('An error occurred:', error);
    }
  };

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
                    <MainFormTextbox
                        placeholder="Email Address"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <MainFormTextbox
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
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
                        <MainFormButton
                            width={['70%', '50%', '50%']}
                            onClickEvent={handleLogin}
                        >
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
