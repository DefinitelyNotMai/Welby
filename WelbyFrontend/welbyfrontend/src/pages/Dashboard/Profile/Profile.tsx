import { Box, Card, Flex, Icon } from "@chakra-ui/react";
import { FaChevronLeft, FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/Button";
import DashboardHeader from "../../../components/Dashboard/Header";

const Profile = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/dashboard');
    }

    return (
        <>
            <DashboardHeader name="What" />
            <CustomButton
                bg="#ffffff"
                color="#bcbcbc"
                icon={FaChevronLeft}
                iconColor="#24a2f0"
                mt="4"
                ml="8"
                onClick={handleButtonClick}
                width="8%"
            >
                Back
            </CustomButton>
            <Card
                borderColor="transparent"
                minH="full"
                mx="24"
                mt="6"
                position="relative"
                zIndex="2"
            >
                <Flex bg="#24a2f0" borderRadius="0.5rem" boxShadow="lg">
                    <Box bg="#d9d9d9" borderRadius="full" boxSize="48" position="absolute" top="50%" left="5%" />
                    <Flex flexDirection="row-reverse" gap="8" mt="8" mr="8">
                        <Box bg="#d9d9d9" borderRadius="50%" boxSize="12" display="flex" alignItems="center" justifyContent="center">
                            <Icon as={FaFacebook} boxSize="8" />
                        </Box>
                        <Box bg="#d9d9d9" borderRadius="50%" boxSize="12" display="flex" alignItems="center" justifyContent="center">
                            <Icon as={FaLinkedin} boxSize="8" />
                        </Box>
                        <Box bg="#d9d9d9" borderRadius="50%" boxSize="12" display="flex" alignItems="center" justifyContent="center">
                            <Icon as={FaTiktok} boxSize="8" />
                        </Box>
                        <Box bg="#d9d9d9" borderRadius="50%" boxSize="12" display="flex" alignItems="center" justifyContent="center">
                            <Icon as={FaInstagram} boxSize="8" />
                        </Box>
                    </Flex>
                </Flex>
                <Box bg="#ffffff" minH="full" >
                    <Icon as={FaInstagram} boxSize="8" />
                </Box>
            </Card>
        </>
    );
}

export default Profile;