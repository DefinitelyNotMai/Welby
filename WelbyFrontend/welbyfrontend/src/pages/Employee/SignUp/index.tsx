import { Flex, Heading, Text } from "@chakra-ui/react";
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

type FormData = {
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

const INITIAL_DATA: FormData = {
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

const SignUp = () => {
    const [data, setData] = useState(INITIAL_DATA)

    function updateFields(fields: Partial<FormData>) {
        setData(prev => {
            return { ...prev, ...fields }
        })
    }

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
                        </Flex>
                    }
                </Flex>
            </MainFormCard>
            <MainFooter />
        </MainLayout>
    );
};

export default SignUp;