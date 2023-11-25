using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.ViewModel.Registration;

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

        #region ALGO
        //Daily Check In
        public const string PARA_CMP_DAILYCHECKIN_GET_COMPANYID = "@CompanyId";
        public const string PARA_CMP_DAILYCHECKIN_GET_EMPLOYEEID = "@EmployeeId";
        
        //Tise
        public const string PARA_CMP_TISE_GET_COMPANYID = "@CompanyId";
        
        //Result
        public const string PARA_GET_RESULTID = "@ResultId";

        //TrainingSet
        public const string PARA_GET_TRAININGSET_EMPLOYEEID = "@EmployeeId";

        #endregion

        #region REGISTRATION
        //Employee Registration
        public const string PARA_REG_EMPLOYEE_REGISTRATION_PAGEWISE_GET_EMPLOYEEID = "@EmployeeId";
        public const string PARA_REG_EMPLOYEE_REGISTRATION_PAGEWISE_GET_PHONE_NUMBER = "@Phone_Number";
        public const string PARA_REG_EMPLOYEE_REGISTRATION_PAGEWISE_GET_EMAIL_ADDRESS = "@Email";
        public const string PARA_REG_EMPLOYEE_REGISTRATION_PAGEWISE_GET_COMPANYID = "@CompanyId";

        //Company
        public const string PARA_MST_COMPANY_MASTER_LOGIN_GET_COMPANYID = "@CompanyId";
        public const string PARA_MST_COMPANY_MASTER_LOGIN_GET_COMPANYEMAIL = "@Email";
        public const string PARA_MST_COMPANY_MASTER_LOGIN_GET_PHONE_NUMBER = "@Phone_Number";

        #endregion

        #region MASTERS
        public const string PARA_MST_CITY_MASTER_GET_COUNTRYID = "@CountryId";

        public const string PARA_MST_INDUSTRY_TYPE_MASTER_GET_INDUSTRYTYPEID = "@IndustryTypeId";

        public const string PARA_MST_COUNTRY_MASTER_GET_COUNTRYID = "@CountryId";

        public const string PARA_MST_COMPANY_MASTER_GET_COMPANYID = "@CompanyId";

        public const string PARA_MST_GENDER_MASTER_GET_GENDERID = "@GenderId";
        public const string PARA_MST_GENDER_MASTER_GET_BIOLOGICAL = "@Biological";

        //Goal Master
        public const string PARA_MST_GOAL_MASTER_GET_GOALID = "@GoalId";
        public const string PARA_MST_GOAL_MASTER_GET_COMPANYID = "@CompanyId";
        public const string PARA_MST_GOAL_MASTER_GET_TITLE = "@Title";
        public const string PARA_MST_GOAL_MASTER_GET_DESCRIPTION = "@Description";

        //Value Master
        public const string PARA_MST_VALUE_MASTER_GET_VALUEID = "@ValueId";
        public const string PARA_MST_VALUE_MASTER_GET_COMPANYID = "@CompanyId";
        public const string PARA_MST_VALUE_MASTER_GET_TITLE = "@Title";
        public const string PARA_MST_VALUE_MASTER_GET_DESCRIPTION = "@Description";

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

      
    }
}
