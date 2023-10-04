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
import bcrypt from 'bcryptjs'

export type CompanyFormData = { 
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
    AdminProfilePhoto: string;
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
    AdminProfilePhoto: '',
    AdminWork: '',
    AdminConnect: '',
    AdminSupport: '',
    AdminOtherNotes: '',
}

const SignUp = () => {
    const [CompanyData, setCompanyData] = useState(COMPANY_INITIAL_DATA);
    const [CompanyAdminData, setCompanyAdminData] = useState(COMPANY_ADMIN_INITIAL_DATA);

    const [companyId, setCompanyId] = useState("");

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

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
        <Step5 {...CompanyAdminData} CompanyData={CompanyData} updateFields={updateCompanyAdminFields} />,
        <Step6 {...CompanyAdminData} updateFields={updateCompanyAdminFields} />,
    ]);


    const tempSignUp = () => { // temporary sign up?

        nextStep();
    };

    const tempAdminSignUp = () => { // temporary sign up?

        navigate('/');
    };

    const handleCompanyRegistration = async () => {
        let company_info = {
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

        try {
            var addCompanyUrl = 'https://localhost:44373/api/AddCompany';
            const addCompany = await axios
                .post(addCompanyUrl, company_info, config)
                .then((response) => {
                    // Handle the response from the server
                    console.log(response.data);
                    return response.data;
                }).catch((error) => {
                    console.log(error);
                })

            if (addCompany != null) {
                const getCompanyUrl = 'https://localhost:44373/api/GetCompany';
                let param = {
                    "Email": CompanyData.Email,
                    "Phone_Number": CompanyData.Phone_Number
                };

                const company = await axios
                    .get(getCompanyUrl, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        params: param,
                    }).then((response) => {
                        var result = response.data;
                        if (result != null) {
                            if (result.length > 0) {
                                let id = result[0].CompanyId;
                                setCompanyId(id);

                                return result[0]
                            }
                        }
                    }).catch((error) => {
                        console.log(error);
                    });

                if (company != null) {


                    var addCompanyGoalUrl = 'https://localhost:44373/api/AddCompanyGoal';

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


                    for (let i = 0; i < values.length; i++) {
                        var addValuesUrl = 'https://localhost:44373/api/AddValue';
                        let value = {
                            "Title": values[i].title,
                            "Description": values[i].description
                        };

                        const toMasterValue = await axios
                            .post(addValuesUrl, value, config)
                            .then((response) => {
                                // Handle the response from the server
                                console.log(response.data);
                                return response.data;
                            }).catch((error) => {
                                console.log(error)
                            });

                        if (toMasterValue != null) {
                            var getValuesUrl = 'https://localhost:44373/api/GetValueByTitleDescription'
                            const getValue = await axios
                                .get(getValuesUrl, {
                                    method: 'GET',
                                    headers: { 'Content-Type': 'application/json' },
                                    params: value,
                                })
                                .then((response) => {
                                    var result = response.data;
                                    if (result != null) {
                                        if (result.length > 0) {
                                            //console.log(result);

                                            return result[0]
                                        }
                                    }
                                }).catch((error) => {
                                    console.log(error)
                                });

                            if (getValue != null) {
                                var addCompanyValueUrl = 'https://localhost:44373/api/AddCompanyValues';
                                let companyValue = {
                                    "CompanyId": companyId,
                                    "ValueId": getValue.ValueId
                                }

                                axios
                                    .post(addCompanyValueUrl, companyValue, config)
                                    .then((response) => {
                                        console.log(response.data);
                                        console.log("Added company value")
                                    })
                                    .catch(function (error) {
                                        console.log(error)
                                    });
                            }
                        }
                    }

                    for (let i = 0; i < goals.length; i++) {
                        var addGoalsUrl = 'https://localhost:44373/api/AddGoal';
                        let goal = {
                            "Title": goals[i].title,
                            "Description": goals[i].description,
                            "DurationTo": goals[i].durationTo
                        }

                        const masterGoal = await axios
                            .post(addGoalsUrl, goal, config)
                            .then((response) => {
                                // Handle the response from the server
                                //console.log(response.data);
                                return response.data
                            }).catch((error) => {
                                console.log(error)
                            });

                        if (masterGoal != null) {
                            var getGoalsUrl = 'https://localhost:44373/api/GetGoalByTitleDescription'
                            const getGoal = await axios
                                .get(getGoalsUrl, {
                                    method: 'GET',
                                    headers: { 'Content-Type': 'application/json' },
                                    params: goal
                                }).then((response) => {
                                    var result = response.data
                                    if (result != null) {
                                        if (result.length > 0) {
                                            return result[0]
                                        }
                                    }
                                }).catch((error) => {
                                    console.log(error)
                                });

                            if (getGoal != null) {
                                let companyGoal = {
                                    "CompanyId": companyId,
                                    "GoalId": getGoal.GoalId
                                }

                                axios
                                    .post(addCompanyGoalUrl, companyGoal, config)
                                    .then((response) => {
                                        console.log(response.data);
                                        console.log("Added company goals")
                                    })
                                    .catch(function (error) {
                                        console.log(error)
                                    });
                            }
                        }
                    }

                    nextStep();
                }
            }

        } catch (error) {
            // Handle network or other error
            console.error('An error occurred:', error);
        }
    };

    const handleCompanyAdminSignUp = async () => {
        let companyAdmin = {
            "First_Name": CompanyAdminData.AdminFirstName,
            "Middle_Name": CompanyAdminData.AdminMiddleName,
            "Last_Name": CompanyAdminData.AdminLastName,
            "Nickname": CompanyAdminData.AdminNickname,
            "Email": CompanyData.Email,
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
            "FirstLogIn": 0
        }

        try {
            var addCompanyAdminUrl = 'https://localhost:44373/api/AddEmployee'
            const addCompanyAdmin = await axios
                .post(addCompanyAdminUrl, companyAdmin, config)
                .then((response) => {
                    console.log(response.data)
                    return response.data
                }).catch((error) => {
                    console.log(error)
                });

            if (addCompanyAdmin != null) {
                const getCompanyAdminUrl = 'https://localhost:44373/api/GetAllEmployees';
                let param = {
                    "Email": CompanyData.Email,
                    "Phone_Number": CompanyAdminData.AdminPhoneNumber
                }

                const companyAdmin = await axios
                    .get(getCompanyAdminUrl, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        params: param,
                    })
                    .then((response) => {
                        var result = response.data;
                        if (result != null) {
                            if (result.length > 0) {
                                console.log(result);
                                console.log("added to welby")
                                //setting company admin id
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

                    const adminUserName = "Venancio"
                    const adminUserPassword = "Jones"

                    const formData = new URLSearchParams();
                    formData.append('grant_type', 'password');
                    formData.append('username', adminUserName);
                    formData.append('password', adminUserPassword);

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

                        const hashedPassword = await bcrypt.hash(CompanyAdminData.AdminPassword, 10)

                        let user = {
                            "UserCode": companyAdmin.EmployeeId,
                            "UserName": CompanyData.Email,
                            "Password": hashedPassword,
                            "AccountLocked": 0,
                            "LoggedIn": 0,
                            "PasswordNoExpiry": null,
                            "ExpiryDays": null,
                            "AccountVerified": null,
                            "VerifiedDate": null,
                            "Encoded_By": 24286,
                            "Active": true
                        }

                        const addToOWS = await axios
                            .post(addToOWSUrl, user, {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                }

                            })
                            .then((response) => {
                                console.log(response.data);
                                //alert("Success! Log in to access your dashboard.")
                                console.log("Successfully added to OWS")
                                return response.data
                                //navigate('/')
                            })
                            .catch(function (error) {
                                console.log(error)
                            });

                        if (addToOWS != null) {
                            const tokenUrl = 'http://localhost:58258/token';
                            let header = {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Access-Control-Allow-Origin': '*',
                            };

                            const adminUserName = "Venancio"
                            const adminUserPassword = "Jones"

                            const formData = new URLSearchParams();
                            formData.append('grant_type', 'password');
                            formData.append('username', adminUserName);
                            formData.append('password', adminUserPassword);

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
                                const mapCompanyAdminrUrl = 'http://localhost:58258/api/MapSystemUsersToSecurityGroupMapping';

                                let mapAdmin = {
                                    "SecurityGroupId": 5,
                                    "UserId": addToOWS.UserId,
                                    "Encoded_By": 24286
                                }
                               

                                axios
                                    .post(mapCompanyAdminrUrl, mapAdmin, {
                                        headers: {
                                            'Authorization': `Bearer ${token}`,
                                            'Content-Type': 'application/json',
                                        }

                                    })
                                    .then((response) => {
                                        console.log(response.data);
                                        alert("Success! Log in to access your dashboard.")
                                        console.log("Mapped Admin")
                                        navigate('/')
                                        return response.data                                    })
                                    .catch(function (error) {
                                        console.log(error)
                                    });
                            }
                        }
                        
                    }   

                }
            }

        } catch (error) {
            console.log('An error ocurred:', error)
        }
    }


    // ------------------------------------------ FRONT-END ------------------------------------------
    return (
        <MainLayout>
            <MainHeader />
            <Heading textAlign="center">
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
                            <MainFormButton width="50%" onClickEvent={handleCompanyRegistration}>
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
