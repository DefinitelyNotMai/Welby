using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Constants;
using WWA_CORE.Core.Repositories.Employee;
using WWA_CORE.Persistent.Context;
using WWA_CORE.Persistent.ViewModel.Employee;
using WWA_CORE.Utilities;
using System.Data.Entity;

namespace WWA_CORE.Persistent.Service.Employee
{
    public class EmployeeLearnedBehaviorsService : IEmployeeLearnedBehaviorsRepository
    {
        public async Task<EmployeeLearnedBehaviorsViewModel> AddEmployeeLearnedBehavior(EmployeeLearnedBehaviorsViewModel employeeLearnedBehaviorsViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var rowToInsert = new tbl_EMP_Learned_Behaviors
                {
                    EmployeeId = employeeLearnedBehaviorsViewModel.EmployeeId,
                    StrengthId = employeeLearnedBehaviorsViewModel.StrengthId,

                    Active = true,
                    Encoded_By = employeeLearnedBehaviorsViewModel.Encoded_By,
                    Encoded_Date = globalFunctions.GetServerDateTime(),
                    Computer_Name = employeeLearnedBehaviorsViewModel.Computer_Name
                };

                context.tbl_EMP_Learned_Behaviors.Add(rowToInsert);
                await context.SaveChangesAsync();
                employeeLearnedBehaviorsViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_ADD_MESSAGE_CODE;

            }
            catch (Exception ex)
            {
                employeeLearnedBehaviorsViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();
            return employeeLearnedBehaviorsViewModel;
        }

        public async Task<IEnumerable<EmployeeLearnedBehaviorsViewModel>> GetEmployeeLearnedBehaviors(EmployeeLearnedBehaviorsViewModel employeeLearnedBehaviorsViewModel)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_EMP_LEARNED_BEHAVIORS_GET,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
                {
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_EMP_LEARNED_BEHAVIORS_GET_LEARNEDBEHAVIORSID , employeeLearnedBehaviorsViewModel.LearnedBehaviorsId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_EMP_LEARNED_BEHAVIORS_GET_EMPLOYEEID , employeeLearnedBehaviorsViewModel.EmployeeId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_EMP_LEARNED_BEHAVIORS_GET_STRENGTHID , employeeLearnedBehaviorsViewModel.StrengthId),

              }
            };

            await query.ExecuteAsync();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new EmployeeLearnedBehaviorsViewModel()
            {
                LearnedBehaviorsId = Convert.ToInt32(row["LearnedBehaviorsId"]),
                EmployeeId = Convert.ToInt32(row["EmployeeId"]),
                StrengthId = Convert.ToInt32(row["StrengthId"]),

                EmployeeFirstNameDisplay = Convert.ToString(row["EmployeeFirstNameDisplay"]),
                LearnedBehaviorDisplay = Convert.ToString(row["LearnedBehaviorDisplay"]),

                Active = Convert.ToBoolean(row["Active"]),
                Encoded_By = Convert.ToInt32(row["Encoded_By"]),
                Encoded_Date = Convert.ToDateTime(row["Encoded_Date"]),
                Computer_Name = Convert.ToString(row["Computer_Name"]),
                LastChanged_By = DBNull.Value != row["LastChanged_By"] ? Convert.ToInt32(row["LastChanged_By"]) : 0,
                LastChanged_Date = DBNull.Value != row["LastChanged_Date"] ? (DateTime?)row["LastChanged_Date"] : null,
                EncodedByName = "",
                LastChangedByName = "",
            });

            query.Dispose();
            employeeLearnedBehaviorsViewModel.Dispose();
            return ReturnedList;
        }

        public async Task<EmployeeLearnedBehaviorsViewModel> RemoveEmployeeLearnedBehavior(EmployeeLearnedBehaviorsViewModel employeeLearnedBehaviorsViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_EMP_Learned_Behaviors.FirstOrDefaultAsync(c => c.LearnedBehaviorsId == employeeLearnedBehaviorsViewModel.LearnedBehaviorsId);
                RowToUpdate.Active = false;
                RowToUpdate.LastChanged_By = employeeLearnedBehaviorsViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                employeeLearnedBehaviorsViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_REMOVE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                employeeLearnedBehaviorsViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return employeeLearnedBehaviorsViewModel;
        }

        public async Task<EmployeeLearnedBehaviorsViewModel> ReturnEmployeeLearnedBehavior(EmployeeLearnedBehaviorsViewModel employeeLearnedBehaviorsViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_EMP_Learned_Behaviors.FirstOrDefaultAsync(c => c.LearnedBehaviorsId == employeeLearnedBehaviorsViewModel.LearnedBehaviorsId);
                RowToUpdate.Active = true;
                RowToUpdate.LastChanged_By = employeeLearnedBehaviorsViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                employeeLearnedBehaviorsViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_RETURN_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                employeeLearnedBehaviorsViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return employeeLearnedBehaviorsViewModel;
        }

        public async Task<EmployeeLearnedBehaviorsViewModel> UpdateEmployeeLearnedBehavior(EmployeeLearnedBehaviorsViewModel employeeLearnedBehaviorsViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();
            try
            {
                var RowToUpdate = await context.tbl_EMP_Learned_Behaviors.FirstOrDefaultAsync(c => c.LearnedBehaviorsId == employeeLearnedBehaviorsViewModel.LearnedBehaviorsId);

                RowToUpdate.EmployeeId = employeeLearnedBehaviorsViewModel.EmployeeId;
                RowToUpdate.StrengthId = employeeLearnedBehaviorsViewModel.StrengthId;

                RowToUpdate.Active = employeeLearnedBehaviorsViewModel.Active;
                RowToUpdate.Computer_Name = employeeLearnedBehaviorsViewModel.Computer_Name;
                RowToUpdate.LastChanged_By = employeeLearnedBehaviorsViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();

                await context.SaveChangesAsync();
                employeeLearnedBehaviorsViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_UPDATE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                employeeLearnedBehaviorsViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();

            return employeeLearnedBehaviorsViewModel;
        }
    }
}
