export interface CompanyFormData {
  // step 1
  companyId: string;
  companyName: string;
  companyEmail: string;
  companyLogo: string;
  companyWebsite: string;
  companySize: string;
  companyPhoneNumber: string;
  companyFoundingDate: string;
  companyCountryId: string; // can be string because it is being converted in the backend
  companyIndustryTypeId: string;

  // step 2
  companyVision: string;
  companyMission: string;

  // step 3
  companyValues: {
    title: string;
    description: string;
  }[];

  // step4
  companyGoals: {
    title: string;
    description: string;
    durationTo: string;
  }[];
}

export interface CompanyAdminFormData {
  // step 6
  adminProfilePhoto: string;
  adminEmail: string;
  adminPassword: string;
  adminConfirmPassword: string;
  adminFirstName: string;
  adminNickname: string;
  adminMiddleName: string;
  adminLastName: string;
  adminBirthdate: string;
  adminGenderId: string;
  adminPhoneNumber: string;

  // step 7
  adminAddress: string;
  adminCountryId: string;
  adminFacebook: string;
  adminInstagram: string;
  adminLinkedIn: string;
  adminTikTok: string;
  adminWork: string;
  adminConnect: string;
  adminSupport: string;
  adminOtherNotes: string;
}

export const COMPANY_INITIAL_DATA: CompanyFormData = {
  companyId: "",
  companyName: "",
  companyEmail: "",
  companyLogo: "",
  companyWebsite: "",
  companySize: "",
  companyPhoneNumber: "",
  companyFoundingDate: "",
  companyCountryId: "",
  companyIndustryTypeId: "",

  companyVision: "",
  companyMission: "",

  companyValues: [{ title: "", description: "" }],

  companyGoals: [{ title: "", description: "", durationTo: "" }],
};

export const COMPANY_ADMIN_INITIAL_DATA: CompanyAdminFormData = {
  // step 6
  adminProfilePhoto: "",
  adminEmail: "",
  adminPassword: "",
  adminConfirmPassword: "",
  adminFirstName: "",
  adminNickname: "",
  adminMiddleName: "",
  adminLastName: "",
  adminBirthdate: "",
  adminGenderId: "",
  adminPhoneNumber: "",

  // step 7
  adminAddress: "",
  adminCountryId: "",
  adminFacebook: "",
  adminInstagram: "",
  adminLinkedIn: "",
  adminTikTok: "",
  adminWork: "",
  adminConnect: "",
  adminSupport: "",
  adminOtherNotes: "",
};
