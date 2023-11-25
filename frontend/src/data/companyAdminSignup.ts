export type CompanyAdminSignup = {
  ProfilePhoto: string;
  Email: string;
  Password: string;
  Confirm_Password: string;
  First_Name: string;
  Nickname: string;
  Middle_Name: string;
  Last_Name: string;
  Birthday: string;
  GenderId: number;
  Phone_Number: string;

  Address: string;
  CountryId: number;
  Facebook: string;
  Instagram: string;
  Linkedin: string;
  TikTok: string;
  Work: string;
  Connect: string;
  Support: string;
  Other_Notes: string;
};

export const COMPANYADMINSIGNUP_DATA: CompanyAdminSignup = {
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
  GenderId: 0,
  Phone_Number: "",

  // step 7
  Address: "",
  CountryId: 0,
  Facebook: "",
  Instagram: "",
  Linkedin: "",
  TikTok: "",
  Work: "",
  Connect: "",
  Support: "",
  Other_Notes: "",
};
