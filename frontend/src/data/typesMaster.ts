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
  Address: string;
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
};

export type Employee = {
  employeeId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  nickname: string;
  email: string;
  phoneNumber: string;
  address: string;
  birthdate: string;
  linkedIn: string;
  facebook: string;
  instagram: string;
  tikTok: string;
  work: string;
  connect: string;
  support: string;
  otherNotes: string;
  profilePhoto: string;
  genderId: string;
  companyId: string;
  countryId: string;
  firstLogin: number;
};

export type Gender = {
  GenderId: string;
  Gender: string;
  Biological: number;
};

export type Goal = {
  GoalId: number;
  Title: string;
  Description: string;
  DurationFrom: string;
  DurationTo: string;
};

export type IndustryType = {
  IndustryTypeId: number;
  Industry_Name: string;
};

export type Interests = {
  InterestId: number;
  Name: string;
};

export type Strength = {
  StrengthId: number;
  Strength: string;
  Category: string;
  Description: string;
};

export type Value = {
  ValueId: number;
  Title: string;
  Description: string;
};
