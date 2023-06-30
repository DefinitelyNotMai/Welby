import { Flex, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { FormEvent, useState } from "react";
import MainFooter from "../../../components/Main/Footer";
import MainFormButton from "../../../components/Main/FormButton";
import MainFormCard from "../../../components/Main/FormCard";
import MainHeader from "../../../components/Main/Header";
import MainLayout from "../../../components/Main/Layout";
import { useMultistepForm } from "../../../hooks/useMultistepForm";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";

type UserFormData = {
    Company: string;
    Email: string;
    Location: string;
    Phone_Number: string;
    Linkedin: string;
    Facebook: string;
    Instagram: string;
    TikTok: string;
    Work: string;
    Connect: string;
    Support: string;
    RealizedStrength1: string;
    RealizedStrength2: string;
    RealizedStrength3: string;
    UnrealizedStrength1: string;
    UnrealizedStrength2: string;
    UnrealizedStrength3: string;
    LearnedBehavior1: string;
    LearnedBehavior2: string;
    Weakness: string;
    Other_Notes: string;
}

//type UnrealizedStrengths = {
//    UnrealizedStrength1: string;
//    UnrealizedStrength2: string;
//    UnrealizedStrength3: string;
//}

//type RealizedStrengths = {
//    RealizedStrength1: string;
//    RealizedStrength2: string;
//    RealizedStrength3: string;
//}

//type LearnedBehaviors = {
//    LearnedBehavior1: string;
//    LearnedBehavior2: string;
//}

//type Weakness = {
//    Weakness: string;
//}

const UserUnrealizedStrength =  {
    UnrealizedStrength1: "",
    UnrealizedStrength2: "",
    UnrealizedStrength3: "",
}

const UserRealizedStrengths = {
    RealizedStrength1: "",
    RealizedStrength2: "",
    RealizedStrength3: "",
}

const UserLearnedBehaviors = {
    LearnedBehavior1: "",
    LearnedBehavior2: "",
}

const UserWeakness = {
    Weakness: "",
}

const INITIAL_DATA: UserFormData = {
    Company: "",
    Email: "",
    Location: "",
    Phone_Number: "",
    Linkedin: "",
    Facebook: "",
    Instagram: "",
    TikTok: "",
    Work: "",
    Connect: "",
    Support: "",
    RealizedStrength1: "",
    RealizedStrength2: "",
    RealizedStrength3: "",
    UnrealizedStrength1: "",
    UnrealizedStrength2: "",
    UnrealizedStrength3: "",
    LearnedBehavior1: "",
    LearnedBehavior2: "",
    Weakness: "",
    Other_Notes: "",
}

//type Strengths = {
//    Realized: RealizedStrengths;
//    Unrealized: UnrealizedStrengths;
//    Behaviors: LearnedBehaviors;
//    Weakeness: Weakness;
//}

const SignUp = () => {
    const [data, setData] = useState(INITIAL_DATA)
    //const [realizedStrengths, setRealizedStrengths] = useState(UserRealizedStrengths)
    //const [unrealizedStrengths, setUnrealizedStrengths] = useState(UserUnrealizedStrengths)
    //const [learnedBehaviors, setUserLearnedBehaviors] = useState(UserLearnedBehaviors)
    //const [weakness, setUserWeakness] = useState(UserWeakness)

    function updateFields(fields: Partial<UserFormData>) {
        setData(prev => {
            return { ...prev, ...fields }
        })

        
    }

    //function updateStrengths(strengths: Partial<Strengths>) {
    //    setRealizedStrengths(prev => {
    //        return {...prev, ...strengths}
    //    })
    //};


    const { steps, currentStepIndex, step, isFirstStep, isLastStep, prevStep, nextStep } = useMultistepForm([
        <Step1 {...data} updateFields={updateFields} />,
        <Step2 {...data} updateFields={updateFields} />,
        <Step3 {...data} updateFields={updateFields} />,
        <Step4 />,
        <Step5 {...data} updateFields={updateFields} />,
        <Step6 />
    ]);

    const isNextDisabled =
        (!data.Company || !data.Email || !data.Location || !data.Phone_Number) ||
        (currentStepIndex === 1 && (!data.Work || !data.Connect || !data.Support)) ||
        (currentStepIndex === 2 && (!data.RealizedStrength1 || !data.RealizedStrength2 || !data.RealizedStrength3 || !data.UnrealizedStrength1 || !data.UnrealizedStrength2 || !data.UnrealizedStrength3 || !data.LearnedBehavior1 || !data.LearnedBehavior2 || !data.Weakness));

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        nextStep();
    }

    function submitData() {
        gege();
        submitUserData();
    }

    function gege() {
        console.log(data)
        console.log(data.Phone_Number);
        console.log(data.Location)
    }

    const submitUserData = async () => {
        let userData = {
            "First_Name": "Dummy1",
            "Middle_Name": "Account2",
            "Last_Name": "Temporary3",
            "Nickname": "Dummy4",
            "Email": "dummyaccount5@email.com",
            "Phone_Number": "0987654321",
            "Address": "Zarraga, Iloilo",
            "Birthday": "1999-02-04",
            "Linkedin": "",
            "Facebook": "",
            "Instagram": "",
            "TikTok": "",
            "ProfilePhoto": "",
            "GenderId": 1,
            "CompanyId": 1007,
            "CountryId": 1000,
            "Work": "",
            "Connect": "",
            "Support": "",
            "Other_Notes": ""
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            var addUserUrl = 'https://localhost:44373/api/AddEmployee';
            
            axios.post(addUserUrl, userData, config)
                .then(response => {
                    // Handle the response from the server
                    console.log(response.data);
                })

        } catch (error) {
            console.error("Error sending user data.", error);
        }
    }

    return (
        <MainLayout>
            <MainHeader />
            <Heading textAlign="center">{currentStepIndex + 1} / {steps.length}</Heading>
            <MainFormCard w={["100%", "75%", "50%"]}>
                <Flex flexDirection="column" p="16">
                    {step}
                    {!isLastStep &&
                        <Flex flexDirection="row-reverse" justifyContent="space-between">
                            <MainFormButton width="25%" onClickEvent={nextStep} isDisabled={isNextDisabled}>
                                <Text>{currentStepIndex === steps.length - 2 ? "SUBMIT" : "NEXT"}</Text>
                            </MainFormButton>
                            {!isFirstStep &&
                                <MainFormButton width="25%" onClickEvent={prevStep}>
                                    <Text>BACK</Text>
                                </MainFormButton>}
                            <MainFormButton onClickEvent={submitData}>Sign up!</MainFormButton>
                        </Flex>
                    }
                </Flex>
            </MainFormCard>
            <MainFooter />
        </MainLayout>
    );
};

export default SignUp;