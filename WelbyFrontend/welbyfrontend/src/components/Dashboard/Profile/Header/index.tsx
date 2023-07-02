import { Avatar, Box, Flex, Link, Text, Icon } from "@chakra-ui/react";
import { FaLinkedin, FaFacebook, FaInstagram, FaChevronLeft } from 'react-icons/fa'
import { Link as RouterLink } from "react-router-dom";
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

type HeaderProps = {
    name: string;
    email: string;
    phone_number: string;
}

const Header = ({ name, email, phone_number }: HeaderProps) => {
    const { state } = useLocation();

    useEffect(() => {
        const fetchUserData = async () => {
            var userUrl = 'https://localhost:44373/api/GetEmployee';
            var result = null;
            let param = {
                "EmployeeId": state.employeeId
            }
            axios.get(userUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                params: param
            }).then(response => {
                result = response.data;
                //console.log(response.data)
                if (result != null) {
                    if (result.length > 0) {
                        console.log(result);
                        //result here is na employee object
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        };

        fetchUserData();
    }, []);
    

    return (
        <Box
            as="nav"
            bg="#24a2f0"
            py="4"
        >
            <Flex flexDirection="row" justifyContent="space-evenly" alignItems="center">
                <Flex flexDirection="row" alignItems="center">
                    <Link as={RouterLink} to="/employee/dashboard">
                        <Flex flexDirection="row" pr="4">
                            <Icon as={FaChevronLeft} color="#ffffff" h="1.5rem" w="1.5rem" mr="2" />
                            <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500" textDecoration="none">Back to Dashboard</Text>
                        </Flex>
                    </Link>
                    <Link>
                        <Avatar boxSize="32"></Avatar>
                    </Link>
                    <Flex flexDirection="column" justifyContent="center" ml="8" color="#ffffff">
                        <Text fontFamily="Playfair Display" fontWeight="400" fontSize="lg">Hi, I'm {name}!</Text>
                        <Box display="flex" flexDirection="column" fontFamily="Montserrat" fontWeight="400" fontSize="md">
                            {/*<div>ewan</div>*/}
                            <Text>{email}</Text>
                            <Text>{phone_number}</Text>
                        </Box>
                    </Flex>
                </Flex>
                <Flex flexDirection="row">
                    <Link mr="8">
                        <Icon as={FaLinkedin} color="#ffffff" viewBox="0 0 16 16" h="1.5rem" w="1.5rem"></Icon>
                    </Link>
                    <Link mr="8">
                        <Icon as={FaFacebook} color="#ffffff" viewBox="0 0 16 16" h="1.5rem" w="1.5rem"></Icon>
                    </Link>
                    <Link>
                        <Icon as={FaInstagram} color="#ffffff" viewBox="0 0 16 16" h="1.5rem" w="1.5rem"></Icon>
                    </Link>
                </Flex>
            </Flex>
        </Box>
    )
}

export default Header;