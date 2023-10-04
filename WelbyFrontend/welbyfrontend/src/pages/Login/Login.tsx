import { Center, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import MainLayout from '../../components/Main/Layout';
import MainHeader from '../../components/Main/Header';
import MainFooter from '../../components/Main/Footer';
import MainFormCard from '../../components/Main/FormCard';
import MainFormTextbox from '../../components/Main/FormTextbox';
import MainFormButton from '../../components/Main/FormButton';
import axios from 'axios';
import bcrypt from 'bcryptjs'

const Login = () => {
    // navigate
    const navigate = useNavigate();

    const { userId, setUserId } = useUserContext();
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const adminUserName = "Venancio";
    const adminUserPassword = "Jones";

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleFirstLogIn = () => {
        const getSystemUserUrl = 'https://localhost:44373/api/GetEmployee'
        let param = {
            "Email": UserName
        }

        const systemUser = axios
            .get(getSystemUserUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                params: param,
            })
            .then((response) => {
                var result = response.data;
                if (result != null) {
                    if (result.length > 0) {
                        if (result[0].FirstLogIn) {

                        }
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
    }

    const handleLogin = async () => {
        const tokenUrl = 'http://localhost:58258/token';
        let header = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*',
        };

        const formData = new URLSearchParams();
        formData.append('grant_type', 'password');
        formData.append('username', adminUserName);
        formData.append('password', adminUserPassword);

        try {

            const tokenResponse = await fetch(tokenUrl, {
                method: 'POST',
                headers: header,
                body: formData,
            }).then((res) => {
                return res.json();
            });
            if (tokenResponse != null) {
                var token = tokenResponse.access_token;
                var loginUrl = 'http://localhost:58258/api/GetSystemUsers';
                var result = null;

                let param = {
                    "UserName": UserName,// Username
                    "Active": true
                };
                axios
                    .get(loginUrl, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        params: param,
                    })
                    .then((response) => {
                        result = response.data;
                        if (result != null) {
                            if (result.length > 0) {
                                const storedPassword = result[0].Password; // Use the same salt rounds used during registration
                                setUserId(result[0].UserCode);

                                bcrypt.compare(Password, storedPassword, (err, result) => {
                                    if (err) {
                                        // Handle error
                                        alert(err)
                                        console.log(err)
                                    } else if (result === true) {
                                        // Passwords match; login is successful
                                        //alert("PasswordMatch")
                                        navigate('/dashboard', { state: userId});
                                    } else {
                                        // Passwords do not match; login failed
                                        alert("WrongPassword")
                                    }
                                });
                            }
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
            }



        } catch (error) {
            // Handle network or other error
            console.error('An error occurred:', error);
        }
    };


    const tempLogin = () => {
        navigate('/dashboard');
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
                        mb="5"
                        color="#ffffff"
                    >
                        <Text align="center">Welcome to your happy portal</Text>
                    </Heading>
                    <MainFormTextbox
                        placeholder="Email Address"
                        value={UserName}
                        onChange={handleUserNameChange}
                    />
                    <MainFormTextbox
                        placeholder="Password"
                        type="password"
                        value={Password}
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
                            Login
                        </MainFormButton>
                    </Center>
                </Flex>
            </MainFormCard>
            <MainFooter />
        </MainLayout>
    );
};

export default Login;
