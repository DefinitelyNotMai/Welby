using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WWA_CORE.Constants
{
    public class PROCEDURE_NAME
    {
        #region ALGO
        public const string PROC_EMP_DAILYCHECKIN_GET = "procWWA_EMP_DailyCheckIn_Get";
        public const string PROC_EMP_DAILYCHECKIN_GET_EMPLOYEE = "procWWA_EMP_DailyCheckIn_Get_Employee";
        public const string PROC_EMP_TISE_GET = "procWWA_EMP_TISE_Get";
        public const string PROC_GET_RESULT = "procWWA_Get_Results";

        public const string PROC_GET_TRAININGSET = "procWWA_TrainingSet_Get";
        #endregion


        #region REGISTRATION
        public const string PROC_REG_EMPLOYEE_REGISTRATION_PAGEWISE_GET = "procWWA_REG_Employee_Registration_Pagewise_Get";
        public const string PROC_REG_EMPLOYEE_REGISTRATION_GET = "procWWA_REG_Employee_Get";
        public const string PROC_REG_EMPLOYEE_GETBY_COMPANY = "procWWA_REG_Employee_GetBy_Company";
        public const string PROC_GET_EMLOYEE_GETBY_COMPANY_AND_EMAIL = "procWWA_REG_Employee_GetBy_Company_and_Email";

        public const string PROC_MST_COMPANY_MASTER_LOGIN_GET = "procWWA_MST_Company_Master_Login_Get";
        #endregion

        #region MASTERS
        public const string PROC_MST_CITY_MASTER_GET = "procWWA_MST_City_Master_Get";
        public const string PROC_MST_COUNTRY_MASTER_GET = "procWWA_MST_Country_Master_Get";
        public const string PROC_MST_INDUSTRY_TYPE_MASTER_GET = "procWWA_MST_IndustryType_Master_Get";

        public const string PROC_MST_COMPANY_MASTER_GET = "procWWA_MST_Company_Master_Get";


        public const string PROC_MST_GENDER_MASTER_GET = "procWWA_MST_Gender_Master_Get";
        public const string PROC_MST_GOAL_MASTER_GET = "procWWA_MST_Goal_Master_Get"; //GoalId

        public const string PROC_MST_INTEREST_MASTER_GET = "procWWA_MST_Interest_Master_Get";
        public const string PROC_MST_STRENGTH_MASTER_GET = "procWWA_MST_Strength_Master_Get";
        public const string PROC_MST_VALUE_MASTER_GET = "procWWA_MST_Value_Master_Get";

        public const string PROC_MST_VALUE_MASTER_PAGEWISE_GET = "procWWA_MST_Value_Master_Pagewise_Get"; //CompanyId
        public const string PROC_MST_GOAL_MASTER_PAGEWISE_GET = "procWWA_MST_Goal_Master_Pagewise_Get";
        #endregion

        #region COMPANY
        public const string PROC_CMP_GOALS_GET = "procWWA_CMP_Goals_Get";
        public const string PROC_CMP_VALUES_GET = "procWWA_CMP_Values_Get";
        #endregion

        #region EMPLOYEE
        public const string PROC_EMP_INTEREST_GET = "procWWA_EMP_Interest_Get";
        public const string PROC_EMP_LEARNED_BEHAVIORS_GET = "procWWA_EMP_Learned_Behaviors_Get";
        public const string PROC_EMP_REALIZED_STRENGTHS_GET = "procWWA_EMP_Realized_Strengths_Get";
        public const string PROC_EMP_UNREALIZED_STRENGTHS_GET = "procWWA_EMP_Unrealized_Strengths_Get";
        public const string PROC_EMP_WEAKNESS_GET = "procWWA_EMP_Weakness_Get";
        #endregion

    }
}
