using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using WWA_CORE.Constants;
using WWA_CORE.Core.Repositories.Algo;
using WWA_CORE.Persistent.Context;
using WWA_CORE.Persistent.ViewModel.Algo;
using WWA_CORE.Utilities;
using System.Data;
using System.Data.Entity;

namespace WWA_CORE.Persistent.Service.Algo
{
    public class DailyCheckInService : IDailyCheckInRepository
    {
        public async Task<DailyCheckInViewModel> AddDailyCheckIn(DailyCheckInViewModel dailyCheckInViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var rowToInsert = new tbl_EMP_DailyCheckIn
                {
                    EmployeeId = dailyCheckInViewModel.EmployeeId,
                    FocusAtWork_int = dailyCheckInViewModel.FocusAtWork_int,
                    EnergyAtWork_int = dailyCheckInViewModel.EnergyAtWork_int,
                    PositiveEmotions_int = dailyCheckInViewModel.PositiveEmotions_int,
                    NegativeEmotions_int = dailyCheckInViewModel.NegativeEmotions_int,

                    FocusAtWork_value = dailyCheckInViewModel.FocusAtWork_value,
                    EnergyAtWork_value = dailyCheckInViewModel.EnergyAtWork_value,
                    PositiveEmotions_value = dailyCheckInViewModel.PositiveEmotions_value,
                    NegativeEmotions_value = dailyCheckInViewModel.NegativeEmotions_value,

                    Active = true,
                    Encoded_By = dailyCheckInViewModel.Encoded_By,
                    Encoded_Date = globalFunctions.GetServerDateTime(),
                    Computer_Name = dailyCheckInViewModel.Computer_Name

                };
                context.tbl_EMP_DailyCheckIn.Add(rowToInsert);
                await context.SaveChangesAsync();
                dailyCheckInViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_ADD_MESSAGE_CODE;
            }
            catch (Exception ex)
            {
                dailyCheckInViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();
            return dailyCheckInViewModel;
        }

        public async Task<IEnumerable<DailyCheckInViewModel>> GetAllDailyCheckIn(DailyCheckInViewModel dailyCheckInViewModel)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_EMP_DAILYCHECKIN_GET,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
                {
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_EMP_DAILYCHECKIN_GET_EMPLOYEEID, dailyCheckInViewModel.EmployeeId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_ACTIVE, dailyCheckInViewModel.Active)
                }
            };
            await query.ExecuteAsync();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new DailyCheckInViewModel()
            {
                DailyCheckInId = Convert.ToInt32(row["DailyCheckInId"]),
                EmployeeId = Convert.ToInt32(row["EmployeeId"]),
                EnergyAtWork_int = Convert.ToInt32(row["EnergyAtWork_int"]),
                FocusAtWork_int = Convert.ToInt32(row["FocusAtWork_int"]),
                PositiveEmotions_int = Convert.ToInt32(row["PositiveEmotions_int"]),
                NegativeEmotions_int = Convert.ToInt32(row["NegativeEmotions_int"]),

                EnergyAtWork_value = Convert.ToString(row["EnergyAtWork_value"]),
                FocusAtWork_value = Convert.ToString(row["FocusAtWork_value"]),
                PositiveEmotions_value = Convert.ToString(row["PositiveEmotions_value"]),
                NegativeEmotions_value = Convert.ToString(row["NegativeEmotions_value"]),

                Active = Convert.ToBoolean(row["Active"]),
                Encoded_By = Convert.ToInt32(row["Encoded_By"]),
                Encoded_Date = Convert.ToDateTime(row["Encoded_Date"]),
                Computer_Name = Convert.ToString(row["Computer_Name"]),
                LastChanged_By = DBNull.Value != row["LastChanged_By"] ? Convert.ToInt32(row["LastChanged_By"]) : 0,
                LastChanged_Date = DBNull.Value != row["LastChanged_Date"] ? (DateTime?)row["LastChanged_Date"] : null,
            }).ToList();
            query.Dispose();
            dailyCheckInViewModel.Dispose();
            return ReturnedList;

        }

        public async Task<DailyCheckInViewModel> RemoveDailyCheckIn(DailyCheckInViewModel dailyCheckInViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_EMP_DailyCheckIn.FirstOrDefaultAsync(c => c.DailyCheckInId == dailyCheckInViewModel.DailyCheckInId);
                RowToUpdate.Active = false;
                RowToUpdate.LastChanged_By = dailyCheckInViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                dailyCheckInViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_REMOVE_MESSAGE_CODE;
            }
            catch(Exception ex)
            {
                dailyCheckInViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();

            return dailyCheckInViewModel;
        }

        public async Task<DailyCheckInViewModel> ReturnDailyCheckIn(DailyCheckInViewModel dailyCheckInViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_EMP_DailyCheckIn.FirstOrDefaultAsync(c => c.DailyCheckInId == dailyCheckInViewModel.DailyCheckInId);
                RowToUpdate.Active = true;
                RowToUpdate.LastChanged_By = dailyCheckInViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                dailyCheckInViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_RETURN_MESSAGE_CODE;
            }
            catch (Exception ex)
            {
                dailyCheckInViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();

            return dailyCheckInViewModel;
        }
    }
}
