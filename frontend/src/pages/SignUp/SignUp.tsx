import { Flex, Grid } from "@chakra-ui/react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import CustomText from "../../components/CustomText";
import WelcomeCard from "../../components/Welcome/WelcomeCard";
import useMultiStepForm from "../../hooks/useMultiStepForm";
import WelcomeLayout from "../../layout/WelcomeLayout";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";

export type CompanyFormData = {
  // Step1
  Name: string;
  Email: string;
  Logo: string;
  Website: string;
  CompanySize: string;
  Phone_Number: string;
  FoundingDate: string;
  CountryId: string; //can be string because it is being converted in the backend
  IndustryTypeId: string; //can be string because it is being converted in the backend

  // Step2
  Vision: string;
  Mission: string;

  // Step 3
  CompanyValues: {
    title: string;
    description: string;
  }[];

  // Step 4
  CompanyGoals: {
    title: string;
    description: string;
    durationTo: string;
  }[];
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
};

const COMPANY_INITIAL_DATA: CompanyFormData = {
  Name: "",
  Email: "",
  Logo: "",
  Website: "",
  CompanySize: "",
  Phone_Number: "",
  FoundingDate: "",
  CountryId: "",
  IndustryTypeId: "",

  Vision: "",
  Mission: "",

  CompanyValues: [{ title: "", description: "" }],

  CompanyGoals: [{ title: "", description: "", durationTo: "" }],
};

const COMPANY_ADMIN_INITIAL_DATA: CompanyAdminFormData = {
  // Step5
  AdminEmail: "",
  AdminPassword: "",
  AdminConfirmPassword: "",
  AdminFirstName: "",
  AdminNickname: "",
  AdminMiddleName: "",
  AdminLastName: "",
  AdminBirthdate: "",
  AdminGender: "",
  AdminPhoneNumber: "",

  // Step6
  AdminAddress: "",
  AdminCountryId: "",
  AdminFacebook: "",
  AdminInstagram: "",
  AdminLinkedIn: "",
  AdminTikTok: "",
  AdminProfilePhoto: "",
  AdminWork: "",
  AdminConnect: "",
  AdminSupport: "",
  AdminOtherNotes: "",
};

