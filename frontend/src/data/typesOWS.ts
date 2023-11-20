/*
 * NOTE: these are type definitions for OWS db
 * NOTE2: make sure capitalization is the same as table columns
 */

export type SystemControls = {
  ControlId: string;
  ControlName: string;
  DisplayName: string;
};

export type SystemControlToSecurityGroupMapping = {
  SecurityGroupToControlId: string;
  SecurityGroupId: string;
  ControlId: string;
};

export type SystemControlToUsersMapping = {
  UsersToControlId: string;
  UserId: string;
  ControlId: string;
};

export type SystemSecurityGroup = {
  SecurityGroupId: string;
  SecurityGroupName: string;
};

export type SystemUsers = {
  UserId: string;
  UserCode: string;
  UserName: string;
  Password: string;
  AccountLocked: string;
  LoggedIn: string;
  PasswordNoExpiry: string;
  ExpiryDays: string;
  AccountVerified: string;
  CurrentOTP: string;
};

export type SystemUsersToSecurityGroupMapping = {
  GroupToUserMappingId: string;
  SecurityGroupId: string;
  UserId: string;
};
