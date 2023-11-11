/*
 * NOTE: these types are used in forms
 * NOTE2: CompanyFormData has companyEmail instead of Email to avoid conflict
 * i.e: reading Email for either CompanyFormData or CompanyAdminFormData when
 * both are passed as props
 */

export type LoginData = {
  UserName: string;
  Password: string;
};

export type ForgotPasswordData = {
  Email: string;
  VerificationCode: string;
  NewPassword: string;
  ConfirmNewPassword: string;
};

export type CompanyFormData = {
  // step 1
  Name: string;
  companyEmail: string;
  Logo: string;
  Website: string;
  CompanySize: string;
  Phone_Number: string;
  FoundingDate: string;
  CountryId: string;
  IndustryTypeId: string;

  // step 2
  Vision: string;
  Mission: string;

  // step 3
  Values: {
    title: string;
    description: string;
  }[];

  // step 4
  Goals: {
    title: string;
    description: string;
    durationTo: string;
  }[];
};

export type CompanyAdminFormData = {
  // step 6
  ProfilePhoto: string;
  Email: string;
  Password: string;
  Confirm_Password: string;
  First_Name: string;
  Nickname: string;
  Middle_Name: string;
  Last_Name: string;
  Birthday: string;
  GenderId: string;
  Phone_Number: string;

  // step 7
  Address: string;
  CountryId: string;
  Facebook: string;
  Instagram: string;
  Linkedin: string;
  TikTok: string;
  Work: string;
  Connect: string;
  Support: string;
  Other_Notes: string;
};

export type EmployeeFormData = {
  // step 1
  EmployeeId: string;
  First_Name: string;
  Middle_Name: string;
  Birthday: string;
  Nickname: string;
  Last_Name: string;
  GenderId: string;
  ProfilePhoto: string;
  Phone_Number: string;
  CountryId: string;
  Instagram: string;
  TikTok: string;
  Linkedin: string;
  Facebook: string;
  Email: string;
  Address: string;
  CompanyId: string;

  // step 2
  Work: string;
  Connect: string;
  Support: string;

  // step 3
  RealizedStrengths: string[];
  UnrealizedStrengths: string[];
  LearnedBehaviors: string[];
  Weakness: string;

  // step 4
  Interests: string[];

  // step 5
  Other_Notes: string;
};

export type Value = {
  title: string;
  description: string;
};

export type Goal = {
  title: string;
  description: string;
  durationTo: string;
};
