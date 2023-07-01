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

type IUserInformation = { //ideal
    First_Name: string;
    Middle_Name: string;
    Last_Name: string;
    Nickname: string;
    Email: string;
    Phone_Number: number;
    Address: string;
    Birthday: string;
    Linkedin: string;
    Facebook: string;
    Instagram: string;
    TikTok: string;
    ProfilePhoto: string; //temporary
    GenderId: string; //can be string because it is being converted in the backend
    CompanyId: string; //can be string because it is being converted in the backend
    CountryId: string; //can be string because it is being converted in the backend
    Work: string;
    Connect: string;
    Support: string;
    Other_Notes: string;

    //these should be Ids
    RealizedStrength1: string;
    RealizedStrength2: string;
    RealizedStrength3: string;
    UnrealizedStrength1: string;
    UnrealizedStrength2: string;
    UnrealizedStrength3: string;
    LearnedBehavior1: string;
    LearnedBehavior2: string;
    Weakness: string;
}

type UserFormData = { //gender pa baka makalimutan 
    Company: string;
    First_Name: string;
    Middle_Name: string;
    Last_Name: string;
    Email: string;
    Country: string;
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

const INITIAL_DATA: UserFormData = {
    Company: "",
    First_Name: "",
    Middle_Name: "",
    Last_Name: "",
    Email: "",
    Country: "",
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

    function updateFields(fields: Partial<UserFormData>) {
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
        (!data.Company || !data.Email || !data.Country || !data.Phone_Number) ||
        (currentStepIndex === 1 && (!data.Work || !data.Connect || !data.Support)) ||
        (currentStepIndex === 2 && (!data.RealizedStrength1 || !data.RealizedStrength2 || !data.RealizedStrength3 || !data.UnrealizedStrength1 || !data.UnrealizedStrength2 || !data.UnrealizedStrength3 || !data.LearnedBehavior1 || !data.LearnedBehavior2 || !data.Weakness));

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        nextStep();
    }

    function EmployeeSignUp() { 
        //final sign up method when strengths and interest
        submitUserData();
        var createdEmployeeId = null;

        const getUserId = () => {
            const getUserUrl = 'https://localhost:44373/api/GetAllEmployees';
            var result = null;
            let param = {
                "Email": data.Email,
                "Phone_Number": data.Phone_Number // to password!
            }

            axios.get(getUserUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                params: param
            }).then(response => {
                result = response.data;
                if (result != null) {
                    if (result.length > 0) {
                        console.log(result);
                        createdEmployeeId = result[0].EmployeeId
                        submitUserStrengthsProfile(createdEmployeeId)
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
        
    }

    function submitUserStrengthsProfile(id: number) {
        const addUnrealizedStrengths = async () => {
            const config = {
                headers: { 'Content-Type': 'application/json' }
            };

            const top3 = [
                {
                    "EmployeeId": id,
                    "StrengthId": data.UnrealizedStrength1
                },
                {
                    "EmployeeId": id,
                    "StrengthId": data.UnrealizedStrength2
                },
                {
                    "EmployeeId": id,
                    "StrengthId": data.UnrealizedStrength3
                }
            ];

            var addUnrealizedStrengthsUrl = 'https://localhost:44373/api/AddEmployeeUnrealizedStrength';
            axios.post(addUnrealizedStrengthsUrl, top3, config)
                .then(response => {
                    // Handle the response from the server
                    console.log(response.data);
                }).catch(function (error) {
                    console.log(error);
                });
        }

        const addRealizedStrengths = async () => {
            const config = {
                headers: { 'Content-Type': 'application/json' }
            };

            const top3 = [
                {
                    "EmployeeId": id,
                    "StrengthId": data.RealizedStrength1
                },
                {
                    "EmployeeId": id,
                    "StrengthId": data.RealizedStrength2
                },
                {
                    "EmployeeId": id,
                    "StrengthId": data.RealizedStrength3
                }

            ];

            var addRealizedStrengthsUrl = 'https://localhost:44373/api/AddEmployeeRealizedStrength';
            axios.post(addRealizedStrengthsUrl, top3, config)
                .then(response => {
                    // Handle the response from the server
                    console.log(response.data);
                }).catch(function (error) {
                    console.log(error);
                });
        }

        const addLearnedBehaviors = async () => {
            const config = {
                headers: {'Content-Type': 'application/json'}
            };

            const top2 = [
                {
                    "EmployeeId": id,
                    "StrengthId": data.LearnedBehavior1
                },
                {
                    "EmployeeId": id,
                    "StrengthId": data.LearnedBehavior2
                }

            ];

            var addLearnedBehaviorUrl = 'https://localhost:44373/api/AddEmployeeLearnedBehavior';
            axios.post(addLearnedBehaviorUrl, top2, config)
                .then(response => {
                    // Handle the response from the server
                    console.log(response.data);
                }).catch(function (error) {
                    console.log(error);
                });
        }

        const addWeakness = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const weakness = {
                "EmployeeId": id,
                "StrengthId": data.Weakness
            };

            var addWeaknessUrl = 'https://localhost:44373/api/AddEmployeeWeakness';
            axios.post(addWeaknessUrl, weakness, config)
                .then(response => {
                    // Handle the response from the server
                    console.log(response.data);
                }).catch(function (error) {
                    console.log(error);
                });
        }

       // add interest here once we've figured out how to retrieve list


        addLearnedBehaviors();
        addRealizedStrengths();
        addUnrealizedStrengths();
        addWeakness();

    }

    const submitUserData = async () => {
        let userData = {
            //"First_Name": data.First_Name,
            //"Middle_Name": data.Middle_Name,
            //"Last_Name": data.Last_Name,
            //"Nickname": data.Nickname,
            //"Email": data.Email,
            //"First_Name": "Trial",
            //"Middle_Name": "Trial",
            //"Last_Name": "Trial",
            //"Nickname": "Trial",
            "Email": data.Email,
            "Phone_Number": data.Phone_Number,
            //"Address": data.Address,
            //"Birthday": data.Birthday,
            "Linkedin": data.Linkedin,
            "Facebook": data.Facebook,
            "Instagram": data.Instagram,
            "TikTok": data.TikTok,
            //"ProfilePhoto": data.ProfilePhoto,
            //"GenderId": data.GenderId,
            //"CompanyId": data.CompanyId,
            //"CountryId": data.CountryId,
            //"GenderId": 2,
            //"CompanyId": 1007,
            //"CountryId": 1000,
            "Work": data.Work,
            "Connect": data.Connect,
            "Support": data.Support,
            "Other_Notes": data.Other_Notes
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        var addUserUrl = 'https://localhost:44373/api/AddEmployee';
        axios.post(addUserUrl, userData, config)
            .then(response => {
                // Handle the response from the server
                console.log(response.data);
            }).catch(function (error) {
                console.log(error);
        });
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
                            <MainFormButton onClickEvent={submitUserData}>Sign up!</MainFormButton>
                        </Flex>
                    }
                </Flex>
            </MainFormCard>
            <MainFooter />
        </MainLayout>
    );
};

export default SignUp;