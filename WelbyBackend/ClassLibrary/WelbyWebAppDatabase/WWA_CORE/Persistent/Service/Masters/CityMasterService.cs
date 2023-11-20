using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations.Model;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using WWA_CORE.Constants;
using WWA_CORE.Core.Repositories.Masters;
using WWA_CORE.Persistent.Context;
using WWA_CORE.Persistent.ViewModel.Masters;
using WWA_CORE.Utilities;
using System.Data;
using System.Data.Entity;
using System.Drawing;

namespace WWA_CORE.Persistent.Service.Masters
{
    public class CityMasterService : ICityMasterRepository
    {
        public async Task<CityMasterViewModel> AddCity(CityMasterViewModel cityMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var rowToInsert = new tbl_MST_City_Master
                {
                    Name = cityMasterViewModel.Name,
                    CountryId = cityMasterViewModel.CountryId,
                    Active = true,
                    Encoded_By = cityMasterViewModel.Encoded_By,
                    Encoded_Date = globalFunctions.GetServerDateTime(),
                    Computer_Name = cityMasterViewModel.Computer_Name
                };

                context.tbl_MST_City_Master.Add(rowToInsert);
                await context.SaveChangesAsync();
                cityMasterViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_ADD_MESSAGE_CODE;

            } 
            catch(Exception ex)
            {
                cityMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }
            context.Dispose();
            globalFunctions.Dispose();
            return cityMasterViewModel;

        }

        public async Task<IEnumerable<CityMasterViewModel>> GetCityList(CityMasterViewModel cityMasterViewModel)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_MST_CITY_MASTER_GET,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
                {
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_MST_CITY_MASTER_GET_CITYID, cityMasterViewModel.CityId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_ACTIVE, cityMasterViewModel.Active),
                }
            };

            await query.ExecuteAsync();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new CityMasterViewModel()
            {
                CityId = Convert.ToInt32(row["CityId"]),
                CountryId = Convert.ToInt32(row["CountryId"]),
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
            cityMasterViewModel.Dispose();
            return ReturnedList;

        }

        public async Task<CityMasterViewModel> UpdateCity(CityMasterViewModel cityMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_City_Master.FirstOrDefaultAsync(c => c.CityId == cityMasterViewModel.CityId);

                RowToUpdate.Name = cityMasterViewModel.Name;
                RowToUpdate.CountryId = cityMasterViewModel.CountryId;
                RowToUpdate.Active = cityMasterViewModel.Active;
                RowToUpdate.LastChanged_By = cityMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                RowToUpdate.Computer_Name = cityMasterViewModel.Computer_Name;

                await context.SaveChangesAsync();

                cityMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_UPDATE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                cityMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return cityMasterViewModel;
        }

        public async Task<CityMasterViewModel> RemoveCity(CityMasterViewModel cityMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_City_Master.FirstOrDefaultAsync(c => c.CityId == cityMasterViewModel.CityId);
                RowToUpdate.Active = false;
                RowToUpdate.LastChanged_By = cityMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                cityMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_REMOVE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                cityMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return cityMasterViewModel;
        }

        public async Task<CityMasterViewModel> ReturnCity(CityMasterViewModel cityMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_City_Master.FirstOrDefaultAsync(c => c.CityId == cityMasterViewModel.CityId);
                RowToUpdate.Active = true;
                RowToUpdate.LastChanged_By = cityMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                cityMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_RETURN_MESSAGE_CODE}";
            } 
            catch (Exception ex)
            {
                cityMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();

            return cityMasterViewModel;
        }
    }
}
