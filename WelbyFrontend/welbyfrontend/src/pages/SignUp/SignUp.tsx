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
    const companySignUp = async () => { // setting up company information done by company admin

        // 1. add values and goals to master table
        addGoalsAndValues();

        // 2. add company to master table
        addCompanyToMasterTable();

        // 3. add company values and company goals to database
        addCompanyGoalsAndCompanyValues();

        // 4. proceed to admin sign up
        nextStep();
    };

    const companyAdminSignUp = async () => {
        // 1. Add Company Admin to WelbyDatabase
        addCompanyAdminToEmployee();

        // 2. Add Company Admi to OWS
        addCompanyAdmin()

        // 3. User needs to log in
        navigate('/');
    };




    // ------------------------------------------ ADD GOALS AND VALUES TO MASTER TABLE ------------------------------------------
    
    const addValuesToMasterTable = () => { // ------------ VALUES
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };

        let values: { title: string; description: string; }[] = [ // ------------ needs to change once dynamically adding of values is there, might not be needed
            {
                title: CompanyData.CompanyValueTitle1,
                description: CompanyData.CompanyValueDescription1
            },
            {
                title: CompanyData.CompanyValueTitle2,
                description: CompanyData.CompanyValueDescription2
            },
        ];

        var addValuesUrl = 'https://localhost:44373/api/AddValues';

        //can add multiple values
        for (let x = 0; x < values.length; x++) {
            let value = {
                Title: values[x].title,
                Description: values[x].description
            };

            // send to backend
            axios
                .post(addValuesUrl, value, config)
                .then((response) => {
                    // Handle the response from the server
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    const addGoalsToMasterTable = () => {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };

        let goals: { title: string; description: string; durationTo: string; }[] = [ // ------------ needs to change once dynamically adding of values is there, might not be needed
            {
                title: CompanyData.CompanyGoalTitle1,
                description: CompanyData.CompanyGoalDescription1,
                durationTo: "" // -- temporary data
            }
        ];

        var addGoalsUrl = 'https://localhost:44373/api/AddGoals';

        //can add multiple goals
        for (let x = 0; x < goals.length; x++) {
            let goal = {
                Title: goals[x].title,
                Description: goals[x].description,
                DurationTo: goals[x].durationTo // ----- durationTo is the date that was set in the frontend
            };

            // send to backend
            axios
                .post(addGoalsUrl, goal, config)
                .then((response) => {
                    // Handle the response from the server
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    function addGoalsAndValues() {
        addValuesToMasterTable();
        addGoalsToMasterTable();
    }



    // ------------------------------------------ ADD COMPANY TO MASTER TABLE ------------------------------------------

    const addCompanyToMasterTable = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        let company = {
            "Name": CompanyData.Name,
            "Email": CompanyData.Email,
            "Phone_Number": CompanyData.Phone_Number,
            "Website": CompanyData.Website,
            "FoundingDate": CompanyData.FoundingDate,
            "Vision": CompanyData.Vision,
            "Mission": CompanyData.Mission,
            "CountryId": CompanyData.CountryId,
            "IndustryTypeId": CompanyData.IndustryTypeId,
            "CompanySize": CompanyData.CompanySize
        }

        var addCompanyUrl = 'https://localhost:44373/api/AddCompany';
        axios
            .post(addCompanyUrl, company, config)
            .then((response) => {
                // Handle the response from the server
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    // ------------------------------------------ GET & ADD COMPANY VALUES & COMPANY GOALS  ------------------------------------------

    let companyValues: { ValueId: number; Title: string; Description: string; }[] = [];
    let companyGoals: { GoalId: number; Title: string; Description: string; }[] = []

    const [companyId, setCompanyId] = useState('');



    // 1. Get Company ID from Company Master Table 
    const getCompanyId = () => { 
        const getCompanyUrl = 'https://localhost:44373/api/GetCompany';
        var result = null;
        let param = {
            "Email": CompanyData.Email,
            "Phone_Number": CompanyData.Phone_Number,
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

                        setCompanyId(id);
                        //submitCompanyGoalsAndValues(id);
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };




    // 2. Use CompanyId to get Values from Value Master Table and add results in the companyValues array.
    const getCompanyValues = () => {
        const getValuesUrl = 'https://localhost:44373/api/GetValueList'

        let values: { title: string; description: string; }[] = [ // ------------ temporary array until figure out how to dynamically add
            {
                title: CompanyData.CompanyValueTitle1,
                description: CompanyData.CompanyValueDescription1
            },
            {
                title: CompanyData.CompanyValueTitle2,
                description: CompanyData.CompanyValueDescription2
            },
        ];

        // -- loop to get all values that was put in the values array during sign up
        for (let i = 0; i < values.length; i++) {
            var result = null;
            let param = {
                "Title": values[i].title, 
                "Description": values[i].description 
            } 

            axios
                .get(getValuesUrl, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    params: param,
                })
                .then((response) => {
                    result = response.data;
                    if (result != null) {
                        if (result.length > 0) {
                            console.log(result);

                            // adding to companyValues array that was initiated
                            companyValues.push({
                                ValueId: result[0].ValueId,
                                Title: result[0].Title,
                                Description: result[0].Description
                            })
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        
    };




    // 3. Use CompanyId to get Goals from Goal Master Table and add results in the companyGoals array.
    const getCompanyGoals = () => {
        const getGoalsUrl = 'https://localhost:44373/api/GetGoalList'

        let goals: { title: string; description: string; }[] = [ // ------------ temporary array until figure out how to dynamically add
            {
                title: CompanyData.CompanyValueTitle1,
                description: CompanyData.CompanyValueDescription1
            },
            {
                title: CompanyData.CompanyValueTitle2,
                description: CompanyData.CompanyValueDescription2
            },
        ];

        // -- loop to get all goals that was put in the values array during sign up
        for (let i = 0; i < goals.length; i++) {
            var result = null;
            let param = {
                "Title": goals[i].title,
                "Description": goals[i].description
            }

            axios
                .get(getGoalsUrl, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    params: param,
                })
                .then((response) => {
                    result = response.data;
                    if (result != null) {
                        if (result.length > 0) {
                            console.log(result);

                            // adding to companyGoals array that was initiated
                            companyGoals.push({
                                GoalId: result[0].GoalId,
                                Title: result[0].Title,
                                Description: result[0].Description
                            })
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    };



    // 4. Add items from companyValues array to Company Values Table in database
    const addCompanyValues = () => {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };

        var addCompanyValueUrl = 'https://localhost:44373/api/AddCompanyValue';

        for (let i = 0; i < companyValues.length; i++) {
            let value = {
                CompanyId: companyId,
                ValueId: companyValues[i].ValueId
            }

            axios
                .post(addCompanyValueUrl, value, config)
                .then((response) => {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
    }




    // 5. Add items from companyGoals array to Company Goals Table in database
    const addCompanyGoals = () => {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };

        var addCompanyGoalUrl = 'https://localhost:44373/api/AddCompanyGoal';

        for (let i = 0; i < companyGoals.length; i++) {
            let goal = {
                CompanyId: companyId,
                GoalId: companyValues[i].ValueId
            }

            axios
                .post(addCompanyGoalUrl, goal, config)
                .then((response) => {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
    }

    function addCompanyGoalsAndCompanyValues() {
        addCompanyGoals();
        addCompanyValues();
    }



    // ------------------------------------------ COMPANY ADMIN SIGN UP ------------------------------------------

    // 1. --- ADD COMPANY ADMIN TO EMPLOYEE REGISTRATION TABLE
    const addCompanyAdminToEmployee = () => {
        const config = {
            headers: {'Content-Type': 'application/json'}
        }

        let companyAdmin = {
            "First_Name": CompanyAdminData.AdminFirstName,
            "Middle_Name": CompanyAdminData.AdminMiddleName,
            "Last_Name": CompanyAdminData.AdminLastName,
            "Nickname": CompanyAdminData.AdminNickname,
            "Email": CompanyAdminData.AdminEmail,
            "Phone_Number": CompanyAdminData.AdminPhoneNumber,
            "Address": CompanyAdminData.AdminAddress,
            "Birthday": CompanyAdminData.AdminBirthdate,
            "Linkedin": CompanyAdminData.AdminLinkedIn,
            "Facebook": CompanyAdminData.AdminFacebook,
            "Instagram": CompanyAdminData.AdminInstagram,
            "TikTok": CompanyAdminData.AdminTikTok,
            //"ProfilePhoto": CompanyAdminData.AdminProfilePhoto,
            "GenderId": CompanyAdminData.AdminGender,
            "CompanyId": companyId,
            "CountryId": CompanyAdminData.AdminCountryId,
            "Work": CompanyAdminData.AdminWork,
            "Connect": CompanyAdminData.AdminConnect,
            "Support": CompanyAdminData.AdminSupport,
            "Other_Notes": CompanyAdminData.AdminOtherNotes,
            //"FirstLogIn": "false" // still need to figure out the backend update for this
        }

        var addCompanyAdminUrl = 'https://localhost:44373/api/AddEmployee'

        axios
            .post(addCompanyAdminUrl, companyAdmin, config)
            .then(response => {
                // Handle the response from the server
                console.log(response.data);
            }).catch(function (error) {
                console.log(error);
            });
    }

    // 2. --- ADD COMPANY ADMIN TO OWS
    const [companyAdminId, setCompanyAdminId] = useState('')

    // -------- 2.1 --- GET COMPANY ADMIN ID
    const getCompamuAdminId = () => {

        const getCompanyAdminUrl = 'https://localhost:44373/api/GetAllEmployees';

        var result = null;
        let param = {
            "Email": CompanyAdminData.AdminEmail,
            "Phone_Number": CompanyAdminData.AdminPhoneNumber
        }

        axios
            .get(getCompanyAdminUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                params: param,
            })
            .then((response) => {
                result = response.data;
                if (result != null) {
                    if (result.length > 0) {
                        console.log(result);

                        //setting company admin id
                        let id = result[0].EmployeeId
                        setCompanyAdminId(id)
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // -------- 2.2 --- ADD COMPANY ADMIN INFO TO OWS
    const addCompanyAdminToOWS = () => {
        const config = {
            headers: { 'Content-Type': 'application/json' }
        }

        const addToOWSUrl = 'http://localhost:58258/api/AddSystemUsers';

        let user = {
            "UserCode": companyAdminId, // FK from referencing from Registration table
            "UserName": CompanyAdminData.AdminEmail,
            "Password": CompanyAdminData.AdminPassword
        }

        axios
            .post(addToOWSUrl, user, config)
            .then((response) => {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    function addCompanyAdmin() {
        // 2.1 Get Company Admin ID
        getCompamuAdminId();
        // 2.2 Add Company Admin to OWS
        addCompanyAdminToOWS();
    }

    // ------------------------------------------ FRONT-END ------------------------------------------
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
