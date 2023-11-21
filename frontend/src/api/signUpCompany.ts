// lib
import axios from "axios";

// local
import { CompanyFormData } from "../data/typesForm";

export const signUpCompany = async (
  CompanyData: CompanyFormData,
  companyId: string,
  setCompanyId: (id: string) => void,
) => {
  const company_info = {
    Name: CompanyData.Name,
    Email: CompanyData.companyEmail,
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
        // console.log(response.data)
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
            Phone_Number: CompanyData.Phone_Number,
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
        const Values: {
          title: string;
          description: string;
        }[] = CompanyData.Values;

        const Goals: {
          title: string;
          description: string;
          durationTo: string;
        }[] = CompanyData.Goals;

        for (let i = 0; i < Values.length; i++) {
          const addValuesUrl = "https://localhost:44373/api/AddValue";
          const value = {
            Title: Values[i].title,
            Description: Values[i].description,
          };

          const toMasterValue = await axios
            .post(addValuesUrl, value, config)
            .then((response) => {
              // console.log(response.data)
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
                headers: { "Content-Type": "application.json" },
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

            if (getValue) {
              const addCompanyValueUrl =
                "https://localhost:44373/api/AddCompanyValues";

              const companyValue = {
                CompanyId: companyId,
                ValueId: getValue.ValueId,
              };

              axios
                .post(addCompanyValueUrl, companyValue, config)
                .then(() => {
                  // (response)
                  // console.log(response.data)
                  console.log("Added company value");
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          }
        }

        for (let i = 0; i < Goals.length; i++) {
          const addGoalsUrl = "https://localhost:44373/api/AddGoal";
          const goal = {
            Title: Goals[i].title,
            Description: Goals[i].description,
            DurationTo: Goals[i].durationTo,
          };

          const masterGoal = await axios
            .post(addGoalsUrl, goal, config)
            .then((response) => {
              // handle the response from the server
              // console.log(response.data)
              return response.data;
            })
            .catch((error) => {
              console.log(error);
            });

          if (masterGoal) {
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
                if (result && result.length > 0) {
                  return result[0];
                }
              })
              .catch((error) => {
                console.log(error);
              });

            if (getGoal) {
              const addCompanyGoalUrl =
                "https://localhost:44373/api/AddCompanyGoal";
              const companyGoal = {
                CompanyId: companyId,
                GoalId: getGoal.GoalId,
              };

              axios
                .post(addCompanyGoalUrl, companyGoal, config)
                .then(() => {
                  // (response)
                  // console.log(response.data);
                  // console.log("Added company goals");
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          }
        }
      }
    }
  } catch (error) {
    // handle network or other error
    console.error("An error occured: ", error);
  }
};