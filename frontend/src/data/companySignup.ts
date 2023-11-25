export type CompanySignup = {
  Name: string;
  companyEmail: string;
  Logo: string;
  Website: string;
  CompanySize: string;
  Phone_Number: string;
  FoundingDate: string;
  CountryId: number;
  IndustryTypeId: number;

  Vision: string;
  Mission: string;

  Values: {
    title: string;
    description: string;
  }[];

  Goals: {
    title: string;
    description: string;
    durationTo: string;
  }[];
};

export const COMPANYSIGNUP_DATA: CompanySignup = {
  Name: "",
  companyEmail: "",
  Logo: "",
  Website: "",
  CompanySize: "",
  Phone_Number: "",
  FoundingDate: "",
  CountryId: 0,
  IndustryTypeId: 0,

  Vision: "",
  Mission: "",

  Values: [{ title: "", description: "" }],

  Goals: [{ title: "", description: "", durationTo: "" }],
};
