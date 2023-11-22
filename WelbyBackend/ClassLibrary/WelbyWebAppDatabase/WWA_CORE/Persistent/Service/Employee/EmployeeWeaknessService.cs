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
    public class EmployeeWeaknessService : IEmployeeWeaknessRepository
    {
        public async Task<EmployeeWeaknessViewModel> AddEmployeeWeakness(EmployeeWeaknessViewModel employeeWeaknessViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var rowToInsert = new tbl_EMP_Weakness
                {
                    EmployeeId = employeeWeaknessViewModel.EmployeeId,
                    StrengthId = employeeWeaknessViewModel.StrengthId,

                    Active = true,
                    Encoded_By = employeeWeaknessViewModel.Encoded_By,
                    Encoded_Date = globalFunctions.GetServerDateTime(),
                    Computer_Name = employeeWeaknessViewModel.Computer_Name
                };

                context.tbl_EMP_Weakness.Add(rowToInsert);
                await context.SaveChangesAsync();
                employeeWeaknessViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_ADD_MESSAGE_CODE;

            }
            catch (Exception ex)
            {
                employeeWeaknessViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();
            return employeeWeaknessViewModel;
        }

        public async Task<IEnumerable<EmployeeWeaknessViewModel>> GetEmployeeWeakness(EmployeeWeaknessViewModel employeeWeaknessViewModel)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_EMP_WEAKNESS_GET,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
                {
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_EMP_WEAKNESS_GET_EMPLOYEEWEAKNESSID , employeeWeaknessViewModel.EmployeeWeaknessId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_EMP_WEAKNESS_GET_EMPLOYEEID , employeeWeaknessViewModel.EmployeeId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_EMP_WEAKNESS_GET_STRENGTHID , employeeWeaknessViewModel.StrengthId),

              }
            };

            await query.ExecuteAsync();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new EmployeeWeaknessViewModel()
            {
                EmployeeWeaknessId = Convert.ToInt32(row["EmployeeWeaknessId"]),
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
            employeeWeaknessViewModel.Dispose();
            return ReturnedList;
        }

        public async Task<EmployeeWeaknessViewModel> RemoveEmployeeWeakness(EmployeeWeaknessViewModel employeeWeaknessViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_EMP_Weakness.FirstOrDefaultAsync(c => c.EmployeeWeaknessId == employeeWeaknessViewModel.EmployeeWeaknessId);
                RowToUpdate.Active = false;
                RowToUpdate.LastChanged_By = employeeWeaknessViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                employeeWeaknessViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_REMOVE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                employeeWeaknessViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return employeeWeaknessViewModel;
        }

        public async Task<EmployeeWeaknessViewModel> ReturnEmployeeWeakness(EmployeeWeaknessViewModel employeeWeaknessViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_EMP_Weakness.FirstOrDefaultAsync(c => c.EmployeeWeaknessId == employeeWeaknessViewModel.EmployeeWeaknessId);
                RowToUpdate.Active = true;
                RowToUpdate.LastChanged_By = employeeWeaknessViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                employeeWeaknessViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_RETURN_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                employeeWeaknessViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return employeeWeaknessViewModel;
        }

        public async Task<EmployeeWeaknessViewModel> UpdateEmployeeWeakness(EmployeeWeaknessViewModel employeeWeaknessViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();
            try
            {
                var RowToUpdate = await context.tbl_EMP_Weakness.FirstOrDefaultAsync(c => c.EmployeeWeaknessId == employeeWeaknessViewModel.EmployeeWeaknessId);

                RowToUpdate.EmployeeId = employeeWeaknessViewModel.EmployeeId;
                RowToUpdate.StrengthId = employeeWeaknessViewModel.StrengthId;

                RowToUpdate.Active = employeeWeaknessViewModel.Active;
                RowToUpdate.Computer_Name = employeeWeaknessViewModel.Computer_Name;
                RowToUpdate.LastChanged_By = employeeWeaknessViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();

                await context.SaveChangesAsync();
                employeeWeaknessViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_UPDATE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                employeeWeaknessViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();

            return employeeWeaknessViewModel;
        }
    }
}
