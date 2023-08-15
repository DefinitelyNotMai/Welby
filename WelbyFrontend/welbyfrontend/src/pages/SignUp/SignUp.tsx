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

    const [companyId, setCompanyId] = useState("");
    const [companyAdminId, setCompanyAdminId] = useState('')

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

    
    const companySignUp = () => { // temporary sign up?

        nextStep();
    };

    const companyAdminSignUp = () => { // temporary sign up?
        
        navigate('/');
    };

    //Company Sign Up
    const handleCompanySignUp = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
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

        let goals: { title: string; description: string; durationTo: string; }[] = [ // ------------ needs to change once dynamically adding of values is there, might not be needed
            {
                title: CompanyData.CompanyGoalTitle1,
                description: CompanyData.CompanyGoalDescription1,
                durationTo: CompanyData.CompanyGoalCompletedBy1
            }
        ];

        try {
            //#region 1 --------------  Add Company
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

            const addCompany = await axios // sends company ot backend
                .post(addCompanyUrl, company, config)
                .then((response) => {
                    // Handle the response from the server
                    console.log(response.data);
                    return response.data // returns company info as an object
                })
            //#endregion

            
            if (addCompany != null) { 
                // if addition of company is successful, it gets the company id that was generatad

                //#region 2 --------------  Get CompanyId
                const getCompanyUrl = 'https://localhost:44373/api/GetCompany';
                var result = null;
                let param = {
                    "Email": CompanyData.Email,
                    "Phone_Number": CompanyData.Phone_Number,
                };

                const company = await axios // get method
                    .get(getCompanyUrl, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        params: param,
                    })
                    .then((response) => {
                        result = response.data;
                        if (result != null) {
                            if (result.length > 0) {
                                console.log(result[0]);
                                let id = result[0].CompanyId;
                                setCompanyId(id); // sets CompanyId variable

                                return result[0]; // returns the whole company object <---- what's being used in the program
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                    //#endregion

                if (company != null) { 
                    // when company id or object is present, it will continue to add Value in Values Master then get the ValueId generated to use it with CompanyId to put to Company Values Table

                    //#region 3.0 --------------   Add Company Value and Goals
                    // urls declaration outside the loops to avoid re-declration
                    var addValuesUrl = 'https://localhost:44373/api/AddValue';
                    var getValuesUrl = 'https://localhost:44373/api/GetValueByTitleDescription'
                    var addCompanyValueUrl = 'https://localhost:44373/api/AddCompanyValues';

                    var addGoalsUrl = 'https://localhost:44373/api/AddGoal';
                    var getGoalsUrl = 'https://localhost:44373/api/GetGoalByTitleDescription'
                    var addCompanyGoalUrl = 'https://localhost:44373/api/AddCompanyGoal';

                     
                    for (let x = 0; x < values.length; x++) { 
                        //#region 3.1 --- Add Value To Master Table
                        let value = {
                            "Title": values[x].title,
                            "Description": values[x].description
                        };

                        // send value to backend
                        const masterValue = await axios
                            .post(addValuesUrl, value, config)
                            .then((response) => {
                                // Handle the response from the server
                                console.log(response.data);
                                return response.data;
                            })
                        //#endregion

                        //#region 3.2 --- Get the Value Id
                        if (masterValue != null) {
                            // if value successfully added to master, it will retrieve the generated value id
                            var result = null;

                            console.log(param)
                            const getValue = await axios
                                .get(getValuesUrl, {
                                    method: 'GET',
                                    headers: { 'Content-Type': 'application/json' },
                                    params: value,
                                })
                                .then((response) => {
                                    result = response.data;
                                    if (result != null) {
                                        if (result.length > 0) {
                                            console.log(result);

                                            return result[0]
                                        }
                                    }
                                });
                         //#endregion

                        //#region 3.3 --- Add Company Value using ValueId from Master and CompanyId
                            if (getValue != null) {
                                console.log("Value: " + value)
                                let companyValue = {
                                    "CompanyId": company.CompanyId,
                                    "ValueId": getValue.ValueId
                                }
                                console.log("Company Value: " + companyValue)
                                axios
                                    .post(addCompanyValueUrl, companyValue, config)
                                    .then((response) => {
                                        console.log(response.data);
                                    })
                                    .catch(function (error) {
                                        console.log(error)
                                    });
                                }
                        }
                        //#endregion
                    }
                    

                    for (let x = 0; x < goals.length; x++) {
                        //#region 3.4 --- Add Goals to Master Table
                        let goal = {
                            "Title": goals[x].title,
                            "Description": goals[x].description,
                            "DurationTo": goals[x].durationTo
                        };
                        console.log(goal)
                        // send to backend
                        const masterGoal = await axios
                            .post(addGoalsUrl, goal, config)
                            .then((response) => {
                                // Handle the response from the server
                                console.log(response.data);
                                return response.data
                            })
                         //#endregion

                        // #region 3.5 --- Get the GoalId
                        if (masterGoal != null) {
                            var result = null;

                            const getGoal = await axios
                                .get(getGoalsUrl, {
                                    method: 'GET',
                                    headers: { 'Content-Type': 'application/json' },
                                    params: goal,
                                })
                                .then((response) => {
                                    result = response.data;
                                    if (result != null) {
                                        if (result.length > 0) {
                                            console.log(result);

                                            return result[0]
                                        }
                                    }
                                });
                                //#endregion

                        //#region 3.6 --- Add Company Goal using GoalId and CompanyId
                            if (getGoal != null) {
                                console.log("Goal: "+goal)
                                let companyGoal = {
                                    CompanyId: company.CompanyId,
                                    GoalId: getGoal.GoalId
                                }
                                console.log("Company Goal: " + companyGoal)
                                axios
                                    .post(addCompanyGoalUrl, companyGoal, config)
                                    .then((response) => {
                                        console.log(response.data);
                                    })
                                    .catch(function (error) {
                                        console.log(error)
                                    });
                            }

                            //#endregion

                        }
                        
                    }
                    
                    //#endregion
                }
                    
            }
        }
        catch (error) {
            // Handle network or other error
            console.error('An error occurred:', error);
        }

        nextStep();

    }

    //Company Admin Sign Up
    const handleCompanyAdminSignUp = async () => {
        const config = {
            headers: { 'Content-Type': 'application/json' }
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

        try {
            const addCompanyAdmin = await axios
                .post(addCompanyAdminUrl, companyAdmin, config)
                .then(response => {
                    // Handle the response from the server
                    console.log("adding");
                    console.log(response.data);
                    return response.data;
                }).catch(function (error) {
                    console.log(error);
                });
            if (addCompanyAdmin != null) {
                const getCompanyAdminUrl = 'https://localhost:44373/api/GetAllEmployees';

                var result = null;
                let param = {
                    "Email": CompanyAdminData.AdminEmail,
                    "Phone_Number": CompanyAdminData.AdminPhoneNumber
                }

                const companyAdmin = await axios
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
                                return result[0]
                            }
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                if (companyAdmin != null) {
                    const tokenUrl = 'http://localhost:58258/token';
                    let header = {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin': '*',
                    };

                    const formData = new URLSearchParams();
                    formData.append('grant_type', 'password');
                    formData.append('username', "micahangelachua@email.com");
                    formData.append('password', "password");

                    const tokenResponse = await fetch(tokenUrl, {
                        method: 'POST',
                        headers: header,
                        body: formData,
                    }).then((res) => {
                        return res.json();
                    }).catch(function (error) {
                        console.log(error);
                    });
                    if (tokenResponse != null) {
                        var token = tokenResponse.access_token;
                        const addToOWSUrl = 'http://localhost:58258/api/AddSystemUsers';

                        let user = {
                            "UserCode": companyAdmin.EmployeeId, // from WelbyAPI EmployeeId
                            "UserName": CompanyAdminData.AdminEmail,
                            "Password": CompanyAdminData.AdminPassword,
                            "AccountLocked": false,
                            "LoggedIn": false,
                            "PasswordNoExpiry": null,
                            "ExpiryDays": null,
                            "AccountVerified": null,
                            "VerifiedDate": null,
                            "CurrentOTP": null,
                            "Encoded_By": 24286,
                            "Active": true
                        }

                        axios
                            .post(addToOWSUrl, user, {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                }

                            })
                            .then((response) => {
                                console.log("asdfghjk")
                                console.log(response.data);
                            })
                            .catch(function (error) {
                                console.log(error)
                            });
                    }
                    if (tokenResponse.ok) {
                        // Handle successful API tokenResponse
                        let json = tokenResponse;
                        console.log('Signup successful');
                    } else {
                        // Handle API error
                        console.error('Signup failed');
                    }
                }
            }

        }
        catch (error) {
            // Handle network or other error
            console.error('An error occurred:', error);
        }

        navigate('/');
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
                            <MainFormButton width="50%" onClickEvent={handleCompanySignUp}>
                                <Text>Proceed to Admin Sign Up</Text>
                            </MainFormButton>
                        ) : (
                            <MainFormButton
                                width="25%"
                                onClickEvent={currentStepIndex === steps.length - 1 ? handleCompanyAdminSignUp : nextStep}
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
