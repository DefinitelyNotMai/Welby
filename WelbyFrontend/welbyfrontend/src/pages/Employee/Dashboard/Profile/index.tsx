import { Divider, CardBody, Flex, Text, Box, Grid } from "@chakra-ui/react";
import ProfileCard from "../../../../components/Dashboard/Profile/Card";
import ProfileCardHeader from "../../../../components/Dashboard/Profile/CardHeader";
import Header from '../../../../components/Dashboard/Profile/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from "../../../../context/UserContext";


const Profile = () => {
    const { userId } = useUserContext();
    const [weakness, setWeakness] = useState('');
    const [work, setWork] = useState('');
    const [connect, setConnect] = useState('');
    const [support, setSupport] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [unrealizedStrengths, setUnrealizedStrengths] = useState<string[]>([]);
    const [realizedStrengths, setRealizedStrengths] = useState<string[]>([]);
    const [interests, setInterests] = useState<string[]>([]);
    const [learnedBehaviors, setLearnedBehaviors] = useState<string[]>([]);


    useEffect(() => {
        //idk where to store.

        let learnedBehaviors = [];


        // fetching: 
        const fetchUnrealizedStrengths = async () => {
            var unrealizedStrengthUrl = 'https://localhost:44373/api/GetEmployeeUnrealizedStrengths';
            var result = null;
            let param = {
                "EmployeeId": userId
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
                        let unrealizedStrengths: string[] = [];
                        for (let x = 0; x < result.length; x++) {
                            unrealizedStrengths.push(result[x].UnrealizedStrengthDisplay)
                            //console.log("Unrealized Strength " + x + " " +result[x].UnrealizedStrengthDisplay);
                        }

                        setUnrealizedStrengths(unrealizedStrengths)

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
                "EmployeeId": userId
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
                        let realizedStrengths: string[] = [];
                        for (let x = 0; x < result.length; x++) {
                            realizedStrengths.push(result[x].RealizedStrengthDisplay)
                            //console.log("Realized Strength " + x + " " + result[x].RealizedStrengthDisplay);
                        }
                        setRealizedStrengths(realizedStrengths);
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
                "EmployeeId": userId
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
                        let learnedBehaviors: string[] = []
                        for (let x = 0; x < result.length; x++) {
                            learnedBehaviors.push(result[x].LearnedBehaviorDisplay)
                        }
                        setLearnedBehaviors(learnedBehaviors);
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        }

        const fetchInterests = async () => {
            var interestUrl = 'https://localhost:44373/api/GetEmployeeInterests';
            var result = null;
            let param = {
                "EmployeeId": userId
            }
            axios.get(interestUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                params: param
            }).then(response => {
                result = response.data;
                //console.log(response.data)
                if (result != null) {
                    let interests: string[] = [];
                    if (result.length > 0) {
                        for (let x = 0; x < result.length; x++) {
                            console.log(interests);
                            interests.push(result[x].InterestNameDisplay)
                        }
                        setInterests(interests);
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
                "EmployeeId": userId
            }

            axios.get(weaknessUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                params: param
            }).then(response => {
                result = response.data;
                if (result != null) {
                    if (result.length > 0) {
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
                "EmployeeId": userId
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
                        let work = result[0].Work;
                        let connect = result[0].Connect;
                        let support = result[0].Support;
                        let name = result[0].EmployeeFullName;
                        let email = result[0].Email;
                        let phoneNumber = result[0].Phone_Number;

                        setWork(work);
                        setConnect(connect);
                        setSupport(support);
                        setFirstName(name);
                        setEmail(email);
                        setPhoneNumber(phoneNumber);
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        };

        fetchRealizedStrengths();
        fetchUnrealizedStrengths();
        fetchLearnedBehaviors();
        fetchInterests();
        fetchWeakness();
        fetchUserData();
    }, []);


    return (
        <div>
            <Header name={firstName} email={email} phone_number={phoneNumber} />
            <ProfileCard>
                <ProfileCardHeader>Strengths</ProfileCardHeader>
                <Divider />
                <CardBody>
                    <Flex flexDirection="column">
                        <Grid templateColumns="1fr 1fr">
                            <Flex alignItems="center" justifyContent="center">
                                <Text fontFamily="Montserrat" fontWeight="400" fontSize="lg">Realized</Text>
                            </Flex>
                            <Flex flexDirection="column" py="4" fontFamily="Montserrat" fontWeight="400" fontSize="md">
                                <Text>{realizedStrengths[0]}</Text>
                                <Text>{realizedStrengths[1]}</Text>
                                <Text>{realizedStrengths[2]}</Text>
                            </Flex>
                            <Flex alignItems="center" justifyContent="center">
                                <Text fontFamily="Montserrat" fontWeight="400" fontSize="lg">Unrealized</Text>
                            </Flex>
                            <Flex flexDirection="column" py="4" fontFamily="Montserrat" fontWeight="400" fontSize="md">
                                <Text>{unrealizedStrengths[0]}</Text>
                                <Text>{unrealizedStrengths[1]}</Text>
                                <Text>{unrealizedStrengths[2]}</Text>
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
                        <Text>{interests[0]}</Text>
                        <Text>{interests[1]}</Text>
                        <Text>{interests[2]}</Text>
                    </Flex>
                </CardBody>
            </ProfileCard>
            <ProfileCard>
                <ProfileCardHeader>How I Thrive</ProfileCardHeader>
                <Divider />
                <CardBody>
                    <Flex flexDirection="column">
                        <Grid templateColumns="1fr 1fr">
                            <Flex alignItems="center" justifyContent="center">
                                <Text fontFamily="Montserrat" fontWeight="400" fontSize="lg">How do I work?</Text>
                            </Flex>
                            <Flex flexDirection="column" py="4" fontFamily="Montserrat" fontWeight="400" fontSize="md">
                                <Text>{work}</Text>
                            </Flex>
                            <Flex alignItems="center" justifyContent="center">
                                <Text fontFamily="Montserrat" fontWeight="400" fontSize="lg">How do I connect and learn?</Text>
                            </Flex>
                            <Flex flexDirection="column" py="4" fontFamily="Montserrat" fontWeight="400" fontSize="md">
                                <Text>{connect}</Text>
                            </Flex>
                            <Flex alignItems="center" justifyContent="center">
                                <Text fontFamily="Montserrat" fontWeight="400" fontSize="lg">What I need support in?</Text>
                            </Flex>
                            <Flex flexDirection="column" py="4" fontFamily="Montserrat" fontWeight="400" fontSize="md">
                                <Text>{support}</Text>
                            </Flex>
                        </Grid>
                    </Flex>
                </CardBody>
            </ProfileCard>
        </div>
    )
}

export default Profile;