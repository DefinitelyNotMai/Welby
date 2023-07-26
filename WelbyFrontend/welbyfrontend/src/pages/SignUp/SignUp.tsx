import { Flex, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useMultistepForm } from '../../hooks/useMultistepForm';
import MainFooter from '../../components/Main/Footer';
import MainFormButton from '../../components/Main/FormButton';
import MainFormCard from '../../components/Main/FormCard';
import MainHeader from '../../components/Main/Header';
import MainLayout from '../../components/Main/Layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';

type CompanyFormData = {
    // Step1
    Name: string;
    Email: string;
    Website: string;
    CompanySize: string;
    Phone_Number: string;
    FoundingDate: string;
    CountryId: string; //can be string because it is being converted in the backend
    IndustryTypeId: string; //can be string because it is being converted in the backend

    // Step2
    Vision: string;
    Mission: string;

    // Step3
    CompanyValueTitle1: string;
    CompanyValueDescription1: string;
    CompanyValueTitle2: string;
    CompanyValueDescription2: string;

    // Step4
    CompanyGoalTitle1: string;
    CompanyGoalDescription1: string;
    CompanyGoalCompletedBy1: string;
};

type CompanyAdminFormData = {
    // Step5
    AdminEmail: string;
    AdminPassword: string;
    AdminConfirmPassword: string;
    AdminFirstName: string;
    AdminNickname: string;
    AdminMiddleName: string;
    AdminLastName: string;
    AdminBirthdate: string;
    AdminGender: string;
    AdminPhoneNumber: string;

    // Step6
    AdminAddress: string;
    AdminCountryId: string;
    AdminFacebook: string;
    AdminInstagram: string;
    AdminLinkedIn: string;
    AdminTikTok: string;
    AdminWork: string;
    AdminConnect: string;
    AdminSupport: string;
    AdminOtherNotes: string;
}

const COMPANY_INITIAL_DATA: CompanyFormData = {
    Name: '',
    Email: '',
    Website: '',
    CompanySize: '',
    Phone_Number: '',
    FoundingDate: '',
    CountryId: '',
    IndustryTypeId: '',

    Vision: '',
    Mission: '',

    CompanyValueTitle1: '',
    CompanyValueDescription1: '',
    CompanyValueTitle2: '',
    CompanyValueDescription2: '',

    CompanyGoalTitle1: '',
    CompanyGoalDescription1: '',
    CompanyGoalCompletedBy1: '',
};

const COMPANY_ADMIN_INITIAL_DATA: CompanyAdminFormData = {
    // Step5
    AdminEmail: '',
    AdminPassword: '',
    AdminConfirmPassword: '',
    AdminFirstName: '',
    AdminNickname: '',
    AdminMiddleName: '',
    AdminLastName: '',
    AdminBirthdate: '',
    AdminGender: '',
    AdminPhoneNumber: '',

    // Step6
    AdminAddress: '',
    AdminCountryId: '',
    AdminFacebook: '',
    AdminInstagram: '',
    AdminLinkedIn: '',
    AdminTikTok: '',
    AdminWork: '',
    AdminConnect: '',
    AdminSupport: '',
    AdminOtherNotes: '',
}

const SignUp = () => {
    const [CompanyData, setCompanyData] = useState(COMPANY_INITIAL_DATA);
    const [CompanyAdminData, setCompanyAdminData] = useState(COMPANY_ADMIN_INITIAL_DATA);

    const navigate = useNavigate();

    function updateCompanyFields(fields: Partial<CompanyFormData>) {
        setCompanyData((prev) => {
            return { ...prev, ...fields };
        });
    }

    function updateCompanyAdminFields(fields: Partial<CompanyAdminFormData>) {
        setCompanyAdminData((prev) => {
            return { ...prev, ...fields };
        });
    }

    const {
        steps,
        currentStepIndex,
        step,
        isFirstStep,
        isLastStep,
        prevStep,
        nextStep,
    } = useMultistepForm([
        <Step1 {...CompanyData} updateFields={updateCompanyFields} />,
        <Step2 {...CompanyData} updateFields={updateCompanyFields} />,
        <Step3 {...CompanyData} updateFields={updateCompanyFields} />,
        <Step4 {...CompanyData} updateFields={updateCompanyFields} />,
        <Step5 {...CompanyAdminData} updateFields={updateCompanyAdminFields} />,
        <Step6 {...CompanyAdminData} updateFields={updateCompanyAdminFields} />,
    ]);

    //companySignup
    const companySignUp = async () => {
        //submitCompanyData();
        nextStep();
    };

    const companyAdminSignUp = async () => {
        //submitCompanyAdminData();
        navigate('/');
    };

    /*
    const submitCompanyAdminData = async () => {
    };
    */

    const submitCompanyData = async () => {
        let companyData = {
            Name: CompanyData.Name,
            Email: CompanyData.Email,
            Phone_Number: CompanyData.Phone_Number,
            Website: CompanyData.Website,
            FoundingDate: CompanyData.FoundingDate,
            Vision: CompanyData.Vision,
            Mission: CompanyData.Mission,
            CountryId: CompanyData.CountryId,
            IndustryTypeId: CompanyData.IndustryTypeId,
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        var addCompanyUrl = 'https://localhost:44373/api/AddCompany';
        axios
            .post(addCompanyUrl, companyData, config)
            .then((response) => {
                // Handle the response from the server
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const getCompanyId = () => {
        const getCompanyUrl = 'https://localhost:44373/api/GetCompany';
        var result = null;
        let param = {
            Email: CompanyData.Email,
            Phone_Number: CompanyData.Phone_Number,
        };

        axios
            .get(getCompanyUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                params: param,
            })
            .then((response) => {
                result = response.data;
                if (result != null) {
                    if (result.length > 0) {
                        console.log(result);
                        let id = result[0].CompanyId;
                        //submitCompanyGoalsAndValues(id);
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    function addGoalsAndValues() {
        //not used for now.
        const addCompanyValues = async () => {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            };

            let values: { title: string; description: string }[] = [
                {
                    title: CompanyData.CompanyGoalTitle1,
                    description: CompanyData.CompanyValueDescription1,
                },
            ];

            var addValuesUrl = 'https://localhost:44373/api/AddValues';
            for (let x = 0; x < values.length; x++) {
                let value = {
                    Title: values[x].title,
                    Description: values[x].description,
                };
            }
        };
    }

    return (
        <MainLayout>
            <MainHeader />
            <Heading textAlign="center">
                {currentStepIndex + 1} / {steps.length}
            </Heading>
            <MainFormCard w={['100%', '65%']}>
                <Flex flexDirection="column" p="0">
                    {step}
                    <Flex justifyContent={isFirstStep ? 'flex-end' : 'space-between'} mr="5">
                        {!isFirstStep && (
                            <MainFormButton width="25%" onClickEvent={prevStep}>
                                <Text>BACK</Text>
                            </MainFormButton>
                        )}
                        {currentStepIndex === 3 ? (
                            <MainFormButton width="50%" onClickEvent={companySignUp}>
                                <Text>Proceed to Admin Sign Up</Text>
                            </MainFormButton>
                        ) : (
                            <MainFormButton
                                width="25%"
                                onClickEvent={currentStepIndex === steps.length - 1 ? companyAdminSignUp : nextStep}
                            >
                                <Text>{isLastStep ? 'SUBMIT' : 'NEXT'}</Text>
                            </MainFormButton>
                        )}
                    </Flex>
                </Flex>
            </MainFormCard>
            <MainFooter />
        </MainLayout>
    );
};

export default SignUp;
