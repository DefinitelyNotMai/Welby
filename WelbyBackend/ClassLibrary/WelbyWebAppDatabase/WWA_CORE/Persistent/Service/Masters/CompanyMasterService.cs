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
    public class CompanyMasterService : ICompanyMasterRepository
    {
        public async Task<CompanyMasterViewModel> AddCompany(CompanyMasterViewModel companyMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var rowToInsert = new tbl_MST_Company
                {
                    Name = companyMasterViewModel.Name,
                    Email = companyMasterViewModel.Email,
                    Phone_Number = companyMasterViewModel.Phone_Number,
                    Website = companyMasterViewModel.Website,
                    Address = companyMasterViewModel.Address,

                    CompanySize = companyMasterViewModel.CompanySize,

                    CountryId = companyMasterViewModel.CountryId,
                    IndustryTypeId = companyMasterViewModel.IndustryTypeId,

                    FoundingDate = companyMasterViewModel.FoundingDate,
                    Mission = companyMasterViewModel.Mission,
                    Vision = companyMasterViewModel.Vision,
                    Logo = companyMasterViewModel.Logo,

                    TakeAssessment = false,
                    Active = true,
                    Encoded_By = companyMasterViewModel.Encoded_By,
                    Encoded_Date = globalFunctions.GetServerDateTime(),
                    LastChanged_Date = globalFunctions.GetServerDateTime(),
                    Computer_Name = companyMasterViewModel.Computer_Name
                };

                context.tbl_MST_Company.Add(rowToInsert);
                await context.SaveChangesAsync();
                companyMasterViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_ADD_MESSAGE_CODE;

            }
            catch (Exception ex)
            {
                companyMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }
            context.Dispose();
            globalFunctions.Dispose();
            return companyMasterViewModel;
        }

        public async Task<IEnumerable<CompanyMasterViewModel>> GetCompany(CompanyMasterViewModel companyMasterViewModel)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_MST_COMPANY_MASTER_GET,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
               {
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_MST_COMPANY_MASTER_LOGIN_GET_COMPANYID, companyMasterViewModel.CompanyId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_MST_COMPANY_MASTER_LOGIN_GET_COMPANYEMAIL, companyMasterViewModel.Email),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_MST_COMPANY_MASTER_LOGIN_GET_PHONE_NUMBER, companyMasterViewModel.Phone_Number),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_ACTIVE, companyMasterViewModel.Active),
               }
            };

            await query.ExecuteAsync();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new CompanyMasterViewModel()
            {
                CompanyId = Convert.ToInt32(row["CompanyId"]),
                Name = Convert.ToString(row["Name"]),
                Email = Convert.ToString(row["Email"]),
                Phone_Number = Convert.ToString(row["Phone_Number"]),
                Website = Convert.ToString(row["Website"]),
                Address = Convert.ToString(row["Address"]),

                CountryId = Convert.ToInt32(row["CountryId"]),
                IndustryTypeId = Convert.ToInt32(row["IndustryTypeId"]),

                FoundingDate = DBNull.Value != row["FoundingDate"] ? (DateTime?)row["FoundingDate"] : null,
                Mission = Convert.ToString(row["Mission"]),
                Vision = Convert.ToString(row["Vision"]),
                Logo = Convert.ToString(row["Logo"]),
                CompanySize = Convert.ToString(row["CompanySize"]),

                CompanyLocation = Convert.ToString(row["CompanyLocation"]),
                IndustryTypeDisplay = Convert.ToString(row["IndustryTypeDisplay"]),
                TakeAssessment = Convert.ToBoolean(row["TakeAssessment"]),

                Active = Convert.ToBoolean(row["Active"]),
                Encoded_By = Convert.ToInt32(row["Encoded_By"]),
                Encoded_Date = Convert.ToDateTime(row["Encoded_Date"]),
                Computer_Name = Convert.ToString(row["Computer_Name"]),
                LastChanged_By = row["LastChanged_By"] != DBNull.Value ? Convert.ToInt32(row["LastChanged_By"]) : 0,
                LastChanged_Date = row["LastChanged_Date"] != DBNull.Value ? (DateTime?)row["LastChanged_Date"] : null,
                EncodedByName = "",
                LastChangedByName = "",

            }).ToList();
            query.Dispose();
            companyMasterViewModel.Dispose();
            return ReturnedList;
        }

        public async Task<CompanyMasterViewModel> RemoveCompany(CompanyMasterViewModel companyMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_Company.FirstOrDefaultAsync(c => c.CompanyId == companyMasterViewModel.CompanyId);
                RowToUpdate.Active = false;
                RowToUpdate.LastChanged_By = companyMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                companyMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_REMOVE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                companyMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return companyMasterViewModel;
        }

        public async Task<CompanyMasterViewModel> ReturnCompany(CompanyMasterViewModel companyMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_Company.FirstOrDefaultAsync(c => c.CompanyId == companyMasterViewModel.CompanyId);
                RowToUpdate.Active = true;
                RowToUpdate.LastChanged_By = companyMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                companyMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_RETURN_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                companyMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return companyMasterViewModel;
        }

        public async Task<CompanyMasterViewModel> UpdateCompany(CompanyMasterViewModel companyMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_Company.FirstOrDefaultAsync(c => c.CompanyId == companyMasterViewModel.CompanyId);

                RowToUpdate.Name = companyMasterViewModel.Name;
                RowToUpdate.Email = companyMasterViewModel.Email;
                RowToUpdate.Phone_Number = companyMasterViewModel.Phone_Number;
                RowToUpdate.Website = companyMasterViewModel.Website;
                RowToUpdate.CountryId = companyMasterViewModel.CountryId;
                RowToUpdate.Address = companyMasterViewModel.Address;
                RowToUpdate.IndustryTypeId = companyMasterViewModel.IndustryTypeId;
                RowToUpdate.FoundingDate = companyMasterViewModel.FoundingDate;
                RowToUpdate.Logo = companyMasterViewModel.Logo;
                RowToUpdate.Active = companyMasterViewModel.Active;
                RowToUpdate.LastChanged_By = companyMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                RowToUpdate.Computer_Name = companyMasterViewModel.Computer_Name;

                await context.SaveChangesAsync();

                companyMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_UPDATE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                companyMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return companyMasterViewModel;
        }

        public async Task<CompanyMasterViewModel> TakeAssessment(CompanyMasterViewModel companyMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_Company.FirstOrDefaultAsync(c => c.CompanyId == companyMasterViewModel.CompanyId);
                RowToUpdate.TakeAssessment = companyMasterViewModel.TakeAssessment;
                RowToUpdate.LastChanged_By = companyMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                companyMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_UPDATE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                companyMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return companyMasterViewModel;
        }

        public async Task<CompanyMasterViewModel> UpdateCompanyVision(CompanyMasterViewModel companyMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_Company.FirstOrDefaultAsync(c => c.CompanyId == companyMasterViewModel.CompanyId);

               
                RowToUpdate.Vision = companyMasterViewModel.Vision;
                RowToUpdate.LastChanged_By = companyMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                RowToUpdate.Computer_Name = companyMasterViewModel.Computer_Name;

                await context.SaveChangesAsync();

                companyMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_UPDATE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                companyMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return companyMasterViewModel;
        }

        public async Task<CompanyMasterViewModel> UpdateCompanyMission(CompanyMasterViewModel companyMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_Company.FirstOrDefaultAsync(c => c.CompanyId == companyMasterViewModel.CompanyId);


                RowToUpdate.Mission = companyMasterViewModel.Mission;
                RowToUpdate.LastChanged_By = companyMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                RowToUpdate.Computer_Name = companyMasterViewModel.Computer_Name;

                await context.SaveChangesAsync();

                companyMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_UPDATE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                companyMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return companyMasterViewModel;
        }
    }
}
