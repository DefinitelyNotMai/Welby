/*
 * NOTE: these are initial values for the forms
 */
import {
  CompanyAdminFormData,
  CompanyFormData,
  DailyCheckInFormData,
  EmployeeFormData,
  ForgotPasswordData,
  LoginData,
} from "./typesForm";

export const INITIAL_LOGIN_DATA: LoginData = {
  UserName: "",
  Password: "",
};

export const FORGOT_PASSWORD_INITIAL_DATA: ForgotPasswordData = {
  // step 1
  Email: "",

  // step 2
  VerificationCode: "",

  // step 3
  NewPassword: "",
  ConfirmNewPassword: "",
};

export const COMPANY_INITIAL_DATA: CompanyFormData = {
  // step 1
  Name: "",
  companyEmail: "",
  Logo: "",
  Website: "",
  CompanySize: "",
  Phone_Number: "",
  FoundingDate: "",
  CountryId: "",
  IndustryTypeId: "",

  // step 2
  Vision: "",
  Mission: "",

  // step 3
  Values: [{ title: "", description: "" }],

  // step 4
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
  EmployeeId: "",
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
  Email: "",
  Password: "",
  Address: "",
  CompanyId: "",

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

export const DAILY_CHECKIN_INITIAL_DATA: DailyCheckInFormData = {
  DailyCheckInId: "",
  EmployeeId: "",
  CompanyId: "",
  EnergyAtWork: { int: 1, value: "Low" },
  FocusAtWork: { int: 1, value: "Low" },
  PositiveEmotions: { int: 1, value: "Low" },
  NegativeEmotions: { int: 1, value: "Low" },
};
