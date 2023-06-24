import { Divider, CardBody, Flex, Text, Box, Grid } from "@chakra-ui/react";
import ProfileCard from "../../../../components/Dashboard/Profile/Card";
import ProfileCardHeader from "../../../../components/Dashboard/Profile/CardHeader";
import Header from '../../../../components/Dashboard/Profile/Header';

const Profile = () => {
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