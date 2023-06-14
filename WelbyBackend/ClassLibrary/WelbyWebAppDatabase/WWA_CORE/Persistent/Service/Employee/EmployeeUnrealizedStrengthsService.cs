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
    public class EmployeeUnrealizedStrengthsService : IEmployeeUnrealizedStrengthsRepository
    {
        public async Task<EmployeeUnrealizedStrengthsViewModel> AddEmployeeUnrealizedStrength(EmployeeUnrealizedStrengthsViewModel employeeUnrealizedStrengthsViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var rowToInsert = new tbl_EMP_Unrealized_Strengths
                {
                    UnrealizedStrengthsId = employeeUnrealizedStrengthsViewModel.UnrealizedStrengthsId,
                    EmployeeId = employeeUnrealizedStrengthsViewModel.EmployeeId,
                    StrengthId = employeeUnrealizedStrengthsViewModel.StrengthId,

                    Active = true,
                    Encoded_By = employeeUnrealizedStrengthsViewModel.Encoded_By,
                    Encoded_Date = globalFunctions.GetServerDateTime(),
                    Computer_Name = employeeUnrealizedStrengthsViewModel.Computer_Name
                };

                context.tbl_EMP_Unrealized_Strengths.Add(rowToInsert);
                await context.SaveChangesAsync();
                employeeUnrealizedStrengthsViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_ADD_MESSAGE_CODE;

            }
            catch (Exception ex)
            {
                employeeUnrealizedStrengthsViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();
            return employeeUnrealizedStrengthsViewModel;
        }

        public async Task<IEnumerable<EmployeeUnrealizedStrengthsViewModel>> GetEmployeeUnrealizedStrength(EmployeeUnrealizedStrengthsViewModel employeeUnrealizedStrengthsViewModel)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_EMP_UNREALIZED_STRENGTHS_GET,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
               {
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_EMP_UNREALIZED_STRENGTH_GET_UNREALIZEDSTRENGTHSID , employeeUnrealizedStrengthsViewModel.UnrealizedStrengthsId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_EMP_UNREALIZED_STRENGTH_GET_EMPLOYEEID , employeeUnrealizedStrengthsViewModel.EmployeeId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_EMP_UNREALIZED_STRENGTH_GET_STRENGTHID , employeeUnrealizedStrengthsViewModel.StrengthId),

             }
            };

            await query.ExecuteAsync();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new EmployeeUnrealizedStrengthsViewModel()
            {
                UnrealizedStrengthsId = Convert.ToInt32(row["UnrealizedStrengthsId"]),
                EmployeeId = Convert.ToInt32(row["EmployeeId"]),
                StrengthId = Convert.ToInt32(row["StrengthId"]),

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
            employeeUnrealizedStrengthsViewModel.Dispose();
            return ReturnedList;
        }

        public async Task<EmployeeUnrealizedStrengthsViewModel> RemoveEmployeeUnrealizedStrength(EmployeeUnrealizedStrengthsViewModel employeeUnrealizedStrengthsViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_EMP_Unrealized_Strengths.FirstOrDefaultAsync(c => c.UnrealizedStrengthsId == employeeUnrealizedStrengthsViewModel.UnrealizedStrengthsId);
                RowToUpdate.Active = false;
                RowToUpdate.LastChanged_By = employeeUnrealizedStrengthsViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                employeeUnrealizedStrengthsViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_REMOVE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                employeeUnrealizedStrengthsViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return employeeUnrealizedStrengthsViewModel;
        }

        public async Task<EmployeeUnrealizedStrengthsViewModel> ReturnEmployeeUnrealizedStrength(EmployeeUnrealizedStrengthsViewModel employeeUnrealizedStrengthsViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_EMP_Unrealized_Strengths.FirstOrDefaultAsync(c => c.UnrealizedStrengthsId == employeeUnrealizedStrengthsViewModel.UnrealizedStrengthsId);
                RowToUpdate.Active = true;
                RowToUpdate.LastChanged_By = employeeUnrealizedStrengthsViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                employeeUnrealizedStrengthsViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_RETURN_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                employeeUnrealizedStrengthsViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return employeeUnrealizedStrengthsViewModel;
        }

        public async Task<EmployeeUnrealizedStrengthsViewModel> UpdateEmployeeUnrealizedStrength(EmployeeUnrealizedStrengthsViewModel employeeUnrealizedStrengthsViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();
            try
            {
                var RowToUpdate = await context.tbl_EMP_Unrealized_Strengths.FirstOrDefaultAsync(c => c.UnrealizedStrengthsId == employeeUnrealizedStrengthsViewModel.UnrealizedStrengthsId);

                RowToUpdate.EmployeeId = employeeUnrealizedStrengthsViewModel.EmployeeId;
                RowToUpdate.StrengthId = employeeUnrealizedStrengthsViewModel.StrengthId;

                RowToUpdate.Active = employeeUnrealizedStrengthsViewModel.Active;
                RowToUpdate.Computer_Name = employeeUnrealizedStrengthsViewModel.Computer_Name;
                RowToUpdate.LastChanged_By = employeeUnrealizedStrengthsViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();

                await context.SaveChangesAsync();
                employeeUnrealizedStrengthsViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_UPDATE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                employeeUnrealizedStrengthsViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();

            return employeeUnrealizedStrengthsViewModel;
        }
    }
}
