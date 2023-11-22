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
    public class ValueMasterService : IValueMasterRepository
    {
        public async Task<ValueMasterViewModel> AddValue(ValueMasterViewModel valueMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var rowtoInsert = new tbl_MST_Value_Master
                {
                    Title = valueMasterViewModel.Title,
                    CompanyId = valueMasterViewModel.CompanyId,
                    Description = valueMasterViewModel.Title,
                    

                    Active = true,
                    Encoded_By = valueMasterViewModel.Encoded_By,
                    Encoded_Date = globalFunctions.GetServerDateTime(),
                    Computer_Name = valueMasterViewModel.Computer_Name
                };

                context.tbl_MST_Value_Master.Add(rowtoInsert);
                await context.SaveChangesAsync();
                valueMasterViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_ADD_MESSAGE_CODE;

            }
            catch (Exception ex)
            {
                valueMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }
            context.Dispose();
            globalFunctions.Dispose();
            return valueMasterViewModel;
        }

        public async Task<IEnumerable<ValueMasterViewModel>> GetValueByCompany(ValueMasterViewModel valueMasterViewModel)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_MST_VALUE_MASTER_PAGEWISE_GET,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
                {
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_MST_VALUE_MASTER_GET_VALUEID, valueMasterViewModel.CompanyId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_ACTIVE, valueMasterViewModel.Active),

                }
            };

            await query.ExecuteAsync();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new ValueMasterViewModel()
            {

                ValueId = Convert.ToInt32(row["ValueId"]),
                CompanyId = Convert.ToInt32(row["CompanyId"]),
                Title = Convert.ToString(row["Title"]),
                Description = Convert.ToString(row["Description"]),

                Active = Convert.ToBoolean(row["Active"]),
                Encoded_By = Convert.ToInt32(row["Encoded_By"]),
                Encoded_Date = Convert.ToDateTime(row["Encoded_Date"]),
                Computer_Name = Convert.ToString(row["Computer_Name"]),
                LastChanged_By = DBNull.Value != row["LastChanged_By"] ? Convert.ToInt32(row["LastChanged_By"]) : 0,
                LastChanged_Date = DBNull.Value != row["LastChanged_Date"] ? (DateTime?)row["LastChanged_Date"] : null,
                EncodedByName = "",
                LastChangedByName = "",

                TotalRows = Convert.ToInt32(row["TotalRows"]),
                TotalPage = Convert.ToInt32(row["TotalPage"]),

            }).ToList();
            query.Dispose();
            valueMasterViewModel.Dispose();
            return ReturnedList;
        }

        public async Task<IEnumerable<ValueMasterViewModel>> GetValues(ValueMasterViewModel valueMasterViewModel)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_MST_VALUE_MASTER_GET,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
                {
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_MST_VALUE_MASTER_GET_VALUEID, valueMasterViewModel.ValueId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_ACTIVE, valueMasterViewModel.Active)

                }
            };

            await query.ExecuteAsync();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new ValueMasterViewModel()
            {

                ValueId = Convert.ToInt32(row["ValueId"]),
                CompanyId = Convert.ToInt32(row["CompanyId"]),
                Title = Convert.ToString(row["Title"]),
                Description = Convert.ToString(row["Description"]),

                Active = Convert.ToBoolean(row["Active"]),
                Encoded_By = Convert.ToInt32(row["Encoded_By"]),
                Encoded_Date = Convert.ToDateTime(row["Encoded_Date"]),
                Computer_Name = Convert.ToString(row["Computer_Name"]),
                LastChanged_By = DBNull.Value != row["LastChanged_By"] ? Convert.ToInt32(row["LastChanged_By"]) : 0,
                LastChanged_Date = DBNull.Value != row["LastChanged_Date"] ? (DateTime?)row["LastChanged_Date"] : null,
                EncodedByName = ""

            }).ToList();
            query.Dispose();
            valueMasterViewModel.Dispose();
            return ReturnedList;
        }

        public async Task<ValueMasterViewModel> RemoveValue(ValueMasterViewModel valueMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_Value_Master.FirstOrDefaultAsync(c => c.ValueId == valueMasterViewModel.ValueId);
                RowToUpdate.Active = false;
                RowToUpdate.LastChanged_By = valueMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                valueMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_REMOVE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                valueMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return valueMasterViewModel;
        }

        public async Task<ValueMasterViewModel> ReturnValue(ValueMasterViewModel valueMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_Value_Master.FirstOrDefaultAsync(c => c.ValueId == valueMasterViewModel.ValueId);
                RowToUpdate.Active = true;
                RowToUpdate.LastChanged_By = valueMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                valueMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_RETURN_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                valueMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return valueMasterViewModel;
        }

        public async Task<ValueMasterViewModel> UpdateValue(ValueMasterViewModel valueMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_Value_Master.FirstOrDefaultAsync(c => c.ValueId == valueMasterViewModel.ValueId);

                RowToUpdate.Title = valueMasterViewModel.Title;
                RowToUpdate.Description = valueMasterViewModel.Description;
                RowToUpdate.CompanyId = valueMasterViewModel.CompanyId;
                

                RowToUpdate.Active = valueMasterViewModel.Active;
                RowToUpdate.LastChanged_By = valueMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                RowToUpdate.Computer_Name = valueMasterViewModel.Computer_Name;

                await context.SaveChangesAsync();

                valueMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_UPDATE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                valueMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return valueMasterViewModel;
        }
    }
}
