export type IndustryType = {
  IndustryTypeId: number;
  Industry_Name: string;
  Active: boolean;
  Encoded_By: number;
  Encoded_Date: string;
  LastChanged_By: number;
  LastChanged_Date: string;
  Computer_Name: string;
};

export const INDUSTRY_TYPE_DATA: IndustryType = {
  IndustryTypeId: 0,
  Industry_Name: "",
  Active: false,
  Encoded_By: 0,
  Encoded_Date: "",
  LastChanged_By: 0,
  LastChanged_Date: "",
  Computer_Name: "",
};
