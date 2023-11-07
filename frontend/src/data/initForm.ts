/*
 * NOTE: these are initial values for the forms
 */
import {
  CompanyAdminFormData,
  CompanyFormData,
  EmployeeFormData,
  LoginData,
} from "./typesForm";

export const INITIAL_LOGIN_DATA: LoginData = {
  UserName: "",
  Password: "",
};

export const COMPANY_INITIAL_DATA: CompanyFormData = {
  Name: "",
  companyEmail: "",
  Logo: "",
  Website: "",
  CompanySize: "",
  Phone_Number: "",
  FoundingDate: "",
  CountryId: "",
  IndustryTypeId: "",

  Vision: "",
  Mission: "",

  Values: [{ title: "", description: "" }],

  Goals: [{ title: "", description: "", durationTo: "" }],
};

export const COMPANY_ADMIN_INITIAL_DATA: CompanyAdminFormData = {
  // step 6
  ProfilePhoto: "",
  Email: "",
  Password: "",
  Confirm_Password: "",
  First_Name: "",
  Nickname: "",
  Middle_Name: "",
  Last_Name: "",
  Birthday: "",
  GenderId: "",
  Phone_Number: "",

  // step 7
  Address: "",
  CountryId: "",
  Facebook: "",
  Instagram: "",
  Linkedin: "",
  TikTok: "",
  Work: "",
  Connect: "",
  Support: "",
  Other_Notes: "",
};

export const EMPLOYEE_INITIAL_DATA: EmployeeFormData = {
  // step 1
  First_Name: "",
  Middle_Name: "",
  Birthday: "",
  Nickname: "",
  Last_Name: "",
  GenderId: "",
  ProfilePhoto: "",
  Phone_Number: "",
  CountryId: "",
  Instagram: "",
  TikTok: "",
  Linkedin: "",
  Facebook: "",

  // step 2
  Work: "",
  Connect: "",
  Support: "",

  // step 3
  RealizedStrengths: [],
  UnrealizedStrengths: [],
  LearnedBehaviors: [],
  Weakness: "",

  // step 4
  Interests: [],

  // step 5
  Other_Notes: "",
};
