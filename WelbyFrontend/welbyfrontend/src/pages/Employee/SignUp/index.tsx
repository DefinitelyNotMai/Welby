import { Box, Icon, Flex, Grid, Heading, Text, Select, Textarea, Checkbox, Avatar, Center, FormControl } from "@chakra-ui/react";
import { FiPlus } from 'react-icons/fi';
import { useState } from "react";
import MainFooter from "../../../components/Main/Footer";
import MainFormButton from "../../../components/Main/FormButton";
import MainFormCard from "../../../components/Main/FormCard";
import CustomTextbox from "../../../components/Main/FormTextbox";
import MainHeader from "../../../components/Main/Header";
import MainLayout from "../../../components/Main/Layout";

enum SignupStep {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
}

const SignUp = () => {
    const [step, setStep] = useState<SignupStep>(SignupStep.Step1);

    const [CompanyName, setCompanyName] = useState('');
    const [UserName, setUserName] = useState('');
    const [Location, setLocation] = useState('');
    const [MobileNumber, setMobileNumber] = useState('');
    const [LinkedIn, setLinkedIn] = useState('');
    const [Facebook, setFacebook] = useState('');
    const [Instagram, setInstagram] = useState('');
    const [TikTok, setTikTok] = useState('');

    const options = [
        "Action",
        "Adaptable",
        "Adherence",
        "Adventure",
        "Authenticity",
        "Bounceback",
        "Catalyst",
        "Centered",
        "Change Agent",
        "Compassion",
        "Competetive",
        "Connector",
        "Counterpoint",
        "Courage",
        "Creativity",
        "Curiosity",
        "Detail",
        "Drive",
        "Emotional Awareness",
        "Empathic",
        "Enabler",
        "Equality",
        "Esteem Builder",
        "Explainer",
        "Feedback",
        "Gratitude",
        "Growth",
        "Humility",
        "Humour",
        "Improver",
        "Incubator",
        "Innovation",
        "Judgement",
        "Legacy",
        "Listener",
        "Mission",
        "Moral Compass",
        "Narrator",
        "Optimism",
        "Organizer",
        "Persistence",
        "Personal Responsibility",
        "Personalisation",
        "Persuasion",
        "Planner",
        "Prevention",
        "Pride",
        "Rapport Builder",
        "Relationship Deepener",
        "Resilience",
        "Resolver",
        "Self-awareness",
        "Self-belief",
        "Service",
        "Spotlight",
        "Strategic Awareness",
        "Time Optimiser",
        "Unconditionality",
        "Work Ethic",
        "Writer",
    ];

    /* Replace this with your actual data retrieval logic
    const fetchCompanyNameFromDatabase = () => {
        // get company name from db
        const retrievedCompanyName;
        setCompanyName(retrievedCompanyName);
    };
    */

    const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyName(e.target.value);
    };

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLocation(e.target.value);
    };

    const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMobileNumber(e.target.value);
    };

    const handleLinkedInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLinkedIn(e.target.value);
    };

    const handleFacebookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFacebook(e.target.value);
    };

    const handleInstagramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInstagram(e.target.value);
    };

    const handleTikTokChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTikTok(e.target.value);
    };

    const handleNextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const handlePreviousStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const renderStep = () => {
        switch (step) {
            case SignupStep.Step1:
                return renderStep1();
            case SignupStep.Step2:
                return renderStep2();
            case SignupStep.Step3:
                return renderStep3();
            case SignupStep.Step4:
                return renderStep4();
            case SignupStep.Step5:
                return renderStep5();
            case SignupStep.Step6:
                return renderStep6();
            default:
                return null;
        }
    };

    const renderStep1 = () => {
        return (
            <Flex flexDirection="column" p="16">
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    color="#ffffff"
                    fontFamily="Montserrat"
                    mb="10"
                >
                    <Heading fontFamily="Montserrat" fontWeight="700">Welcome to</Heading>
                    <Heading fontFamily="Montserrat" fontWeight="700">{CompanyName}!</Heading>
                    <Text fontSize="lg">Please introduce yourself.</Text>
                </Flex>
                <Grid templateColumns="2fr 1fr" gap="10">
                    <Flex flexDirection="column">
                        <CustomTextbox placeholder="Email" value={UserName} />
                        <Select
                            placeholder="Choose your location"
                            bg="#ffffff"
                            fontFamily="Montserrat"
                            fontWeight="500"
                            color="#718096"
                            mb="5"
                            value={Location}
                            onChange={handleLocationChange}
                        >
                            <option value="Philippines">Philippines</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Malaysia">Malaysia</option>
                        </Select>
                        <CustomTextbox placeholder="Mobile Number" value={MobileNumber} onChange={handleMobileNumberChange} />
                        <CustomTextbox placeholder="LinkedIn" value={LinkedIn} onChange={handleLinkedInChange} />
                        <CustomTextbox placeholder="Facebook" value={Facebook} onChange={handleFacebookChange} />
                        <CustomTextbox placeholder="Instagram" value={Instagram} onChange={handleInstagramChange} />
                        <CustomTextbox placeholder="TikTok" value={TikTok} onChange={handleTikTokChange} />
                    </Flex>
                    <Flex h="50%">
                        <Flex flexDirection="column" bg="#ffffff" borderRadius="md" alignItems="center" justifyContent="center" p="4">
                            <Flex flexDirection="column" bg="#c8c8c8" h="98%" borderRadius="md" alignItems="center" justifyContent="center" p="4">
                                <Icon as={FiPlus} boxSize={8} />
                                <Text mt="2">Upload Profile Photo</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Grid>
                <Flex flexDirection="row-reverse">
                    <MainFormButton width="25%" onClickEvent={handleNextStep}>
                        <Text>NEXT</Text>
                    </MainFormButton>
                    <MainFormButton width="25%">
                        <Text>SAVE PROGRESS</Text>
                    </MainFormButton>
                </Flex>
            </Flex>
        );
    };

    const renderStep2 = () => {
        return (
            <Flex flexDirection="column" p="16">
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                    color="#ffffff"
                    fontFamily="Montserrat"
                    mb="10"
                >
                    <Heading fontFamily="Montserrat" fontWeight="700" mb="5">Let your colleagues know how you can thrive</Heading>
                    <Text fontSize="lg" fontWeight="700">"It is only in your thriving that you have anything to offer anyone."</Text>
                    <Text fontSize="sm" fontWeight="400">- Esther Hicks</Text>
                </Flex>
                <Box mb="5" fontFamily="Montserrat" fontWeight="500">
                    <Text color="#ffffff">How do I work?</Text>
                    <Textarea bg="#ffffff" border="none" placeholder="Type here..." />
                </Box>
                <Box mb="5" fontFamily="Montserrat" fontWeight="500">
                    <Text color="#ffffff">How do I connect and learn?</Text>
                    <Textarea bg="#ffffff" border="none" placeholder="Type here..." />
                </Box>
                <Box mb="20" fontFamily="Montserrat" fontWeight="500">
                    <Text color="#ffffff">What I need support in?</Text>
                    <Textarea bg="#ffffff" border="none" placeholder="Type here..." />
                </Box>
                <Flex flexDirection="row" justifyContent="space-between">
                    <MainFormButton width="25%" onClickEvent={handlePreviousStep}>
                        <Text>BACK</Text>
                    </MainFormButton>
                    <MainFormButton width="25%">
                        <Text>SAVE PROGRESS</Text>
                    </MainFormButton>
                    <MainFormButton width="25%" onClickEvent={handleNextStep}>
                        <Text>NEXT</Text>
                    </MainFormButton>
                </Flex>
            </Flex>
        );
    };

    const renderStep3 = () => {
        return (
            <Flex flexDirection="column" p="16">
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    color="#ffffff"
                    fontFamily="Montserrat"
                    mb="10"
                >
                    <Heading fontFamily="Montserrat" fontWeight="700" mb="5">Share your strengths to the team.</Heading>
                    <Text fontSize="lg" fontWeight="700">"Play with your strengths"</Text>
                    <Text fontSize="sm" fontWeight="400">- Jennifer Lopez</Text>
                </Flex>
                <Box color="#ffffff" fontFamily="Montserrat" mb="10">
                    <Text fontSize="lg" fontWeight="700">Input your results from the Strengths Profile</Text>
                </Box>
                <Box mb="5" fontFamily="Montserrat" fontWeight="500">
                    <Text color="#ffffff">Top 3 Realized Strengths</Text>
                    <Flex justifyContent="space-between">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Select key={index} bg="#ffffff" placeholder="Choose here..." width="30%">
                                {options.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </Select>
                        ))}
                    </Flex>
                </Box>
                <Box mb="5" fontFamily="Montserrat" fontWeight="500">
                    <Text color="#ffffff">Top 3 Unrealized Strengths</Text>
                    <Flex justifyContent="space-between">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Select key={index} bg="#ffffff" placeholder="Choose here..." width="30%">
                                {options.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </Select>
                        ))}
                    </Flex>
                </Box>
                <Box mb="5" fontFamily="Montserrat" fontWeight="500">
                    <Text color="#ffffff">Top 2 Learned Behaviors</Text>
                    <Flex flexDirection="row" flexFlow="flex-start" >
                        {Array.from({ length: 2 }).map((_, index) => (
                            <Select key={index} bg="#ffffff" placeholder="Choose here..." width="30%" mr={index === 0 ? "10" : "0"}>
                                {options.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </Select>
                        ))}
                    </Flex>
                </Box>
                <Box mb="20" fontFamily="Montserrat" fontWeight="500">
                    <Text color="#ffffff">Top 1 Weaknesses</Text>
                    {Array.from({ length: 1 }).map((_, index) => (
                        <Select key={index} bg="#ffffff" placeholder="Choose here..." w="30%">
                            {options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </Select>
                    ))}
                </Box>
                <Flex flexDirection="row" justifyContent="space-between">
                    <MainFormButton width="25%" onClickEvent={handlePreviousStep}>
                        <Text>BACK</Text>
                    </MainFormButton>
                    <MainFormButton width="25%">
                        <Text>SAVE PROGRESS</Text>
                    </MainFormButton>
                    <MainFormButton width="25%" onClickEvent={handleNextStep}>
                        <Text>NEXT</Text>
                    </MainFormButton>
                </Flex>
            </Flex>
        );
    };

    const renderStep4 = () => {
        return (
            <Flex flexDirection="column" p="16">
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    color="#ffffff"
                    fontFamily="Montserrat"
                    mb="10"
                >
                    <Heading fontFamily="Montserrat" fontWeight="700" mb="5">Share your strengths to the team.</Heading>
                    <Text fontSize="lg" fontWeight="700">"Play with your strengths"</Text>
                    <Text fontSize="sm" fontWeight="400">- Jennifer Lopez</Text>
                </Flex>
                <Box color="#ffffff" fontFamily="Montserrat" mb="10">
                    <Text fontSize="lg" fontWeight="400">Choose all that apply</Text>
                </Box>
                <Box bg="#ffffff" borderRadius="xl" fontFamily="Montserrat" fontWeight="400" mb="10">
                    <Grid templateColumns="1fr 1fr">
                        <Flex flexDirection="column">
                            <Checkbox value="dance" p="4">Dance</Checkbox>
                            <Checkbox value="exercise" p="4">Exercise</Checkbox>
                            <Checkbox value="languages" p="4">Languages</Checkbox>
                            <Checkbox value="movies" p="4">Movies</Checkbox>
                            <Checkbox value="photography" p="4">Photography</Checkbox>
                            <Checkbox value="podcasts" p="4">Podcasts</Checkbox>
                            <Checkbox value="poems-and-literature" p="4">Poems and Literature</Checkbox>
                        </Flex>
                        <Flex flexDirection="column">
                            <Checkbox value="reading" p="4">Reading</Checkbox>
                            <Checkbox value="sports" p="4">Sports</Checkbox>
                            <Checkbox value="travel" p="4">Travel</Checkbox>
                            <Checkbox value="video-games" p="4">Video Games</Checkbox>
                            <Checkbox value="volunteering" p="4">Volunteering</Checkbox>
                            <Checkbox value="writing" p="4">Writing</Checkbox>
                            <Checkbox value="yoga" p="4">Yoga</Checkbox>
                        </Flex>
                    </Grid>
                </Box>
                <Flex flexDirection="row" justifyContent="space-between">
                    <MainFormButton width="25%" onClickEvent={handlePreviousStep}>
                        <Text>BACK</Text>
                    </MainFormButton>
                    <MainFormButton width="25%">
                        <Text>SAVE PROGRESS</Text>
                    </MainFormButton>
                    <MainFormButton width="25%" onClickEvent={handleNextStep}>
                        <Text>NEXT</Text>
                    </MainFormButton>
                </Flex>
            </Flex>
        );
    };

    const renderStep5 = () => {
        return (
            <Flex flexDirection="column" p="16">
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                    color="#ffffff"
                    fontFamily="Montserrat"
                    mb="10"
                >
                    <Heading fontFamily="Montserrat" fontWeight="700" mb="5">Anything else you want your colleagues to take note of?</Heading>
                </Flex>
                <Box mb="5" fontFamily="Montserrat" fontWeight="500">
                    <Text color="#ffffff">Other things I want to share for my team to know me more:</Text>
                    <Textarea bg="#ffffff" border="none" placeholder="Type here..." h="15vh" />
                </Box>
                <Box color="#ffffff" mb="5" fontFamily="Montserrat">
                    <Text fontWeight="700" pb="5">Reminders:</Text>
                    <Text fontWeight="700">Don't forget to join in our other collaboration platforms!</Text>
                    <Flex flexDirection="column">
                        <Checkbox value="discord">Discord</Checkbox>
                        <Checkbox value="asana">Asana</Checkbox>
                        <Checkbox value="clickup">ClickUp</Checkbox>
                    </Flex>
                </Box>
                <Flex flexDirection="row" justifyContent="space-between">
                    <MainFormButton width="25%" onClickEvent={handlePreviousStep}>
                        <Text>BACK</Text>
                    </MainFormButton>
                    <MainFormButton width="25%">
                        <Text>SAVE PROGRESS</Text>
                    </MainFormButton>
                    <MainFormButton width="25%" onClickEvent={handleNextStep}>
                        <Text>NEXT</Text>
                    </MainFormButton>
                </Flex>
            </Flex>
        );
    };

    const renderStep6 = () => {
        return (
            <Flex flexDirection="column" p="16">
                <Heading
                    textAlign="center"
                    fontFamily="Montserrat"
                    fontWeight="700"
                    fontSize="4xl"
                    color="#ffffff"
                >
                    Congratulations,
                </Heading>
                <Text
                    textAlign="center"
                    fontFamily="Montserrat"
                    fontWeight="700"
                    fontSize="5xl"
                    color="#ffffff"
                >
                    NICKNAME
                </Text>
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
                    <MainFormButton width="35%">
                        Go to My Dashboard
                    </MainFormButton>
                </Center>
            </Flex>
        );
    };

    return (
        <MainLayout>
            <MainHeader />
            <MainFormCard w={["100%", "75%", "50%"]}>
                {renderStep()}
            </MainFormCard>
            <MainFooter />
        </MainLayout>
    );
};

export default SignUp;