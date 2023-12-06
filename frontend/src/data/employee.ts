export type Employee = {
  EmployeeId: number;
  First_Name: string;
  Middle_Name: string;
  Last_Name: string;
  Nickname: string;
  Email: string;
  Phone_Number: string;
  Address: string;
  Birthday: string;
  Linkedin: string;
  Facebook: string;
  Instagram: string;
  TikTok: string;
  Work: string;
  Connect: string;
  Support: string;
  Other_Notes: string;
  ProfilePhoto: string;
  GenderId: number;
  CompanyId: number;
  CountryId: number;
  Active: boolean;
  Encoded_By: number;
  Encoded_Date: string;
  LastChanged_By: number;
  LastChanged_Date: string;
  Computer_Name: string;
  FirstLogIn: boolean;
  CompanyPosition: string;
  CompanyRole: string;
  GenderDisplayName: string;
  EmployeeCompanyDisplay: string;
  CountryDisplay: string;
};

export const EMPLOYEE_DATA: Employee = {
  EmployeeId: 0,
  First_Name: "",
  Middle_Name: "",
  Last_Name: "",
  Nickname: "",
  Email: "",
  Phone_Number: "",
  Address: "",
  Birthday: "",
  Linkedin: "",
  Facebook: "",
  Instagram: "",
  TikTok: "",
  Work: "",
  Connect: "",
  Support: "",
  Other_Notes: "",
  ProfilePhoto: "",
  GenderId: 0,
  CompanyId: 0,
  CountryId: 0,
  Active: false,
  Encoded_By: 0,
  Encoded_Date: "",
  LastChanged_By: 0,
  LastChanged_Date: "",
  Computer_Name: "",
  FirstLogIn: false,
  CompanyPosition: "",
  CompanyRole: "",
  GenderDisplayName: "",
  EmployeeCompanyDisplay: "",
  CountryDisplay: "",
};
