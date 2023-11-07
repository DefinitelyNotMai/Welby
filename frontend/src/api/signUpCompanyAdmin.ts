import axios from "axios";
import bcrypt from "bcryptjs";
import { CompanyAdminFormData, CompanyFormData } from "../data/typesForm";
import fetchAccessToken from "./tokenService";

const signUpCompanyAdmin = async (
  CompanyAdminData: CompanyAdminFormData,
  CompanyData: CompanyFormData,
  id: string,
) => {
  const admin = {
    First_Name: CompanyAdminData.First_Name,
    Middle_Name: CompanyAdminData.Middle_Name,
    Last_Name: CompanyAdminData.Last_Name,
    Nickname: CompanyAdminData.Nickname,
    Email: CompanyData.companyEmail,
    Phone_Number: CompanyAdminData.Phone_Number,
    Address: CompanyAdminData.Address,
    Birthday: CompanyAdminData.Birthday,
    Linkedin: CompanyAdminData.Linkedin,
    Facebook: CompanyAdminData.Facebook,
    Instagram: CompanyAdminData.Instagram,
    TikTok: CompanyAdminData.TikTok,
    ProfilePhoto: CompanyAdminData.ProfilePhoto,
    GenderId: CompanyAdminData.GenderId,
    CompanyId: id,
    CountryId: CompanyAdminData.CountryId,
    Work: CompanyAdminData.Work,
    Connect: CompanyAdminData.Connect,
    Support: CompanyAdminData.Support,
    Other_Notes: CompanyAdminData.Other_Notes,
    FirstLogIn: 0,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const addCompanyAdminUrl = "https://localhost:44373/api/AddEmployee";
    const addCompanyAdmin = await axios
      .post(addCompanyAdminUrl, admin, config)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    if (addCompanyAdmin) {
      const getCompanyAdminUrl = "https://localhost:44373/api/GetAllEmployees";

      const admin = await axios
        .get(getCompanyAdminUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: {
            Email: CompanyData.companyEmail,
            Phone_Number: CompanyAdminData.Phone_Number,
          },
        })
        .then((response) => {
          const result = response.data;
          if (result && result.length > 0) {
            console.log(result);
            console.log("added to welby");
            //setting company admin id
            return result[0];
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      if (admin != null) {
        const tokenResponse = await fetchAccessToken();

        if (tokenResponse) {
          const token = tokenResponse;
          const addToOWSUrl = "http://localhost:58258/api/AddSystemUsers";

          const hashedPassword = await bcrypt.hash(
            CompanyAdminData.Password,
            10,
          );

          const user = {
            UserCode: admin.EmployeeId,
            UserName: CompanyData.companyEmail,
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
              console.log("Successfully added to OWS");
              return response.data;
            })
            .catch(function (error) {
              console.log(error);
            });

          if (addToOWS) {
            const tokenResponse = await fetchAccessToken();

            if (tokenResponse) {
              const token = tokenResponse;
              const mapCompanyAdminUrl =
                "http://localhost:58258/api/MapSystemUsersToSecurityGroupMapping";

              const mapAdmin = {
                SecurityGroup: 5,
                UserId: addToOWS.UserId,
                Encoded_By: 24286,
              };

              axios
                .post(mapCompanyAdminUrl, mapAdmin, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                })
                .then((response) => {
                  console.log(response.data);
                  console.log("Mapped Admin");
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
    console.error("An error has occured: ", error);
  }
};

export default signUpCompanyAdmin;
