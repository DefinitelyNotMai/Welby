export type DailyCheckIn = {
  DailyCheckInId: number;
  EmployeeId: number;
  CompanyId: number;
  EnergyAtWork_int: number;
  EnergyAtWork_value: string;
  FocusAtWork_int: number;
  FocusAtWork_value: string;
  PositiveEmotions_int: number;
  PositiveEmotions_value: string;
  NegativeEmotions_int: number;
  NegativeEmotions_value: string;
  Productivity: number;
  Prediction: number;
  Active: boolean;
  Encoded_By: number;
  Encoded_Date: string;
  LastChanged_By: number;
  LastChanged_Date: string;
  ComputerName: string;
  Completion: string;
};

export const DAILYCHECKIN_DATA: DailyCheckIn = {
  DailyCheckInId: 0,
  EmployeeId: 0,
  CompanyId: 0,
  EnergyAtWork_int: 1,
  EnergyAtWork_value: "Low",
  FocusAtWork_int: 1,
  FocusAtWork_value: "Low",
  PositiveEmotions_int: 1,
  PositiveEmotions_value: "Low",
  NegativeEmotions_int: 1,
  NegativeEmotions_value: "Low",
  Productivity: 0,
  Prediction: 0,
  Active: false,
  Encoded_By: 0,
  Encoded_Date: "",
  LastChanged_By: 0,
  LastChanged_Date: "",
  ComputerName: "",
  Completion: "",
};
