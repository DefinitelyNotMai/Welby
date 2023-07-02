import { Box, Center, Grid, Heading, Image, Text } from "@chakra-ui/react";
import WelbyLogo from "../../../assets/images/welby_logoAndName_primary-1_flat.svg"
import CustomTextbox from "../../../components/Main/FormTextbox";

type Step1Data = {
    Name: string;
    Email: string;
    Password: string;
    passwordConfirm: string;
}

type Step1Props = Step1Data & {
    updateFields: (fields: Partial<Step1Data>) => void
}

const Step1 = ({
    Name,
    Email,
    Password,
    passwordConfirm,
    updateFields
}: Step1Props) => {
    return (
        <>
            <Grid templateColumns={{ base: '1fr', md: '1.5fr 2fr' }} gap={0}>
                <Box
                    bg="#ffffff"
                    h={{ base: '50vh', md: '70vh' }}
                    m="0"
                    borderLeftRadius="2xl"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Center>
                        <Image src={WelbyLogo} boxSize="64" />
                    </Center>
                </Box>
                <Box
                    bg="#24a2f0"
                    p={{ base: '8', md: '16' }}
                    borderRightRadius="2xl"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                >
                    <Heading
                        fontFamily="Montserrat"
                        fontWeight="500"
                        color="#ffffff"
                    >
                        First of all, thank you for choosing Welby!
                    </Heading>
                    <Heading
                        fontFamily="Montserrat"
                        fontWeight="500"
                        color="#ffffff"
                        mb="5"
                    >
                        Let's start your <b>registration.</b>
                    </Heading>
                    <Box>
                        <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Company Name</Text>
                        <CustomTextbox
                            placeholder="Name"
                            value={Name}
                            onChange={e => updateFields({ Name: e.target.value })}
                        />
                    </Box>
                    <Box>
                        <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Company Email Address</Text>
                        <CustomTextbox
                            placeholder="hello@email.com"
                            value={Email}
                            onChange={e => updateFields({ Email: e.target.value })}
                        />
                    </Box>
                    <Box>
                        <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Set Password</Text>
                        <CustomTextbox
                            placeholder="Set password"
                            value={Password}
                            onChange={e => updateFields({ Password: e.target.value })}
                            type="password"
                        />
                    </Box>
                    <Box>
                        <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500">Confirm Password</Text>
                        <CustomTextbox
                            placeholder="Confirm password"
                            value={passwordConfirm}
                            onChange={e => updateFields({ passwordConfirm: e.target.value })}
                            type="password"
                        />
                    </Box>
                </Box>
            </Grid>
        </>
    );
}

export default Step1;