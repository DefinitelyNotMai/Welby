export type Country = {
  CountryId: number;
  Name: string;
  Nationality: string;
  Flag_Image: string;
  Active: boolean;
  Encoded_By: number;
  Encoded_Date: string;
  LastChanged_By: number;
  LastChanged_Date: string;
  Computer_Name: string;
};

export const COUNTRY_DATA: Country = {
  CountryId: 0,
  Name: "",
  Nationality: "",
  Flag_Image: "",
  Active: false,
  Encoded_By: 0,
  Encoded_Date: "",
  LastChanged_By: 0,
  LastChanged_Date: "",
  Computer_Name: "",
};
