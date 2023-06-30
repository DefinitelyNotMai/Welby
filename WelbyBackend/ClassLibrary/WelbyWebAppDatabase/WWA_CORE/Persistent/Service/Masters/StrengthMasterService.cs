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
    public class StrengthMasterService : IStrengthMasterRepository
    {
        public async Task<StrengthMasterViewModel> AddStrength(StrengthMasterViewModel strengthMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var rowtoInsert = new tbl_MST_Strength_Master
                {
                    Strength = strengthMasterViewModel.Strength,
                    Category = strengthMasterViewModel.Category,
                    Description = strengthMasterViewModel.Description,

                    Active = true,
                    Encoded_By = strengthMasterViewModel.Encoded_By,
                    Encoded_Date = globalFunctions.GetServerDateTime(),
                    Computer_Name = strengthMasterViewModel.Computer_Name
                };

                context.tbl_MST_Strength_Master.Add(rowtoInsert);
                await context.SaveChangesAsync();
                strengthMasterViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_ADD_MESSAGE_CODE;

            }
            catch (Exception ex)
            {
                strengthMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }
            context.Dispose();
            globalFunctions.Dispose();
            return strengthMasterViewModel;
        }

        public async Task<IEnumerable<KeyValuePair>> GetStrengthCategory()
        {
            var FilterTypeList = new List<KeyValuePair>();
            await Task.Run(() =>
            {
                FilterTypeList.Insert(0, new KeyValuePair { Key = 0, Value = WWA_COREDefaults.DEFAULT_KEYVALUEPAIR_VALUE});
                foreach (var item in Enum.GetValues(typeof(EnumClass.StrengthCategory))) 
                {
                    FilterTypeList.Add(new KeyValuePair { Key = (int)item, Value = item.ToString().Replace("_", " ") });
                }
            });

            return FilterTypeList;
        }

        public async Task<IEnumerable<StrengthMasterViewModel>> GetStrengthList(StrengthMasterViewModel strengthMasterViewModel)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_MST_STRENGTH_MASTER_GET,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
                {
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_MST_STRENGTH_MASTER_GET_STRENGTHID, strengthMasterViewModel.StrengthId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_ACTIVE, strengthMasterViewModel.Active),
                }
            };

            await query.ExecuteAsync();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new StrengthMasterViewModel()
            {
                Strength = Convert.ToString(row["Strength"]),
                StrengthId = Convert.ToInt32(row["StrengthId"]),
                Category = Convert.ToString(row["Category"]),
                Description = Convert.ToString(row["Description"]),

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
            strengthMasterViewModel.Dispose();
            return ReturnedList;
        }

        public async Task<StrengthMasterViewModel> RemoveStrength(StrengthMasterViewModel strengthMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_Strength_Master.FirstOrDefaultAsync(c => c.StrengthId == strengthMasterViewModel.StrengthId);
                RowToUpdate.Active = false;
                RowToUpdate.LastChanged_By = strengthMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                strengthMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_REMOVE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                strengthMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return strengthMasterViewModel;
        }

        public async Task<StrengthMasterViewModel> ReturnStrength(StrengthMasterViewModel strengthMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_Strength_Master.FirstOrDefaultAsync(c => c.StrengthId == strengthMasterViewModel.StrengthId);
                RowToUpdate.Active = true;
                RowToUpdate.LastChanged_By = strengthMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                strengthMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_RETURN_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                strengthMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return strengthMasterViewModel;
        }

        public async Task<StrengthMasterViewModel> UpdateStrength(StrengthMasterViewModel strengthMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_Strength_Master.FirstOrDefaultAsync(c => c.StrengthId == strengthMasterViewModel.StrengthId);

                RowToUpdate.Strength = strengthMasterViewModel.Strength;
                RowToUpdate.Category = strengthMasterViewModel.Category;
                RowToUpdate.Description = strengthMasterViewModel.Description;

                RowToUpdate.Active = strengthMasterViewModel.Active;
                RowToUpdate.LastChanged_By = strengthMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                RowToUpdate.Computer_Name = strengthMasterViewModel.Computer_Name;

                await context.SaveChangesAsync();

                strengthMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_UPDATE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                strengthMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return strengthMasterViewModel;
        }
    }
}
