export type Company = {
  companyId: string;
  name: string;
  email: string;
  phoneNumber: string;
  website: string;
  address: string;
  vision: string;
  mission: string;
  logo: string;
  countryId: string;
  industryTypeId: string;
  foundingDate: string;
  size: string;
};

export type Country = {
  countryId: string;
  name: string;
  nationality: string;
  flagImage: string;
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
  genderId: string;
  gender: string;
  biological: number;
};

export type Goal = {
  goalId: number;
  title: string;
  description: string;
  durationFrom: string;
  durationTo: string;
};

export type IndustryType = {
  industryTypeId: number;
  industryName: string;
};

export type Interests = {
  interestId: number;
  name: string;
};

export type Strength = {
  strengthId: number;
  strength: string;
  category: string;
  description: string;
};

export type Value = {
  valueId: number;
  title: string;
  description: string;
};
