using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Constants;
using WWA_CORE.Core.Repositories.Employee;
using WWA_CORE.Persistent.Context;
using WWA_CORE.Persistent.ViewModel.Employee;
using WWA_CORE.Persistent.ViewModel.Masters;
using WWA_CORE.Persistent.ViewModel.Registration;
using WWA_CORE.Utilities;

namespace WWA_CORE.Persistent.Service.Employee
{
    public class EmployeeInterestService : IEmployeeInterestRepository
    {
        public async Task<EmployeeInterestViewModel> AddEmployeeInterest(EmployeeInterestViewModel employeeInterestViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var rowToInsert = new tbl_EMP_Interest
                {
                    EmployeeId = employeeInterestViewModel.EmployeeId,
                    InterestId = employeeInterestViewModel.InterestId,
                    Active = true,
                    Encoded_By = employeeInterestViewModel.Encoded_By,
                    Encoded_Date = globalFunctions.GetServerDateTime(),
                    Computer_Name = employeeInterestViewModel.Computer_Name
                };

                context.tbl_EMP_Interest.Add(rowToInsert);
                await context.SaveChangesAsync();
                employeeInterestViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_ADD_MESSAGE_CODE;

            } 
            catch(Exception ex)
            {
                employeeInterestViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();
            return employeeInterestViewModel;
        }

        public async Task<IEnumerable<EmployeeInterestViewModel>> GetEmployeeInterests(EmployeeInterestViewModel employeeInterestViewModel)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_EMP_INTEREST_GET,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
                {
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_EMP_INTEREST_GET_EMPLOYEEINTERESTLID , employeeInterestViewModel.EmployeeInterestId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_EMP_INTEREST_GET_EMPLOYEEID , employeeInterestViewModel.EmployeeId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_EMP_INTEREST_GET_INTERESTID , employeeInterestViewModel.InterestId),
                    
              }
            };

            await query.ExecuteAsync();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new EmployeeInterestViewModel()
            {
                EmployeeInterestId = Convert.ToInt32(row["EmployeeInterestId"]),
                EmployeeId = Convert.ToInt32(row["EmployeeId"]),
                InterestId = Convert.ToInt32(row["InterestId"]),

                EmployeeFirstNameDisplay = Convert.ToString(row["EmployeeFirstNameDisplay"]),
                InterestNameDisplay = Convert.ToString(row["InterestTitleDispaly"]),

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
            employeeInterestViewModel.Dispose();
            return ReturnedList;
        }

        public async Task<EmployeeInterestViewModel> RemoveEmployeeInterest(EmployeeInterestViewModel employeeInterestViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_EMP_Interest.FirstOrDefaultAsync(c => c.EmployeeInterestId == employeeInterestViewModel.EmployeeInterestId);
                RowToUpdate.Active = false;
                RowToUpdate.LastChanged_By = employeeInterestViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                employeeInterestViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_REMOVE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                employeeInterestViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return employeeInterestViewModel;
        }

        public async Task<EmployeeInterestViewModel> ReturnEmployeeInterest(EmployeeInterestViewModel employeeInterestViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_EMP_Interest.FirstOrDefaultAsync(c => c.EmployeeInterestId == employeeInterestViewModel.EmployeeInterestId);
                RowToUpdate.Active = true;
                RowToUpdate.LastChanged_By = employeeInterestViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                employeeInterestViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_RETURN_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                employeeInterestViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return employeeInterestViewModel;
        }

        public async Task<EmployeeInterestViewModel> UpdateEmployeeInterest(EmployeeInterestViewModel employeeInterestViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();
            try
            {
                var RowToUpdate = await context.tbl_EMP_Interest.FirstOrDefaultAsync(c => c.EmployeeInterestId == employeeInterestViewModel.EmployeeInterestId);

                RowToUpdate.EmployeeId = employeeInterestViewModel.EmployeeId;
                RowToUpdate.InterestId = employeeInterestViewModel.InterestId;

                RowToUpdate.Active = employeeInterestViewModel.Active;
                RowToUpdate.Computer_Name = employeeInterestViewModel.Computer_Name;
                RowToUpdate.LastChanged_By = employeeInterestViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();

                await context.SaveChangesAsync();
                employeeInterestViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_UPDATE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                employeeInterestViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();

            return employeeInterestViewModel;
        }
    }
}
