using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Constants;
using WWA_CORE.Core.Repositories.Company;
using WWA_CORE.Persistent.Context;
using WWA_CORE.Persistent.ViewModel.Company;
using WWA_CORE.Persistent.ViewModel.Employee;
using WWA_CORE.Utilities;

namespace WWA_CORE.Persistent.Service.Company
{
    public class CompanyValuesService : ICompanyValuesRepository
    {
        public async Task<CompanyValuesViewModel> AddCompanyValue(CompanyValuesViewModel companyValuesViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var rowToInsert = new tbl_CMP_Values
                {
                    ValueId = companyValuesViewModel.ValueId,
                    CompanyId = companyValuesViewModel.CompanyId,

                    Active = true,
                    Encoded_By = companyValuesViewModel.Encoded_By,
                    Encoded_Date = globalFunctions.GetServerDateTime(),
                    Computer_Name = companyValuesViewModel.Computer_Name
                };

                context.tbl_CMP_Values.Add(rowToInsert);
                await context.SaveChangesAsync();
                companyValuesViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_ADD_MESSAGE_CODE;

            }
            catch (Exception ex)
            {
                companyValuesViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();
            return companyValuesViewModel;
        }

        public async Task<IEnumerable<CompanyValuesViewModel>> GetCompanyValues(CompanyValuesViewModel companyValuesViewModel)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_CMP_VALUES_GET,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
                {
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_CMP_VALUES_GET_COMPANYVALUESID , companyValuesViewModel.CompanyValuesId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_CMP_VALUES_GET_COMPANYID , companyValuesViewModel.CompanyId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_CMP_VALUES_GET_VALUEID , companyValuesViewModel.ValueId),

              }
            };

            await query.ExecuteAsync();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new CompanyValuesViewModel()
            {
                CompanyValuesId = Convert.ToInt32(row["CompanyValuesId"]),
                CompanyId = Convert.ToInt32(row["CompanyId"]),
                ValueId = Convert.ToInt32(row["ValueId"]),

                CompanyNameDisplay = Convert.ToString(row["CompanyNameDisplay"]),
                ValueTitleDisplay = Convert.ToString(row["ValueTitleDisplay"]),

                Active = Convert.ToBoolean(row["Active"]),
                Encoded_By = Convert.ToInt32(row["Encoded_By"]),
                Encoded_Date = Convert.ToDateTime(row["Encoded_Date"]),
                Computer_Name = Convert.ToString(row["Computer_Name"]),
                LastChanged_By = DBNull.Value != row["LastChanged_By"] ? Convert.ToInt32(row["LastChanged_By"]) : 0,
                LastChanged_Date = DBNull.Value != row["LastChanged_Date"] ? (DateTime?)row["LastChanged_Date"] : null,
                EncodedByName = "",
                LastChangedByName = "",
            }) ;

            query.Dispose();
            companyValuesViewModel.Dispose();
            return ReturnedList;
        }

        public async Task<CompanyValuesViewModel> RemoveCompanyValue(CompanyValuesViewModel companyValuesViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_CMP_Values.FirstOrDefaultAsync(c => c.CompanyValuesId == companyValuesViewModel.CompanyValuesId);
                RowToUpdate.Active = false;
                RowToUpdate.LastChanged_By = companyValuesViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                companyValuesViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_REMOVE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                companyValuesViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return companyValuesViewModel;
        }

        public async Task<CompanyValuesViewModel> ReturnCompanyValue(CompanyValuesViewModel companyValuesViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_CMP_Values.FirstOrDefaultAsync(c => c.CompanyValuesId == companyValuesViewModel.CompanyValuesId);
                RowToUpdate.Active = true;
                RowToUpdate.LastChanged_By = companyValuesViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                companyValuesViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_RETURN_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                companyValuesViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return companyValuesViewModel;
        }

        public async Task<CompanyValuesViewModel> UpdateCompanyValue(CompanyValuesViewModel companyValuesViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();
            try
            {
                var RowToUpdate = await context.tbl_CMP_Values.FirstOrDefaultAsync(c => c.CompanyValuesId == companyValuesViewModel.CompanyValuesId);

                RowToUpdate.CompanyId = companyValuesViewModel.CompanyId;
                RowToUpdate.ValueId = companyValuesViewModel.ValueId;

                RowToUpdate.Active = companyValuesViewModel.Active;
                RowToUpdate.Computer_Name = companyValuesViewModel.Computer_Name;
                RowToUpdate.LastChanged_By = companyValuesViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();

                await context.SaveChangesAsync();
                companyValuesViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_UPDATE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                companyValuesViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();

            return companyValuesViewModel;
        }
    }
}
