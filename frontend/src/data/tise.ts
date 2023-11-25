export type TISE = {
  TiseId: number;
  EmployeeId: number;
  CompanyId: number;
  Factor_1: number;
  Factor_2: number;
  Factor_3: number;
  Factor_4: number;
  Factor_5: number;
  Factor_6: number;
  Factor_7: number;
  Factor_8: number;
  Active: boolean;
  Encoded_By: number;
  Encoded_Date: string;
  LastChanged_By: number;
  LastChanged_Date: string;
  Computer_Name: string;
};

export const TISE_DATA: TISE = {
  TiseId: 0,
  EmployeeId: 0,
  CompanyId: 0,
  Factor_1: 0,
  Factor_2: 0,
  Factor_3: 0,
  Factor_4: 0,
  Factor_5: 0,
  Factor_6: 0,
  Factor_7: 0,
  Factor_8: 0,
  Active: false,
  Encoded_By: 0,
  Encoded_Date: "",
  LastChanged_By: 0,
  LastChanged_Date: "",
  Computer_Name: "",
};
