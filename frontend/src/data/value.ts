export type Value = {
  ValueId: number;
  CompanyId: number;
  Title: string;
  Description: string;
  Active: boolean;
  Encoded_By: number;
  Encoded_Date: string;
  LastChanged_By: number;
  LastChanged_Date: string;
  Computer_Name: string;
  CompanyName: string;
};

export const VALUE_DATA: Value = {
  ValueId: 0,
  CompanyId: 0,
  Title: "",
  Description: "",
  Active: false,
  Encoded_By: 0,
  Encoded_Date: "",
  LastChanged_By: 0,
  LastChanged_Date: "",
  Computer_Name: "",
  CompanyName: "",
};
