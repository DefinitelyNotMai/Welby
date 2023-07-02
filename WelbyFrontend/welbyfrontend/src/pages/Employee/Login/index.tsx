import { Center, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import MainLayout from '../../../components/Main/Layout';
import MainHeader from '../../../components/Main/Header';
import MainFooter from '../../../components/Main/Footer';
import MainFormCard from '../../../components/Main/FormCard';
import MainFormTextbox from '../../../components/Main/FormTextbox';
import MainFormButton from '../../../components/Main/FormButton';
import axios from 'axios';

const Login = () => {
    const { userId, setUserId } = useUserContext();
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');

    // navigate
    const navigate = useNavigate();

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        const tokenUrl = 'http://localhost:58258/token';
        let header = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*"
        };


        const formData = new URLSearchParams();
        formData.append('grant_type', 'password');
        formData.append('username', UserName);
        formData.append('password', Password);

        try {
            const tokenResponse = await fetch(tokenUrl, {
                method: 'POST',
                headers: header,
                body: formData
            }).then(res => {
                return res.json();
            });
            if (tokenResponse != null) {
                var token = tokenResponse.access_token;
                var loginUrl = 'http://localhost:58258/api/GetSystemUsers';
                var result = null;
                let param = {
                    "UserId": 0, // Identity Key
                    "UserCode": "", // FK from referencing from Registration table
                    "UserName": UserName,// Username
                    "Password": Password,
                    "CurrentOTP": null,
                    "PageNo": 0,
                    "PageSize": 0,
                    "Active": true
                }
                axios.get(loginUrl, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                    params: param
                }).then(response => {
                    result = response.data;
                    if (result != null) {
                        if (result.length > 0) {
                            navigate('/employee/dashboard'); // For Navigating into the Dashboard Page
                        }
                    }
                });
            }


            //if (tokenResponse.ok) {
            //  // Handle successful API tokenResponse
            //    let json = tokenResponse;
            //  console.log('Login successful');
            //} else {
            //  // Handle API error
            //  console.error('Login failed');
            //}
        } catch (error) {
            // Handle network or other error
            console.error('An error occurred:', error);
        }
    };

    const temporaryHandleLogin = async () => {
        const loginUrl = 'https://localhost:44373/api/GetAllEmployees';
        var result = null;
        let param = {
            "Email": UserName,// Username
            "Phone_Number": Password,
        }

        try {
            axios.get(loginUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                params: param
            }).then(response => {
                result = response.data;
                if (result != null) {
                    if (result.length > 0) {
                        //console.log(result);
                        const id = result[0].EmployeeId
                        setUserId(id);
                        navigate('/employee/dashboard'); // For Navigating into the Dashboard Page
                    }
                }
            });
        } catch (error) {
            console.error('An error occurred:', error);
        }

    };

    return (
        <MainLayout>
            <MainHeader />
            <MainFormCard w={["100%", "75%", "50%"]}>
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
                            onClickEvent={temporaryHandleLogin}
                        >
                            Submit
                        </MainFormButton>
                    </Center>
                </Flex>
            </MainFormCard>
            <MainFooter />
        </MainLayout>
    );
};

export default Login;
