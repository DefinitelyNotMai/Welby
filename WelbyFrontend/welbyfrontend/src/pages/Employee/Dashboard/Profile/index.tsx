import { Divider, CardBody, Flex, Text, Box, Grid } from "@chakra-ui/react";
import ProfileCard from "../../../../components/Dashboard/Profile/Card";
import ProfileCardHeader from "../../../../components/Dashboard/Profile/CardHeader";
import Header from '../../../../components/Dashboard/Profile/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Profile = () => {
    const { state } = useLocation(); //employeeId
    const [weakness, setWeakness] = useState('');
    
    useEffect(() => {
        let unrealizedStrengths = []; //idk where to store.
        let realizedStrengths = [];
        let learnedBehaviors = [];
        let interests = [];


        // fetching: 
        const fetchUnrealizedStrengths = async () => {
            var unrealizedStrengthUrl = 'https://localhost:44373/api/GetEmployeeUnrealizedStrengths';
            var result = null;
            let param = {
                "EmployeeId": state.employeeId
            }
            axios.get(unrealizedStrengthUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                params: param
            }).then(response => {
                result = response.data;
                //console.log(response.data)
                if (result != null) {
                    if (result.length > 0) {
                        console.log(result);
                        for (let x = 0; x < result.length; x++) {
                            unrealizedStrengths.push(result[x].UnrealizedStrengthDisplay)
                            console.log("Unrealized Strength " + x + " " +result[x].UnrealizedStrengthDisplay);
                        }
                       
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        };

        const fetchRealizedStrengths = async () => {
            var realizedStrengthUrl = 'https://localhost:44373/api/GetEmployeeRealizedStrengths';
            var result = null;
            let param = {
                "EmployeeId": state.employeeId
            }
            axios.get(realizedStrengthUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                params: param
            }).then(response => {
                result = response.data;
                //console.log(response.data)
                if (result != null) {
                    if (result.length > 0) {
                        console.log(result);
                        for (let x = 0; x < result.length; x++) {
                            realizedStrengths.push(result[x].RealizedStrengthDisplay)
                            console.log("Realized Strength " + x + " " + result[x].RealizedStrengthDisplay);
                        }

                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        }

        const fetchLearnedBehaviors = async () => {
            var learnedBehaviorUrl = 'https://localhost:44373/api/GetEmployeeLearnedBehaviors';
            var result = null;
            let param = {
                "EmployeeId": state.employeeId
            }
            axios.get(learnedBehaviorUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                params: param
            }).then(response => {
                result = response.data;
                //console.log(response.data)
                if (result != null) {
                    if (result.length > 0) {
                        console.log(result);
                        for (let x = 0; x < result.length; x++) {
                            learnedBehaviors.push(result[x].LearnedBehaviorDisplay)
                            console.log("Learned Behavior " + x + " " + result[x].LearnedBehaviorDisplay);
                        }

                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        }

        const fetchInterests = async () => {
            var interestUrl = 'https://localhost:44373/api/GetEmployeeInterestList';
            var result = null;
            let param = {
                "EmployeeId": state.employeeId
            }
            axios.get(interestUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                params: param
            }).then(response => {
                result = response.data;
                //console.log(response.data)
                if (result != null) {
                    if (result.length > 0) {
                        console.log(result);
                        for (let x = 0; x < result.length; x++) {
                            interests.push(result[x].InterestNameDisplay)
                            console.log("Learned Behavior " + x + " " + result[x].InterestNameDisplay);
                        }

                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        }

        const fetchWeakness = async () => {
            var weaknessUrl = 'https://localhost:44373/api/GetEmployeeWeaknesses';
            var result = null;
            let param = {
                "EmployeeId": state.employeeId
            }

            axios.get(weaknessUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                params: param
            }).then(response => {
                result = response.data;
                if (result != null) {
                    if (result.length > 0) {
                        console.log(result);
                        setWeakness(result[0].WeaknessDisplay)
                    }
                }
            }).catch(function (error) {
                console.log(error)
            });
        }

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
                        let work = result[0].Work;
                        let connect = result[0].Connect;
                        let support = result[0].Support;

                        console.log(`Work: ${work} \nConnect: ${connect} \nSupport: ${support}`)
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        };
        

        if (state && state.employeeId) {
            fetchRealizedStrengths();
            fetchUnrealizedStrengths();
            fetchLearnedBehaviors();
            fetchInterests();
            fetchWeakness();
            fetchUserData();
        }
    }, [state]);


    return (
        <div>
            <Header />
            <ProfileCard>
                <ProfileCardHeader>Strengths</ProfileCardHeader>
                <Divider />
                <CardBody>
                    <Flex flexDirection="column">
                        <Grid templateColumns="1fr 2fr">
                            <Flex alignItems="center" justifyContent="center">
                                <Text fontFamily="Montserrat" fontWeight="400" fontSize="lg">Realized</Text>
                            </Flex>
                            <Flex flexDirection="column" py="4" fontFamily="Montserrat" fontWeight="400" fontSize="md">
                                <Text>Realized 1</Text>
                                <Text>Realized 2</Text>
                                <Text>Realized 3</Text>
                            </Flex>
                            <Flex alignItems="center" justifyContent="center">
                                <Text fontFamily="Montserrat" fontWeight="400" fontSize="lg">Unrealized</Text>
                            </Flex>
                            <Flex flexDirection="column" py="4" fontFamily="Montserrat" fontWeight="400" fontSize="md">
                                <Text>Unrealized 1</Text>
                                <Text>Unrealized 2</Text>
                                <Text>Unrealized 3</Text>
                            </Flex>
                        </Grid>
                    </Flex>
                </CardBody>
            </ProfileCard>
            <ProfileCard>
                <ProfileCardHeader>Interests</ProfileCardHeader>
                <Divider />
                <CardBody>
                    <Flex flexDirection="row" justifyContent="space-evenly" py="4" fontFamily="Montserrat" fontWeight="400" fontSize="lg">
                        <Text>Interest 1</Text>
                        <Text>Interest 2</Text>
                        <Text>Interest 3</Text>
                    </Flex>
                </CardBody>
            </ProfileCard>
            <ProfileCard>
                <ProfileCardHeader>How I Thrive</ProfileCardHeader>
                <Divider />
                <CardBody>
                    <Flex flexDirection="column">
                        <Grid templateColumns="1fr 2fr">
                            <Flex alignItems="center" justifyContent="center">
                                <Text fontFamily="Montserrat" fontWeight="400" fontSize="lg">How do I work?</Text>
                            </Flex>
                            <Flex flexDirection="column" py="4" fontFamily="Montserrat" fontWeight="400" fontSize="md">
                                <Text>Statement 1</Text>
                            </Flex>
                            <Flex alignItems="center" justifyContent="center">
                                <Text fontFamily="Montserrat" fontWeight="400" fontSize="lg">How do I connect and learn?</Text>
                            </Flex>
                            <Flex flexDirection="column" py="4" fontFamily="Montserrat" fontWeight="400" fontSize="md">
                                <Text>Statement 1</Text>
                            </Flex>
                            <Flex alignItems="center" justifyContent="center">
                                <Text fontFamily="Montserrat" fontWeight="400" fontSize="lg">What I need support in?</Text>
                            </Flex>
                            <Flex flexDirection="column" py="4" fontFamily="Montserrat" fontWeight="400" fontSize="md">
                                <Text>Statement 1</Text>
                            </Flex>
                        </Grid>
                    </Flex>
                </CardBody>
            </ProfileCard>
        </div>
    )
}

export default Profile;