/*
 * NOTE: these types are used in forms
 * NOTE2: CompanyFormData has companyEmail instead of Email to avoid conflict
 * i.e: reading Email for either CompanyFormData or CompanyAdminFormData when
 * both are passed as props
 */

export type Value = {
  title: string;
  description: string;
};

export type Goal = {
  title: string;
  description: string;
  durationTo: string;
};

export type DailyCheckInFormData = {
  DailyCheckInId: string;
  EmployeeId: string;
  CompanyId: string;
  EnergyAtWork: {
    int: number;
    value: string;
  };
  FocusAtWork: {
    int: number;
    value: string;
  };
  PositiveEmotions: {
    int: number;
    value: string;
  };
  NegativeEmotions: {
    int: number;
    value: string;
  };
};

export type TISE = {
  TiseId: string;
  EmployeeId: string;
  CompanyId: string;
  Factor_1: number;
  Factor_2: number;
  Factor_3: number;
  Factor_4: number;
  Factor_5: number;
  Factor_6: number;
  Factor_7: number;
  Factor_8: number;
};
