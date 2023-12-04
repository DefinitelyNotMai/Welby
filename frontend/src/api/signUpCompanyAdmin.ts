// lib
import axios from "axios";
import bcrypt from "bcryptjs";

// local
import { CompanyAdminSignup } from "../data/companyAdminSignup";
import { CompanySignup } from "../data/companySignup";
import { fetchAccessToken } from "./tokenService";

export const signUpCompanyAdmin = async (
  CompanyAdminData: CompanyAdminSignup,
  CompanyData: CompanySignup,
  id: number,
) => {
  try {
    const adminData = {
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
      FirstLogIn: true,
      CompanyPosition: "Company Admin",
      CompanyRole: "Company Admin"
    };

    const addCompanyAdmin = await axios.post(
      "https://localhost:44373/api/AddEmployee",
      adminData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    console.log(addCompanyAdmin.data);

    const getCompanyAdminParams = {
      Email: CompanyData.companyEmail,
      Phone_Number: CompanyAdminData.Phone_Number,
    };

    const getCompanyAdmin = await axios.get(
      "https://localhost:44373/api/GetEmployees",
      {
        params: getCompanyAdminParams,
      },
    );

    const admin = getCompanyAdmin.data[0];
    console.log(admin);
    console.log("Added to welby");

    const token = await fetchAccessToken();

    const hashedPassword = await bcrypt.hash(CompanyAdminData.Password, 10);
    const userData = {
      UserCode: admin.EmployeeId,
      UserName: CompanyData.companyEmail,
      Password: hashedPassword,
      AccountLocked: 0,
      LoggedIn: 0,
      PasswordNoExpiry: null,
      ExpiryDays: null,
      AccountVerified: null,
      VerifiedDate: null,
      Encoded_By: admin.EmployeeId,
      Active: true,
    };

    const addToOWS = await axios.post(
      "http://localhost:58258/api/AddSystemUsers",
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    console.log(addToOWS.data);
    console.log("Successfully added to OWS");
    
  } catch (error) {
    console.error("An error has occurred:", error);
  }
};
