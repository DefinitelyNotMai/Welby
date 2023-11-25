export type Gender = {
  GenderId: number;
  Gender: string;
  Biological: boolean;
  Active: boolean;
  Encoded_By: number;
  Encoded_Date: string;
  LastChanged_By: number;
  LastChanged_Date: string;
  Computer_Name: string;
};

export const GENDER_DATA: Gender = {
  GenderId: 0,
  Gender: "",
  Biological: false,
  Active: false,
  Encoded_By: 0,
  Encoded_Date: "",
  LastChanged_By: 0,
  LastChanged_Date: "",
  Computer_Name: "",
};
