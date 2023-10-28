/*
 * NOTE: these types are used in forms,
 */
export type LoginData = {
  email: string;
  password: string;
};

export type CompanyFormData = {
  // step 1
  id: string;
  name: string;
  email: string;
  logo: string;
  website: string;
  size: string;
  phoneNumber: string;
  foundingDate: string;
  countryId: string; // can be string because it is being converted in the backend
  industryTypeId: string;

  // step 2
  vision: string;
  mission: string;

  // step 3
  values: {
    title: string;
    description: string;
  }[];

  // step4
  goals: {
    title: string;
    description: string;
    durationTo: string;
  }[];
};

export type CompanyAdminFormData = {
  // step 6
  profilePhoto: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  nickname: string;
  middleName: string;
  lastName: string;
  birthdate: string;
  genderId: string;
  phoneNumber: string;

  // step 7
  address: string;
  countryId: string;
  facebook: string;
  instagram: string;
  linkedIn: string;
  tikTok: string;
  work: string;
  connect: string;
  support: string;
  otherNotes: string;
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
