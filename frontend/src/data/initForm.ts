/*
 * NOTE: these are initial values for the forms
 */
import { DailyCheckInFormData, EmployeeFormData, TISE } from "./typesForm";

export const DAILY_CHECKIN_INITIAL_DATA: DailyCheckInFormData = {
  DailyCheckInId: "",
  EmployeeId: "",
  CompanyId: "",
  EnergyAtWork: { int: 1, value: "Low" },
  FocusAtWork: { int: 1, value: "Low" },
  PositiveEmotions: { int: 1, value: "Low" },
  NegativeEmotions: { int: 1, value: "Low" },
};

export const TISE_INITIAL_DATA: TISE = {
  TiseId: "",
  EmployeeId: "",
  CompanyId: "",
  Factor_1: 0,
  Factor_2: 0,
  Factor_3: 0,
  Factor_4: 0,
  Factor_5: 0,
  Factor_6: 0,
  Factor_7: 0,
  Factor_8: 0,
};
