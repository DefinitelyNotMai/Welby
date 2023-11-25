export type Goal = {
  GoalId: number;
  CompanyId: number;
  Title: string;
  Description: string;
  DurationFrom: string;
  DurationTo: string;
  Active: boolean;
  Encoded_By: number;
  Encoded_Date: string;
  LastChanged_By: number;
  LastChanged_Date: string;
  Computer_Name: string;
};

export const GOAL_DATA: Goal = {
  GoalId: 0,
  CompanyId: 0,
  Title: "",
  Description: "",
  DurationFrom: "",
  DurationTo: "",
  Active: false,
  Encoded_By: 0,
  Encoded_Date: "",
  LastChanged_By: 0,
  LastChanged_Date: "",
  Computer_Name: "",
};
