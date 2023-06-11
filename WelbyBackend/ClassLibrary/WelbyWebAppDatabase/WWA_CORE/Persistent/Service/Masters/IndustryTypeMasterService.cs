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
    public class IndustryTypeMasterService : IIndustryTypeMasterRepository
    {
        public async Task<IndustryTypeMasterViewModel> AddIndustryType(IndustryTypeMasterViewModel industryTypeMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var rowtoInsert = new tbl_MST_IndustryType_Master
                {
                    Industry_Name = industryTypeMasterViewModel.Industry_Name,
                    Active = true,
                    Encoded_By = industryTypeMasterViewModel.Encoded_By,
                    Encoded_Date = globalFunctions.GetServerDateTime(),
                    Computer_Name = industryTypeMasterViewModel.Computer_Name
                };

                context.tbl_MST_IndustryType_Master.Add(rowtoInsert);
                await context.SaveChangesAsync();
                industryTypeMasterViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_ADD_MESSAGE_CODE;

            }
            catch (Exception ex)
            {
                industryTypeMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }
            context.Dispose();
            globalFunctions.Dispose();
            return industryTypeMasterViewModel;
        }

        public async Task<IEnumerable<IndustryTypeMasterViewModel>> GetIndustryTypeList(IndustryTypeMasterViewModel industryTypeMasterViewModel)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_MST_INDUSTRY_TYPE_MASTER_GET,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
                {
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_MST_INDUSTRY_TYPE_MASTER_GET_INDUSTRYTYPEID, industryTypeMasterViewModel.IndustryTypeId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_ACTIVE, industryTypeMasterViewModel.Active),
                }
            };

            await query.ExecuteAsync();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new IndustryTypeMasterViewModel()
            {
                IndustryTypeId = Convert.ToInt32(row["IndustryTypeId"]),
                Industry_Name = Convert.ToString(row["Industry_Name"]),
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
            industryTypeMasterViewModel.Dispose();
            return ReturnedList;
        }

        public async Task<IndustryTypeMasterViewModel> RemoveIndustryType(IndustryTypeMasterViewModel industryTypeMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_IndustryType_Master.FirstOrDefaultAsync(c => c.IndustryTypeId == industryTypeMasterViewModel.IndustryTypeId);
                RowToUpdate.Active = false;
                RowToUpdate.LastChanged_By = industryTypeMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime(); 
                await context.SaveChangesAsync();
                industryTypeMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_REMOVE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                industryTypeMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return industryTypeMasterViewModel;
        }

        public async Task<IndustryTypeMasterViewModel> ReturnIndustryType(IndustryTypeMasterViewModel industryTypeMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_IndustryType_Master.FirstOrDefaultAsync(c => c.IndustryTypeId == industryTypeMasterViewModel.IndustryTypeId);
                RowToUpdate.Active = true;
                RowToUpdate.LastChanged_By = industryTypeMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                industryTypeMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_RETURN_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                industryTypeMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();

            return industryTypeMasterViewModel;
        }

        public async Task<IndustryTypeMasterViewModel> UpdateIndustryType(IndustryTypeMasterViewModel industryTypeMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_IndustryType_Master.FirstOrDefaultAsync(c => c.IndustryTypeId == industryTypeMasterViewModel.IndustryTypeId);

                RowToUpdate.Industry_Name = industryTypeMasterViewModel.Industry_Name;
                RowToUpdate.Active = industryTypeMasterViewModel.Active;
                RowToUpdate.LastChanged_By = industryTypeMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                RowToUpdate.Computer_Name = industryTypeMasterViewModel.Computer_Name;

                await context.SaveChangesAsync();

                industryTypeMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_UPDATE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                industryTypeMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return industryTypeMasterViewModel;
        }
    }
}
