/*
 * NOTE: these are type definitions for Master db
 * NOTE2: make sure capitalization is the same as table columns
 */

export type Company = {
  CompanyId: string;
  Name: string;
  Email: string;
  Phone_Number: string;
  Website: string;
  Address: string; // NOTE: Remove this
  Vision: string;
  Mission: string;
  Logo: string;
  CountryId: string;
  IndustryTypeId: string;
  Active: boolean;
  FoundingDate: string;
  CompanySize: string;
};

export type Country = {
  CountryId: string;
  Name: string;
  Nationality: string;
  Flag_Image: string;
  Active: boolean;
};

export type Employee = {
  EmployeeId: string;
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
  GenderId: string;
  CompanyId: string;
  CountryId: string;
  Active: boolean;
  FirstLogIn: boolean;
};

export type Gender = {
  GenderId: string;
  Gender: string;
  Biological: number;
  Active: boolean;
};

export type Goal = {
  GoalId: string;
  Title: string;
  Description: string;
  DurationFrom: string;
  DurationTo: string;
  Active: boolean;
};

export type IndustryType = {
  IndustryTypeId: string;
  Industry_Name: string;
  Active: boolean;
};

export type Interest = {
  InterestId: string;
  Name: string;
  Active: boolean;
};

export type Strength = {
  StrengthId: string;
  Strength: string;
  Category: string;
  Description: string;
  Active: boolean;
};

export type Value = {
  ValueId: string;
  Title: string;
  Description: string;
  Active: boolean;
};
