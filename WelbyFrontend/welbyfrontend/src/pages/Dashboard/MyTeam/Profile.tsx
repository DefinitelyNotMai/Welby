import { Box, Center, Divider, Flex, Grid, Text, VStack } from "@chakra-ui/react";
import CustomButton from "../../../components/Button";
import Section from "../../../components/Dashboard/Section";

const Profile = () => {
    return (
        <Box my="4">
            <Section title="Employee Name" mb="0">
                <Flex flexDirection="column">
                    <Center display="flex" flexDirection="column">
                        <Box borderRadius="full" boxSize="48" boxShadow="lg" bg="#24a2f0" />
                        <Text color="#34313a" fontFamily="Montserrat" fontWeight="600" fontSize="18" my="4">Nickname</Text>
                    </Center>
                    <Divider />
                    <Text color="#bcbcbc" fontFamily="Montserrat" fontWeight="500" fontSize="16" my="4">Personal Information</Text>
                    <Grid templateColumns="1fr 2fr" mb="4" gap="8">
                        <VStack display="flex" alignItems="flex-end">
                            <Text color="#bcbcbc" fontFamily="Montserrat" fontWeight="500" fontSize="16">Name:</Text>
                            <Text color="#bcbcbc" fontFamily="Montserrat" fontWeight="500" fontSize="16">Birthday:</Text>
                            <Text color="#bcbcbc" fontFamily="Montserrat" fontWeight="500" fontSize="16">Address:</Text>
                            <Text color="#bcbcbc" fontFamily="Montserrat" fontWeight="500" fontSize="16">Location:</Text>
                        </VStack>
                        <VStack display="flex" alignItems="flex-start">
                            <Text fontFamily="Montserrat" fontWeight="500" fontSize="16">First Name - Middle Name - Last Name</Text>
                            <Text fontFamily="Montserrat" fontWeight="500" fontSize="16">January 1, 1975</Text>
                            <Text fontFamily="Montserrat" fontWeight="500" fontSize="16">Lot #, Block #, Street Name</Text>
                            <Text fontFamily="Montserrat" fontWeight="500" fontSize="16">City, Country</Text>
                        </VStack>
                    </Grid>
                    <Divider />
                    <Text color="#bcbcbc" fontFamily="Montserrat" fontWeight="500" fontSize="16" my="4">Contact Information</Text>
                    <Grid templateColumns="1fr 2fr" mb="4" gap="8">
                        <VStack display="flex" alignItems="flex-end">
                            <Text color="#bcbcbc" fontFamily="Montserrat" fontWeight="500" fontSize="16">Phone Number:</Text>
                            <Text color="#bcbcbc" fontFamily="Montserrat" fontWeight="500" fontSize="16">Email:</Text>
                        </VStack>
                        <VStack display="flex" alignItems="flex-start">
                            <Text fontFamily="Montserrat" fontWeight="500" fontSize="16">09xxxxxxxxx</Text>
                            <Text fontFamily="Montserrat" fontWeight="500" fontSize="16">employee@email.com</Text>
                        </VStack>
                    </Grid>
                    <Divider />
                    <Text color="#bcbcbc" fontFamily="Montserrat" fontWeight="500" fontSize="16" my="4">Socials</Text>
                    <Grid templateColumns="1fr 2fr" mb="4" gap="8">
                        <VStack display="flex" alignItems="flex-end">
                            <Text color="#bcbcbc" fontFamily="Montserrat" fontWeight="500" fontSize="16">LinkedIn:</Text>
                            <Text color="#bcbcbc" fontFamily="Montserrat" fontWeight="500" fontSize="16">Facebook:</Text>
                            <Text color="#bcbcbc" fontFamily="Montserrat" fontWeight="500" fontSize="16">TikTok:</Text>
                            <Text color="#bcbcbc" fontFamily="Montserrat" fontWeight="500" fontSize="16">Instagram:</Text>
                        </VStack>
                        <VStack display="flex" alignItems="flex-start">
                            <Text fontFamily="Montserrat" fontWeight="500" fontSize="16">https://www.linkedin.com</Text>
                            <Text fontFamily="Montserrat" fontWeight="500" fontSize="16">https://www.facebook.com</Text>
                            <Text fontFamily="Montserrat" fontWeight="500" fontSize="16">https://www.tiktok.com</Text>
                            <Text fontFamily="Montserrat" fontWeight="500" fontSize="16">https://www.instagram.com</Text>
                        </VStack>
                    </Grid>
                    <Center display="flex" flexDirection="column" my="4">
                        <CustomButton color="#ffffff" width="25%">See Full Profile</CustomButton>
                    </Center>
                </Flex>
            </Section>
        </Box>
    );
}

export default Profile;