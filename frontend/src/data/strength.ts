export type Strength = {
  StrengthId: number;
  Strength: string;
  Category: string;
  Description: string;
  Active: boolean;
  Encoded_By: number;
  Encoded_Date: string;
  LastChanged_By: number;
  LastChanged_Date: string;
  Computer_Name: string;
  RealizedStrengthDisplay: string;
  UnrealizedStrengthDisplay: string;
  LearnedBehaviorDisplay: string;
};

export const STRENGTH_DATA: Strength = {
  StrengthId: 0,
  Strength: "",
  Category: "",
  Description: "",
  Active: false,
  Encoded_By: 0,
  Encoded_Date: "",
  LastChanged_By: 0,
  LastChanged_Date: "",
  Computer_Name: "",
  RealizedStrengthDisplay: "",
  UnrealizedStrengthDisplay: "",
  LearnedBehaviorDisplay: "",
};
