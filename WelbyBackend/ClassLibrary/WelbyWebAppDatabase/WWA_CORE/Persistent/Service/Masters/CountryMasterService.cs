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
    public class CountryMasterService : ICountryMasterRepository
    {
        public async Task<CountryMasterViewModel> AddCountry(CountryMasterViewModel countryMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var rowToInsert = new tbl_MST_Country_Master
                {
                    Name = countryMasterViewModel.Name,
                    CountryId = countryMasterViewModel.CountryId,
                    Flag_Image = countryMasterViewModel.Flag_Image,
                    Nationality = countryMasterViewModel.Nationality,
                    Active = true,
                    Encoded_By = countryMasterViewModel.Encoded_By,
                    Encoded_Date = globalFunctions.GetServerDateTime(),
                    Computer_Name = countryMasterViewModel.Computer_Name
                };

                context.tbl_MST_Country_Master.Add(rowToInsert);
                await context.SaveChangesAsync();
                countryMasterViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_ADD_MESSAGE_CODE;

            }
            catch (Exception ex)
            {
                countryMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }
            context.Dispose();
            globalFunctions.Dispose();
            return countryMasterViewModel;
        } 

        public async Task<IEnumerable<CountryMasterViewModel>> GetCountryList(CountryMasterViewModel countryMasterViewModel)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_MST_COUNTRY_MASTER_GET,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
                {
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_MST_COUNTRY_MASTER_GET_COUNTRYID, countryMasterViewModel.CountryId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_ACTIVE, countryMasterViewModel.Active),
                }
            };

            await query.ExecuteAsync();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new CountryMasterViewModel()
            {
                CountryId = Convert.ToInt32(row["CountryId"]),
                Name = Convert.ToString(row["Name"]),
                Nationality = Convert.ToString(row["Nationality"]),
                Flag_Image = Convert.ToString(row["Flag_Image"]), // the data type in the database is text, is this right?
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
            countryMasterViewModel.Dispose();
            return ReturnedList;
        }

        public async Task<CountryMasterViewModel> RemoveCountry(CountryMasterViewModel countryMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_Country_Master.FirstOrDefaultAsync(c => c.CountryId == countryMasterViewModel.CountryId);
                RowToUpdate.Active = false;
                RowToUpdate.LastChanged_By = countryMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                countryMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_REMOVE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                countryMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return countryMasterViewModel;
        }

        public async Task<CountryMasterViewModel> ReturnCountry(CountryMasterViewModel countryMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_Country_Master.FirstOrDefaultAsync(c => c.CountryId == countryMasterViewModel.CountryId);
                RowToUpdate.Active = true;
                RowToUpdate.LastChanged_By = countryMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                countryMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_RETURN_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                countryMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return countryMasterViewModel;
        }

        public async Task<CountryMasterViewModel> UpdateCountry(CountryMasterViewModel countryMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_Country_Master.FirstOrDefaultAsync(c => c.CountryId == countryMasterViewModel.CountryId);

                RowToUpdate.Name = countryMasterViewModel.Name;
                RowToUpdate.Nationality = countryMasterViewModel.Nationality;
                RowToUpdate.Flag_Image = countryMasterViewModel.Flag_Image;

                RowToUpdate.Active = countryMasterViewModel.Active;
                RowToUpdate.LastChanged_By = countryMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                RowToUpdate.Computer_Name = countryMasterViewModel.Computer_Name;

                await context.SaveChangesAsync();

                countryMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_UPDATE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                countryMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return countryMasterViewModel;
        }
    }
}
