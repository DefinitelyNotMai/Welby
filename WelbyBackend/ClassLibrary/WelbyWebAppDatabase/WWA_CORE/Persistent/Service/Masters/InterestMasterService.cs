using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Constants;
using WWA_CORE.Core.Repositories.Masters;
using WWA_CORE.Persistent.Context;
using WWA_CORE.Persistent.ViewModel.Masters;
using WWA_CORE.Utilities;
using System.Data.Entity;

namespace WWA_CORE.Persistent.Service.Masters
{
    public class InterestMasterService : IInterestMasterRepository
    {
        public async Task<InterestMasterViewModel> AddInterest(InterestMasterViewModel interestMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var rowtoInsert = new tbl_MST_Interest_Master
                {
                    Name = interestMasterViewModel.Name,

                    Active = true,
                    Encoded_By = interestMasterViewModel.Encoded_By,
                    Encoded_Date = globalFunctions.GetServerDateTime(),
                    Computer_Name = interestMasterViewModel.Computer_Name
                };

                context.tbl_MST_Interest_Master.Add(rowtoInsert);
                await context.SaveChangesAsync();
                interestMasterViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_ADD_MESSAGE_CODE;

            }
            catch (Exception ex)
            {
                interestMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }
            context.Dispose();
            globalFunctions.Dispose();
            return interestMasterViewModel;
        }

        public async Task<IEnumerable<InterestMasterViewModel>> GetInterestsList(InterestMasterViewModel interestMasterViewModel)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_MST_INTEREST_MASTER_GET,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
                {
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_MST_INTEREST_MASTER_GET_INTERESTID, interestMasterViewModel.InterestId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_MST_INTEREST_MASTER_GET_NAME, interestMasterViewModel.Name),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_ACTIVE, interestMasterViewModel.Active),
                }
            };

            await query.ExecuteAsync();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new InterestMasterViewModel()
            {
                InterestId = Convert.ToInt32(row["InterestId"]),
                Name = Convert.ToString(row["Name"]),

                Active = Convert.ToBoolean(row["Active"]),
                Encoded_By = Convert.ToInt32(row["Encoded_By"]),
                Encoded_Date = Convert.ToDateTime(row["Encoded_Date"]),
                Computer_Name = Convert.ToString(row["Computer_Name"]),
                LastChanged_By = DBNull.Value != row["LastChanged_By"] ? Convert.ToInt32(row["LastChanged_By"]) : 0,
                LastChanged_Date = DBNull.Value != row["LastChanged_Date"] ? (DateTime?)row["LastChanged_Date"] : null,
                EncodedByName = "",
                LastChangedByName = "",

            }).ToList();
            query.Dispose();
            interestMasterViewModel.Dispose();
            return ReturnedList;
        }

        public async Task<InterestMasterViewModel> RemoveInterest(InterestMasterViewModel interestMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_Interest_Master.FirstOrDefaultAsync(c => c.InterestId == interestMasterViewModel.InterestId);
                RowToUpdate.Active = false;
                RowToUpdate.LastChanged_By = interestMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                interestMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_REMOVE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                interestMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return interestMasterViewModel;
        }

        public async Task<InterestMasterViewModel> ReturnInterest(InterestMasterViewModel interestMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_Interest_Master.FirstOrDefaultAsync(c => c.InterestId == interestMasterViewModel.InterestId);
                RowToUpdate.Active = true;
                RowToUpdate.LastChanged_By = interestMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                interestMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_RETURN_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                interestMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return interestMasterViewModel;
        }

        public async Task<InterestMasterViewModel> UpdateInterest(InterestMasterViewModel interestMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_Interest_Master.FirstOrDefaultAsync(c => c.InterestId == interestMasterViewModel.InterestId);

                RowToUpdate.Name = interestMasterViewModel.Name;

                RowToUpdate.Active = interestMasterViewModel.Active;
                RowToUpdate.LastChanged_By = interestMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                RowToUpdate.Computer_Name = interestMasterViewModel.Computer_Name;

                await context.SaveChangesAsync();

                interestMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_UPDATE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                interestMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return interestMasterViewModel;
        }
    }
}
