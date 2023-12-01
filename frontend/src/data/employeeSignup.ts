export type EmployeeSignup = {
  EmployeeId: number;
  First_Name: string;
  Middle_Name: string;
  Birthday: string;
  Nickname: string;
  Last_Name: string;
  GenderId: number;
  ProfilePhoto: string;
  Phone_Number: string;
  CountryId: number;
  Instagram: string;
  TikTok: string;
  Linkedin: string;
  Facebook: string;
  Email: string;
  Password: string;
  Address: string;
  CompanyId: number;
  Work: string;
  Connect: string;
  Support: string;
  RealizedStrengths: [number, number, number];
  UnrealizedStrengths: [number, number, number];
  LearnedBehaviors: [number, number];
  Weakness: number;
  Interests: number[];
  Other_Notes: string;
  FirstLogIn: boolean;
};

export const EMPLOYEESIGNUP_DATA: EmployeeSignup = {
  EmployeeId: 0,
  First_Name: "",
  Middle_Name: "",
  Birthday: "",
  Nickname: "",
  Last_Name: "",
  GenderId: 0,
  ProfilePhoto: "",
  Phone_Number: "",
  CountryId: 0,
  Instagram: "",
  TikTok: "",
  Linkedin: "",
  Facebook: "",
  Email: "",
  Password: "",
  Address: "",
  CompanyId: 0,
  Work: "",
  Connect: "",
  Support: "",
  RealizedStrengths: [0, 0, 0],
  UnrealizedStrengths: [0, 0, 0],
  LearnedBehaviors: [0, 0],
  Weakness: 0,
  Interests: [0],
  Other_Notes: "",
  FirstLogIn: true,
};
