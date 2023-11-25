export type Interest = {
  InterestId: number;
  Name: string;
  Active: boolean;
  Encoded_By: number;
  Encoded_Date: string;
  LastChanged_By: number;
  LastChanged_Date: string;
  Computer_Name: string;
};

export const INTEREST_DATA: Interest = {
  InterestId: 0,
  Name: "",
  Active: false,
  Encoded_By: 0,
  Encoded_Date: "",
  LastChanged_By: 0,
  LastChanged_Date: "",
  Computer_Name: "",
};
