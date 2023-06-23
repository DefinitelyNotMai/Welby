using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WWA_CORE.Constants
{
    public class PROCEDURE_PARAMETERS
    {
        #region CommonSchema
        public const string PARA_COMMON_PAGE_NO = "@PageNo";
        public const string PARA_COMMON_PAGE_SIZE = "@PageSize";
        public const string PARA_COMMON_DATE_FROM = "@DateFrom";
        public const string PARA_COMMON_DATE_TO = "@DateTo";
        public const string PARA_COMMON_ACTIVE = "@Active";
        #endregion

        #region REGISTRATION
        public const string PARA_REG_EMPLOYEE_REGISTRATION_PAGEWISE_GET_EMPLOYEEID = "@EmployeeId";
        public const string PARA_REG_EMPLOYEE_REGISTRATION_PAGEWISE_GET_PHONE_NUMBER = "@Phone_Number";
        public const string PARA_REG_EMPLOYEE_REGISTRATION_PAGEWISE_GET_EMAIL_ADDRESS = "@Email";
        #endregion

        #region MASTERS
        public const string PARA_MST_CITY_MASTER_GET_CITYID = "@CityId";
        public const string PARA_MST_CITY_MASTER_GET_COUNTRYID = "@CountryId";

        public const string PARA_MST_INDUSTRY_TYPE_MASTER_GET_INDUSTRYTYPEID = "@IndustryTypeId";

        public const string PARA_MST_COUNTRY_MASTER_GET_COUNTRYID = "@CountryId";

        public const string PARA_MST_COMPANY_MASTER_GET_COMPANYID = "@ComapnyId";
        public const string PARA_MST_COMPANY_MASTER_GET_COUNTRYID = "@CountryId";
        public const string PARA_MST_COMPANY_MASTER_GET_INDUSTRYTYPEID = "@IndustryTypeId";

        public const string PARA_MST_GENDER_MASTER_GET_GENDERID = "@GenderId";
        public const string PARA_MST_GENDER_MASTER_GET_BIOLOGICAL = "@Biological";

        public const string PARA_MST_GOAL_MASTER_GET_GOALID = "@GoalId";

        public const string PARA_MST_VALUE_MASTER_GET_VALUEID = "@ValueId";

        public const string PARA_MST_INTEREST_MASTER_GET_INTERESTID = "@InterestId";

        public const string PARA_MST_STRENGTH_MASTER_GET_STRENGTHID = "@StrengthId";
        #endregion

        #region COMPANY
        public const string PARA_CMP_GOALS_GET_COMPANYGOALSID = "@CompanyGoalsId";
        public const string PARA_CMP_GOALS_GET_COMPANYID = "@CompanyId";
        public const string PARA_CMP_GOALS_GET_GOALID = "@GoalId";

        public const string PARA_CMP_VALUES_GET_COMPANYVALUESID = "@CompanyValuesId";
        public const string PARA_CMP_VALUES_GET_COMPANYID = "@CompanyId";
        public const string PARA_CMP_VALUES_GET_VALUEID = "@ValueId";
        #endregion

        #region EMPLOYEE
        public const string PARA_EMP_INTEREST_GET_EMPLOYEEINTERESTLID = "@EmployeeInterestId";
        public const string PARA_EMP_INTEREST_GET_EMPLOYEEID = "@EmployeeId";
        public const string PARA_EMP_INTEREST_GET_INTERESTID = "@InterestId";

        public const string PARA_EMP_LEARNED_BEHAVIORS_GET_LEARNEDBEHAVIORSID = "@LearnedBehaviorsId";
        public const string PARA_EMP_LEARNED_BEHAVIORS_GET_EMPLOYEEID = "@EmployeeId";
        public const string PARA_EMP_LEARNED_BEHAVIORS_GET_STRENGTHID = "@StrengthId";

        public const string PARA_EMP_REALIZED_STRENGTH_GET_REALIZEDSTRENGTHSID = "@RealizedStrengthsId";
        public const string PARA_EMP_REALIZED_STRENGTH_GET_EMPLOYEEID = "@EmployeeId";
        public const string PARA_EMP_REALIZED_STRENGTH_GET_STRENGTHID = "@StrengthId";

        public const string PARA_EMP_UNREALIZED_STRENGTH_GET_UNREALIZEDSTRENGTHSID = "@UnrealizedStrengthsId";
        public const string PARA_EMP_UNREALIZED_STRENGTH_GET_EMPLOYEEID = "@EmployeeId";
        public const string PARA_EMP_UNREALIZED_STRENGTH_GET_STRENGTHID = "@StrengthId";

        public const string PARA_EMP_WEAKNESS_GET_EMPLOYEEWEAKNESSID = "@EmployeeWeaknessId";
        public const string PARA_EMP_WEAKNESS_GET_EMPLOYEEID = "@EmployeeId";
        public const string PARA_EMP_WEAKNESS_GET_STRENGTHID = "@StrengthId";
        #endregion

        #region SECURITY
        public const string PARA_SSA_SYSTEM_CONTROLS_CONTROLID = "@ControlId";
        public const string PARA_SSA_SYSTEM_CONTROLS_CONTROLNAME = "@ControlName";
        public const string PARA_SSA_SYSTEM_GROUP_GROUPID = "@GroupId";

        public const string PARA_SSA_SYSTEM_GROUP_CONTROL_MAPPING_GROUPID = "@GroupId";
        public const string PARA_SSA_SYSTEM_GROUP_CONTROL_MAPPING_MAPPINGID = "@MappingId";
        public const string PARA_SSA_SYSTEM_GROUP_CONTROL_MAPPING_CONTROLID = "@ControlId";

        public const string PARA_SSA_SYSTEM_USERS_USER_NAME = "@User_Name";
        public const string PARA_SSA_SYSTEM_USERS_PASSWORD = "@Password";

        /**
        public const string PARA_SSA_SYSTEM_USERS_GROUPID = "@GroupId";
        public const string PARA_SSA_SYSTEM_USERS_USERID = "@UserId";
        public const string PARA_SSA_SYSTEM_USERS_BRANCHID = "@BranchId";
        public const string PARA_SSA_SYSTEM_USERS_EMP_NO = "@Emp_No";
        
        public const string PARA_SSA_SYSTEM_USERS_ACCOUNT_LOGS_USERID = "@UserId";
        public const string PARA_SSA_SYSTEM_USERS_ACCOUNT_LOGS_RECORDID = "@RecordId";
        public const string PARA_SSA_SYSTEM_USERS_SYSTEM_LOGS_EMP_NO = "@Emp_No";
        public const string PARA_SSA_SYSTEM_USERS_SYSTEM_LOGS_RECORDID = "@RecordId ";
        **/
        #endregion
    }
}
