import { Flex, Heading, Text } from "@chakra-ui/react";
import { FiPlus } from 'react-icons/fi';
import { useState } from "react";
import MainFooter from "../../../components/Main/Footer";
import MainFormButton from "../../../components/Main/FormButton";
import MainFormCard from "../../../components/Main/FormCard";
import MainHeader from "../../../components/Main/Header";
import MainLayout from "../../../components/Main/Layout";
import axios from "axios";
import { useMultistepForm } from "../../../hooks/useMultistepForm";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step6 from "./Step6";
import Step4 from "./Step4";
import Step5 from "./Step5";

type CompanyFormData = {
    Name: string;
    Email: string;
    Password: string;
    passwordConfirm: string;
    Phone_Number: string;
    Website: string;
    Address: string;
    FoundingDate: string;
    Vision: string;
    Mission: string;
    CountryId: string; //can be string because it is being converted in the backend
    IndustryTypeId: string; //can be string because it is being converted in the backend

    CompanyValueTitle1: string;
    CompanyValueTitle2: string;
    CompanyValueDescription1: string;
    CompanyValueDescription2: string;

    CompanyGoalTitle1: string;
    CompanyGoalTitle2: string;
    CompanyGoalDescription1: string;
    CompanyGoalDescription2: string;
    CompanyGoalDurationFrom: string;
    CompanyGoalDurationTo: string;
}

const INITIAL_DATA: CompanyFormData = {
    Name: "",
    Email: "",
    Password: "",
    passwordConfirm: "",
    Phone_Number: "",
    Website: "",
    Address: "",
    FoundingDate: "",
    Vision: "",
    Mission: "",
    CountryId: "", 
    IndustryTypeId: "", 

    CompanyValueTitle1: "",
    CompanyValueTitle2: "",
    CompanyValueDescription1: "",
    CompanyValueDescription2: "",

    CompanyGoalTitle1: "",
    CompanyGoalTitle2: "",
    CompanyGoalDescription1: "",
    CompanyGoalDescription2: "",
    CompanyGoalDurationFrom: "",
    CompanyGoalDurationTo: ""
}

const SignUp = () => {
    const [data, setData] = useState(INITIAL_DATA)

    function updateFields(fields: Partial<CompanyFormData>) {
        setData(prev => {
            return { ...prev, ...fields }
        })
    }

    const { steps, currentStepIndex, step, isFirstStep, isLastStep, prevStep, nextStep } = useMultistepForm([
        <Step1 {...data} updateFields={updateFields} />,
        <Step2 {...data} updateFields={updateFields} />,
        <Step3 {...data} updateFields={updateFields} />,
        //<Step4 {...data} updateFields={updateFields} />,
        //<Step5 {...data} updateFields={updateFields} />,
        <Step6 />
    ]);

    //companySignup
    const companySignUp = async () => {
        submitCompanyData();
        nextStep();
    }

    const submitCompanyData = async () => {
        let companyData = {
            "Name": data.Name,
            "Email": data.Email,
            "Phone_Number": data.Phone_Number,
            "Website": data.Website,
            "Address": data.Address,
            "FoundingDate": data.FoundingDate,
            "Vision": data.Vision,
            "Mission": data.Mission,
            "CountryId": data.CountryId,
            "IndustryTypeId": data.IndustryTypeId
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        var addCompanyUrl = 'https://localhost:44373/api/AddCompany';
        axios.post(addCompanyUrl, companyData, config)
            .then(response => {
                // Handle the response from the server
                console.log(response.data);
            }).catch(function (error) {
                console.log(error);
            });
    }

    const getCompanyId = () => {
        const getCompanyUrl = 'https://localhost:44373/api/GetCompany';
        var result = null;
        let param = {
            "Email": data.Email,
            "Phone_Number": data.Phone_Number
        }

        axios.get(getCompanyUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: param
        }).then(response => {
            result = response.data;
            if (result != null) {
                if (result.length > 0) {
                    console.log(result);
                    let id = result[0].CompanyId;
                    //submitCompanyGoalsAndValues(id);
                }
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    function addGoalsAndValues() { //not used for now.
        const addCompanyValues = async () => {
            const config = {
                headers: { 'Content-Type': 'application/json' }
            };

            let values: { title: string, description: string }[] = [
                {
                    title: data.CompanyGoalTitle1,
                    description: data.CompanyValueDescription1
                },
                {
                    title: data.CompanyGoalTitle2,
                    description: data.CompanyValueDescription2
                }
            ];

            var addValuesUrl = 'https://localhost:44373/api/AddValues'
            for (let x = 0; x < values.length; x++) {
                let value = {
                    "Title": values[x].title,
                    "Description": values[x].description
                }
            }
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
                            <MainFormButton
                                width="25%"
                                onClickEvent={currentStepIndex === steps.length - 2 ? companySignUp : nextStep}
                            //isDisabled={isNextDisabled}
                            >
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