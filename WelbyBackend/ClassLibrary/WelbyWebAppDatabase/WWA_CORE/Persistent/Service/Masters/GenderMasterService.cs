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
    public class GenderMasterService : IGenderMasterRepository
    {
        public async Task<GenderMasterViewModel> AddGender(GenderMasterViewModel genderMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var rowToInsert = new tbl_MST_Gender_Master
                {
                    Gender = genderMasterViewModel.Gender,
                    Biological = genderMasterViewModel.Biological,

                    Active = true,
                    Encoded_By = genderMasterViewModel.Encoded_By,
                    Encoded_Date = globalFunctions.GetServerDateTime(),
                    Computer_Name = genderMasterViewModel.Computer_Name
                };

                context.tbl_MST_Gender_Master.Add(rowToInsert);
                await context.SaveChangesAsync();
                genderMasterViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_ADD_MESSAGE_CODE;
            } 
            catch (Exception ex)
            {
                genderMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }
            context.Dispose();
            globalFunctions.Dispose();
            return genderMasterViewModel;
        }

        public async Task<IEnumerable<GenderMasterViewModel>> GetGenderList(GenderMasterViewModel genderMasterViewModel)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_MST_GENDER_MASTER_GET,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
                {
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_MST_GENDER_MASTER_GET_GENDERID, genderMasterViewModel.GenderId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_ACTIVE, genderMasterViewModel.Active),
                }
            };

            await query.ExecuteAsync();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new GenderMasterViewModel()
            {
                GenderId = Convert.ToInt32(row["GenderId"]),
                Gender = Convert.ToString(row["Gender"]),
                Biological = Convert.ToBoolean(row["Biological"]),

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
            genderMasterViewModel.Dispose();
            return ReturnedList;
        }

        public async Task<GenderMasterViewModel> RemoveGender(GenderMasterViewModel genderMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_Gender_Master.FirstOrDefaultAsync(c => c.GenderId == genderMasterViewModel.GenderId);
                RowToUpdate.Active = false;
                RowToUpdate.LastChanged_By = genderMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                genderMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_REMOVE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                genderMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return genderMasterViewModel;
        }

        public async Task<GenderMasterViewModel> ReturnGender(GenderMasterViewModel genderMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_Gender_Master.FirstOrDefaultAsync(c => c.GenderId == genderMasterViewModel.GenderId);
                RowToUpdate.Active = true;
                RowToUpdate.LastChanged_By = genderMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                genderMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_RETURN_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                genderMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return genderMasterViewModel;
        }

        public async Task<GenderMasterViewModel> UpdateGender(GenderMasterViewModel genderMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_Gender_Master.FirstOrDefaultAsync(c => c.GenderId == genderMasterViewModel.GenderId);

                RowToUpdate.Gender = genderMasterViewModel.Gender;
                RowToUpdate.Biological = genderMasterViewModel.Biological;
                RowToUpdate.Active = genderMasterViewModel.Active;
                RowToUpdate.LastChanged_By = genderMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                RowToUpdate.Computer_Name = genderMasterViewModel.Computer_Name;

                await context.SaveChangesAsync();

                genderMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_UPDATE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                genderMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return genderMasterViewModel;
        }
    }
}
