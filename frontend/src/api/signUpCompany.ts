import axios from "axios";
import { CompanyFormData } from "../types/formTypes";

/*
 * NOTE: Currently not working, cannot use "setCompanyId" from useUserContext since this file is not a React Component
 * Everything else works except for setting the companyId to be used in Company Admin's Sign Up process.
 */
const signUpCompany = async (
  CompanyData: CompanyFormData,
  companyId: string,
  setCompanyId: (id: string) => void,
) => {
  const company_info = {
    Name: CompanyData.companyName,
    Email: CompanyData.companyEmail,
    Logo: CompanyData.companyLogo,
    Phone_Number: CompanyData.companyPhoneNumber,
    Website: CompanyData.companyWebsite,
    FoundingDate: CompanyData.companyFoundingDate,
    Vision: CompanyData.companyVision,
    Mission: CompanyData.companyMission,
    CountryId: CompanyData.companyCountryId,
    IndustryTypeId: CompanyData.companyIndustryTypeId,
    CompanySize: CompanyData.companySize,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
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

    if (addCompany) {
      const getCompanyUrl = "https://localhost:44373/api/GetCompany";

      const company = await axios
        .get(getCompanyUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: {
            Email: CompanyData.companyEmail,
            Phone_Number: CompanyData.companyPhoneNumber,
          },
        })
        .then((response) => {
          const result = response.data;
          if (result && result.length > 0) {
            const id = result[0].CompanyId;
            setCompanyId(id);
            return result[0];
          }
        })
        .catch((error) => {
          console.log(error);
        });

      if (company) {
        const addCompanyGoalUrl = "https://localhost:44373/api/AddCompanyGoal";

        const values: {
          title: string;
          description: string;
        }[] = CompanyData.companyValues;

        const goals: {
          title: string;
          description: string;
          durationTo: string;
        }[] = CompanyData.companyGoals;

        for (let i = 0; i < values.length; i++) {
          const addValuesUrl = "https://localhost:44373/api/AddValue";
          const value = {
            Title: values[i].title,
            Description: values[i].description,
          };

          const toMasterValue = await axios
            .post(addValuesUrl, value, config)
            .then((response) => {
              console.log(response.data);
              return response.data;
            })
            .catch((error) => {
              console.log(error);
            });

          if (toMasterValue) {
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

                if (result && result.length > 0) {
                  return result[0];
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
      }
    }
  } catch (error) {
    // Handle network or other error
    console.error("An error occurred:", error);
  }
};

export default signUpCompany;
