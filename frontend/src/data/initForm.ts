/*
 * NOTE: these are initial values for the forms
 */
import { CompanyAdminFormData, CompanyFormData, LoginData } from "./typesForm";

export const INITIAL_LOGIN_DATA: LoginData = {
  email: "",
  password: "",
};

export const COMPANY_INITIAL_DATA: CompanyFormData = {
  id: "",
  name: "",
  email: "",
  logo: "",
  website: "",
  size: "",
  phoneNumber: "",
  foundingDate: "",
  countryId: "",
  industryTypeId: "",

  vision: "",
  mission: "",

  values: [{ title: "", description: "" }],

  goals: [{ title: "", description: "", durationTo: "" }],
};

export const COMPANY_ADMIN_INITIAL_DATA: CompanyAdminFormData = {
  // step 6
  profilePhoto: "",
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  nickname: "",
  middleName: "",
  lastName: "",
  birthdate: "",
  genderId: "",
  phoneNumber: "",

  // step 7
  address: "",
  countryId: "",
  facebook: "",
  instagram: "",
  linkedIn: "",
  tikTok: "",
  work: "",
  connect: "",
  support: "",
  otherNotes: "",
};
