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
    public class EmployeeRealizedStrengthsService : IEmployeeRealizedStrengthsRepository
    {
        public async Task<EmployeeRealizedStrengthsViewModel> AddEmployeeRealizedStrength(EmployeeRealizedStrengthsViewModel employeeRealizedStrengthsViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var rowToInsert = new tbl_EMP_Realized_Strengths
                {
                    EmployeeId = employeeRealizedStrengthsViewModel.EmployeeId,
                    StrengthId = employeeRealizedStrengthsViewModel.StrengthId,

                    Active = true,
                    Encoded_By = employeeRealizedStrengthsViewModel.Encoded_By,
                    Encoded_Date = globalFunctions.GetServerDateTime(),
                    Computer_Name = employeeRealizedStrengthsViewModel.Computer_Name
                };

                context.tbl_EMP_Realized_Strengths.Add(rowToInsert);
                await context.SaveChangesAsync();
                employeeRealizedStrengthsViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_ADD_MESSAGE_CODE;

            }
            catch (Exception ex)
            {
                employeeRealizedStrengthsViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();
            return employeeRealizedStrengthsViewModel;
        }

        public async Task<IEnumerable<EmployeeRealizedStrengthsViewModel>> GetEmployeeRealizedStrength(EmployeeRealizedStrengthsViewModel employeeRealizedStrengthsViewModel)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_EMP_REALIZED_STRENGTHS_GET,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
               {
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_EMP_REALIZED_STRENGTH_GET_REALIZEDSTRENGTHSID , employeeRealizedStrengthsViewModel.RealizedStrengthsId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_EMP_REALIZED_STRENGTH_GET_EMPLOYEEID , employeeRealizedStrengthsViewModel.EmployeeId),

             }
            };

            await query.ExecuteAsync();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new EmployeeRealizedStrengthsViewModel()
            {
                RealizedStrengthsId = Convert.ToInt32(row["RealizedStrengthsId"]),
                EmployeeId = Convert.ToInt32(row["EmployeeId"]),
                StrengthId = Convert.ToInt32(row["StrengthId"]),

                EmployeeFirstNameDisplay = Convert.ToString(row["EmployeeFirstNameDisplay"]),
                RealizedStrengthDisplay = Convert.ToString(row["RealizedStrengthDisplay"]),
                
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
            employeeRealizedStrengthsViewModel.Dispose();
            return ReturnedList;
        }

        public async Task<EmployeeRealizedStrengthsViewModel> RemoveEmployeeRealizedStrength(EmployeeRealizedStrengthsViewModel employeeRealizedStrengthsViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_EMP_Realized_Strengths.FirstOrDefaultAsync(c => c.RealizedStrengthsId == employeeRealizedStrengthsViewModel.RealizedStrengthsId);
                RowToUpdate.Active = false;
                RowToUpdate.LastChanged_By = employeeRealizedStrengthsViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                employeeRealizedStrengthsViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_REMOVE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                employeeRealizedStrengthsViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return employeeRealizedStrengthsViewModel;
        }

        public async Task<EmployeeRealizedStrengthsViewModel> ReturnEmployeeRealizedStrength(EmployeeRealizedStrengthsViewModel employeeRealizedStrengthsViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_EMP_Realized_Strengths.FirstOrDefaultAsync(c => c.RealizedStrengthsId == employeeRealizedStrengthsViewModel.RealizedStrengthsId);
                RowToUpdate.Active = true;
                RowToUpdate.LastChanged_By = employeeRealizedStrengthsViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                employeeRealizedStrengthsViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_RETURN_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                employeeRealizedStrengthsViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return employeeRealizedStrengthsViewModel;
        }

        public async Task<EmployeeRealizedStrengthsViewModel> UpdateEmployeeRealizedStrength(EmployeeRealizedStrengthsViewModel employeeRealizedStrengthsViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();
            try
            {
                var RowToUpdate = await context.tbl_EMP_Realized_Strengths.FirstOrDefaultAsync(c => c.RealizedStrengthsId == employeeRealizedStrengthsViewModel.RealizedStrengthsId);

                RowToUpdate.EmployeeId = employeeRealizedStrengthsViewModel.EmployeeId;
                RowToUpdate.StrengthId = employeeRealizedStrengthsViewModel.StrengthId;

                RowToUpdate.Active = employeeRealizedStrengthsViewModel.Active;
                RowToUpdate.Computer_Name = employeeRealizedStrengthsViewModel.Computer_Name;
                RowToUpdate.LastChanged_By = employeeRealizedStrengthsViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();

                await context.SaveChangesAsync();
                employeeRealizedStrengthsViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_UPDATE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                employeeRealizedStrengthsViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();

            return employeeRealizedStrengthsViewModel;
        }
    }
}
