/*
 * NOTE: these are initial values for the master data forms
 */

import {
  Company,
  Country,
  Employee,
  Gender,
  Goal,
  IndustryType,
  Value,
} from "./typesMaster";

export const COMPANY_DATA: Company = {
  CompanyId: "",
  Name: "",
  Email: "",
  Phone_Number: "",
  Website: "",
  Address: "",
  Vision: "",
  Mission: "",
  Logo: "",
  CountryId: "",
  IndustryTypeId: "",
  FoundingDate: "",
  CompanySize: "",
  Active: false,
};

export const EMPLOYEE_DATA: Employee = {
  EmployeeId: "",
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
  GenderId: "",
  CompanyId: "",
  CountryId: "",
  Active: false,
  FirstLogIn: false,
};

export const GENDER_DATA: Gender = {
  GenderId: "",
  Gender: "",
  Biological: 0,
  Active: false,
};

export const GOAL_DATA: Goal = {
  GoalId: "",
  Title: "",
  Description: "",
  DurationFrom: "",
  DurationTo: "",
  Active: false,
};

export const VALUE_DATA: Value = {
  ValueId: "",
  Title: "",
  Description: "",
  Active: false,
};

export const COUNTRY_DATA: Country = {
  CountryId: "",
  Name: "",
  Nationality: "",
  Flag_Image: "",
  Active: false,
};

export const INDUSTRY_TYPE_DATA: IndustryType = {
  IndustryTypeId: "",
  Industry_Name: "",
  Active: false,
};
