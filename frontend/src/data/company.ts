export type Company = {
  CompanyId: number;
  Name: string;
  Email: string;
  Phone_Number: string;
  Website: string;
  Address: string;
  Vision: string;
  Mission: string;
  Logo: string;
  CountryId: number;
  IndustryTypeId: number;
  Active: boolean;
  Encoded_By: number;
  Encoded_Date: string;
  LastChanged_By: number;
  LastChanged_Date: string;
  Computer_Name: string;
  FoundingDate: string;
  CompanySize: string;
};

export const COMPANY_DATA: Company = {
  CompanyId: 0,
  Name: "",
  Email: "",
  Phone_Number: "",
  Website: "",
  Address: "",
  Vision: "",
  Mission: "",
  Logo: "",
  CountryId: 0,
  IndustryTypeId: 0,
  Active: false,
  Encoded_By: 0,
  Encoded_Date: "",
  LastChanged_By: 0,
  LastChanged_Date: "",
  Computer_Name: "",
  FoundingDate: "",
  CompanySize: "",
};
