// lib
import axios from "axios";

// local
import { CompanySignup } from "../data/companySignup";

export const signUpCompany = async (CompanyData: CompanySignup) => {
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
    const addCompany = await axios.post(addCompanyUrl, company_info, config);

    if (addCompany) {
      const getCompanyUrl = "https://localhost:44373/api/GetCompanies";
      const company = await axios.get(getCompanyUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        params: {
          Email: CompanyData.companyEmail,
          Phone_Number: CompanyData.Phone_Number,
        },
      });

      if (company && company.data && company.data.length > 0) {
        const id = company.data[0].CompanyId;

        const Values = CompanyData.Values;
        const Goals = CompanyData.Goals;

        for (let i = 0; i < Values.length; i++) {
          const addValuesUrl = "https://localhost:44373/api/AddValue";
          const value = {
            CompanyId: id,
            Title: Values[i].title,
            Description: Values[i].description,
          };
          axios.post(addValuesUrl, value, config);
        }

        for (let i = 0; i < Goals.length; i++) {
          const addGoalsUrl = "https://localhost:44373/api/AddGoal";
          const goal = {
            CompanyId: id,
            Title: Goals[i].title,
            Description: Goals[i].description,
            DurationTo: Goals[i].durationTo,
          };
          axios.post(addGoalsUrl, goal, config);
        }
        return id;
      }
    }
  } catch (error) {
    // handle network or other error
    console.error("An error occured: ", error);
  }
};