const SignUp = () => {
  const [CompanyData, setCompanyData] = useState(COMPANY_INITIAL_DATA);
  const [CompanyAdminData, setCompanyAdminData] = useState(
    COMPANY_ADMIN_INITIAL_DATA,
  );

  const [companyId, setCompanyId] = useState("");

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const navigate = useNavigate();

  const updateCompanyFields = (fields: Partial<CompanyFormData>) => {
    setCompanyData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const updateCompanyAdminFields = (fields: Partial<CompanyAdminFormData>) => {
    setCompanyAdminData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const {
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    prevStep,
    nextStep,
  } = useMultiStepForm([
    <Step1 key={1} {...CompanyData} updateFields={updateCompanyFields} />,
    <Step2 key={2} {...CompanyData} updateFields={updateCompanyFields} />,
    <Step3 key={3} {...CompanyData} updateFields={updateCompanyFields} />,
    <Step4 key={4} {...CompanyData} updateFields={updateCompanyFields} />,
    <Step5 key={5} {...CompanyData} />,
    <Step6
      key={6}
      {...CompanyAdminData}
      CompanyData={CompanyData}
      updateFields={updateCompanyAdminFields}
    />,
    <Step7
      key={7}
      {...CompanyAdminData}
      updateFields={updateCompanyAdminFields}
    />,
  ]);

  const handleCompanyRegistration = async () => {
    const company_info = {
      Name: CompanyData.Name,
      Email: CompanyData.Email,
      Logo: CompanyData.Logo,
      Phone_Number: CompanyData.Phone_Number,
      Website: CompanyData.Website,
      FoundingDate: CompanyData.FoundingDate,
      Vision: CompanyData.Vision,
      Mission: CompanyData.Mission,
      CountryId: CompanyData.CountryId,
      IndustryTypeId: CompanyData.IndustryTypeId,
      CompanySize: CompanyData.CompanySize,
    };

    try {
      const addCompanyUrl = "https://localhost:44373/api/AddCompany";
      const addCompany = await axios
        .post(addCompanyUrl, company_info, config)
        .then((response) => {
          // Handle the response from the server
          console.log(response.data);
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      if (addCompany != null) {
        const getCompanyUrl = "https://localhost:44373/api/GetCompany";
        const param = {
          Email: CompanyData.Email,
          Phone_Number: CompanyData.Phone_Number,
        };

        const company = await axios
          .get(getCompanyUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            params: param,
          })
          .then((response) => {
            const result = response.data;
            if (result != null) {
              if (result.length > 0) {
                const id = result[0].CompanyId;
                setCompanyId(id);

                return result[0];
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });

        if (company != null) {
          const addCompanyGoalUrl =
            "https://localhost:44373/api/AddCompanyGoal";

          const values: {
            title: string;
            description: string;
          }[] = CompanyData.CompanyValues;

          const goals: {
            title: string;
            description: string;
            durationTo: string;
          }[] = CompanyData.CompanyGoals;

          for (let i = 0; i < values.length; i++) {
            const addValuesUrl = "https://localhost:44373/api/AddValue";
            const value = {
              Title: values[i].title,
              Description: values[i].description,
            };

            const toMasterValue = await axios
              .post(addValuesUrl, value, config)
              .then((response) => {
                // Handle the response from the server
                console.log(response.data);
                return response.data;
              })
              .catch((error) => {
                console.log(error);
              });

            if (toMasterValue != null) {
              const getValuesUrl =
                "https://localhost:44373/api/GetValueByTitleDescription";
              const getValue = await axios
                .get(getValuesUrl, {
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
                  params: value,
                })
                .then((response) => {
                  const result = response.data;
                  if (result != null) {
                    if (result.length > 0) {
                      //console.log(result);

                      return result[0];
                    }
                  }
                })
                .catch((error) => {
                  console.log(error);
                });

              if (getValue != null) {
                const addCompanyValueUrl =
                  "https://localhost:44373/api/AddCompanyValues";
                const companyValue = {
                  CompanyId: companyId,
                  ValueId: getValue.ValueId,
                };

                axios
                  .post(addCompanyValueUrl, companyValue, config)
                  .then((response) => {
                    console.log(response.data);
                    console.log("Added company value");
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }
            }
          }

          for (let i = 0; i < goals.length; i++) {
            const addGoalsUrl = "https://localhost:44373/api/AddGoal";
            const goal = {
              Title: goals[i].title,
              Description: goals[i].description,
              DurationTo: goals[i].durationTo,
            };

            const masterGoal = await axios
              .post(addGoalsUrl, goal, config)
              .then((response) => {
                // Handle the response from the server
                //console.log(response.data);
                return response.data;
              })
              .catch((error) => {
                console.log(error);
              });

            if (masterGoal != null) {
              const getGoalsUrl =
                "https://localhost:44373/api/GetGoalByTitleDescription";
              const getGoal = await axios
                .get(getGoalsUrl, {
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
                  params: goal,
                })
                .then((response) => {
                  const result = response.data;
                  if (result != null) {
                    if (result.length > 0) {
                      return result[0];
                    }
                  }
                })
                .catch((error) => {
                  console.log(error);
                });

              if (getGoal != null) {
                const companyGoal = {
                  CompanyId: companyId,
                  GoalId: getGoal.GoalId,
                };

                axios
                  .post(addCompanyGoalUrl, companyGoal, config)
                  .then((response) => {
                    console.log(response.data);
                    console.log("Added company goals");
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }
            }
          }

          nextStep();
        }
      }
    } catch (error) {
      // Handle network or other error
      console.error("An error occurred:", error);
    }
  };

  const handleCompanyAdminSignUp = async () => {
    const companyAdmin = {
      First_Name: CompanyAdminData.AdminFirstName,
      Middle_Name: CompanyAdminData.AdminMiddleName,
      Last_Name: CompanyAdminData.AdminLastName,
      Nickname: CompanyAdminData.AdminNickname,
      Email: CompanyData.Email,
      Phone_Number: CompanyAdminData.AdminPhoneNumber,
      Address: CompanyAdminData.AdminAddress,
      Birthday: CompanyAdminData.AdminBirthdate,
      Linkedin: CompanyAdminData.AdminLinkedIn,
      Facebook: CompanyAdminData.AdminFacebook,
      Instagram: CompanyAdminData.AdminInstagram,
      TikTok: CompanyAdminData.AdminTikTok,
      ProfilePhoto: CompanyAdminData.AdminProfilePhoto,
      GenderId: CompanyAdminData.AdminGender,
      CompanyId: companyId,
      CountryId: CompanyAdminData.AdminCountryId,
      Work: CompanyAdminData.AdminWork,
      Connect: CompanyAdminData.AdminConnect,
      Support: CompanyAdminData.AdminSupport,
      Other_Notes: CompanyAdminData.AdminOtherNotes,
      FirstLogIn: 0,
    };

    try {
      const addCompanyAdminUrl = "https://localhost:44373/api/AddEmployee";
      const addCompanyAdmin = await axios
        .post(addCompanyAdminUrl, companyAdmin, config)
        .then((response) => {
          console.log(response.data);
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      if (addCompanyAdmin != null) {
        const getCompanyAdminUrl =
          "https://localhost:44373/api/GetAllEmployees";
        const param = {
          Email: CompanyData.Email,
          Phone_Number: CompanyAdminData.AdminPhoneNumber,
        };

        const companyAdmin = await axios
          .get(getCompanyAdminUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            params: param,
          })
          .then((response) => {
            const result = response.data;
            if (result != null) {
              if (result.length > 0) {
                console.log(result);
                console.log("added to welby");
                //setting company admin id
                return result[0];
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });

        if (companyAdmin != null) {
          const tokenUrl = "http://localhost:58258/token";
          const header = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
          };

          const adminUserName = "Venancio";
          const adminUserPassword = "Jones";

          const formData = new URLSearchParams();
          formData.append("grant_type", "password");
          formData.append("username", adminUserName);
          formData.append("password", adminUserPassword);

          const tokenResponse = await fetch(tokenUrl, {
            method: "POST",
            headers: header,
            body: formData,
          })
            .then((res) => {
              return res.json();
            })
            .catch(function (error) {
              console.log(error);
            });

          if (tokenResponse != null) {
            const token = tokenResponse.access_token;
            const addToOWSUrl = "http://localhost:58258/api/AddSystemUsers";

            const hashedPassword = await bcrypt.hash(
              CompanyAdminData.AdminPassword,
              10,
            );

            const user = {
              UserCode: companyAdmin.EmployeeId,
              UserName: CompanyData.Email,
              Password: hashedPassword,
              AccountLocked: 0,
              LoggedIn: 0,
              PasswordNoExpiry: null,
              ExpiryDays: null,
              AccountVerified: null,
              VerifiedDate: null,
              Encoded_By: 24286,
              Active: true,
            };

            const addToOWS = await axios
              .post(addToOWSUrl, user, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              })
              .then((response) => {
                console.log(response.data);
                //alert("Success! Log in to access your dashboard.")
                console.log("Successfully added to OWS");
                return response.data;
                //navigate('/')
              })
              .catch(function (error) {
                console.log(error);
              });

            if (addToOWS != null) {
              const tokenUrl = "http://localhost:58258/token";
              const header = {
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*",
              };

              const adminUserName = "Venancio";
              const adminUserPassword = "Jones";

              const formData = new URLSearchParams();
              formData.append("grant_type", "password");
              formData.append("username", adminUserName);
              formData.append("password", adminUserPassword);

              const tokenResponse = await fetch(tokenUrl, {
                method: "POST",
                headers: header,
                body: formData,
              })
                .then((res) => {
                  return res.json();
                })
                .catch(function (error) {
                  console.log(error);
                });

              if (tokenResponse != null) {
                const token = tokenResponse.access_token;
                const mapCompanyAdminrUrl =
                  "http://localhost:58258/api/MapSystemUsersToSecurityGroupMapping";

                const mapAdmin = {
                  SecurityGroupId: 5,
                  UserId: addToOWS.UserId,
                  Encoded_By: 24286,
                };

                axios
                  .post(mapCompanyAdminrUrl, mapAdmin, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  })
                  .then((response) => {
                    console.log(response.data);
                    alert("Success! Log in to access your dashboard.");
                    console.log("Mapped Admin");
                    navigate("/");
                    return response.data;
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }
            }
          }
        }
      }
    } catch (error) {
      console.log("An error ocurred:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLastStep && currentStepIndex !== 3) {
      console.log(CompanyData);
      nextStep();
    } else if (currentStepIndex === 3) {
      console.log("Calling handleCompanyRegistration");
      handleCompanyRegistration();
    } else {
      handleCompanyAdminSignUp();
    }
  };
  // ------------------------------------------ FRONT-END ------------------------------------------
  return (
    <WelcomeLayout>
      <WelcomeCard>
        <Flex flexDirection="column" width="full">
          <Form onSubmit={handleSubmit}>
            {step}
            {isFirstStep || currentStepIndex === 5 ? (
              <Grid templateColumns={["1fr", "1fr 2fr"]}>
                <Flex
                  flexDirection="row"
                  backgroundColor={
                    currentStepIndex === 5 ? "#24a2f0" : "#ffffff"
                  }
                  borderBottomLeftRadius="xl"
                />
                <Flex
                  flexDirection="row-reverse"
                  marginRight={8}
                  marginBottom={4}
                >
                  <CustomButton
                    onClick={() => {}}
                    type="submit"
                    width={["25%"]}
                  >
                    <CustomText fontWeight="medium">NEXT</CustomText>
                  </CustomButton>
                </Flex>
              </Grid>
            ) : (
              <Flex
                flexDirection="row"
                justifyContent="space-evenly"
                marginBottom={[2, 4]}
              >
                {currentStepIndex !== 4 && !isFirstStep && (
                  <CustomButton
                    onClick={prevStep}
                    type="button"
                    width={["25%"]}
                  >
                    <CustomText fontWeight="medium">BACK</CustomText>
                  </CustomButton>
                )}
                <CustomButton
                  backgroundColor={
                    currentStepIndex === 3 || currentStepIndex === 4
                      ? "ffffff"
                      : "#24a2f0"
                  }
                  onClick={() => {}}
                  type="submit"
                  width={["55%", "25%"]}
                >
                  <CustomText
                    color={
                      currentStepIndex === 3 || currentStepIndex === 4
                        ? "#757575"
                        : undefined
                    }
                    fontWeight="medium"
                  >
                    {currentStepIndex === 3 || currentStepIndex === 6
                      ? "SUBMIT"
                      : currentStepIndex === 4
                      ? "Proceed to Admin Sign Up"
                      : "NEXT"}
                  </CustomText>
                </CustomButton>
              </Flex>
            )}
          </Form>
        </Flex>
      </WelcomeCard>
    </WelcomeLayout>
  );
};

export default SignUp;
