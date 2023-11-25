export type ForgotPassword = {
  Email: string;
  VerificationCode: string;
  NewPassword: string;
  ConfirmNewPassword: string;
};

export const FORGOTPASSWORD_DATA: ForgotPassword = {
  Email: "",
  VerificationCode: "",
  NewPassword: "",
  ConfirmNewPassword: "",
};
