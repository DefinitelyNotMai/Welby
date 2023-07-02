import { Avatar, Center, Flex, Heading, Text, } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import MainFormButton from "../../../components/Main/FormButton";

const Step6 = () => {
    const navigate = useNavigate();

    const handleLoginButtonClick = () => {
        navigate("/company/login");
    }

    return (
        <>
            <Heading
                textAlign="center"
                fontFamily="Montserrat"
                fontWeight="700"
                fontSize="4xl"
                color="#ffffff"
            >
                CONGRATULATIONS
            </Heading>
            <Flex justify="center" mt="8">
                <Avatar boxSize="250px"></Avatar>
            </Flex>
            <Text
                textAlign="center"
                fontFamily="Montserrat"
                fontWeight="400"
                fontSize="4xl"
                color="#ffffff"
                mb="8"
            >
                You are all set-up!
            </Text>
            <Center>
                <MainFormButton width="35%" onClickEvent={handleLoginButtonClick}>
                    Proceed to Login
                </MainFormButton>
            </Center>
        </>
    );
};

export default Step6;
