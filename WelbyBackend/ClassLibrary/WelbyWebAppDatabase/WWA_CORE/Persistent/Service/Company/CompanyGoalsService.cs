using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Constants;
using WWA_CORE.Core.Repositories.Company;
using WWA_CORE.Persistent.Context;
using WWA_CORE.Persistent.ViewModel.Company;
using WWA_CORE.Utilities;
using System.Data.Entity;

namespace WWA_CORE.Persistent.Service.Company
{
    public class CompanyGoalsService : ICompanyGoalsRepository
    {
        public async Task<CompanyGoalsViewModel> AddCompanyGoal(CompanyGoalsViewModel companyGoalsViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var rowToInsert = new tbl_CMP_Goals
                {
                    CompanyGoalsId = companyGoalsViewModel.CompanyGoalsId,
                    GoalId = companyGoalsViewModel.GoalId,
                    CompanyId = companyGoalsViewModel.CompanyId,

                    Active = true,
                    Encoded_By = companyGoalsViewModel.Encoded_By,
                    Encoded_Date = globalFunctions.GetServerDateTime(),
                    Computer_Name = companyGoalsViewModel.Computer_Name
                };

                context.tbl_CMP_Goals.Add(rowToInsert);
                await context.SaveChangesAsync();
                companyGoalsViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_ADD_MESSAGE_CODE;

            }
            catch (Exception ex)
            {
                companyGoalsViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();
            return companyGoalsViewModel;
        }

        public async Task<IEnumerable<CompanyGoalsViewModel>> GetCompanyGoals(CompanyGoalsViewModel companyGoalsViewModel)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_CMP_GOALS_GET,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
                {
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_CMP_GOALS_GET_COMPANYGOALSID , companyGoalsViewModel.CompanyGoalsId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_CMP_GOALS_GET_COMPANYID , companyGoalsViewModel.CompanyId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_CMP_GOALS_GET_GOALID , companyGoalsViewModel.GoalId),

              }
            };

            await query.ExecuteAsync();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new CompanyGoalsViewModel()
            {
                CompanyGoalsId = Convert.ToInt32(row["CompanyGoalsId"]),
                CompanyId = Convert.ToInt32(row["CompanyId"]),
                GoalId = Convert.ToInt32(row["GoalId"]),

                Active = Convert.ToBoolean(row["Active"]),
                Encoded_By = Convert.ToInt32(row["Encoded_By"]),
                Encoded_Date = Convert.ToDateTime(row["Encoded_Date"]),
                Computer_Name = Convert.ToString(row["Computer_Name"]),
                LastChanged_By = DBNull.Value != row["LastChanged_By"] ? Convert.ToInt32(row["LastChanged_By"]) : 0,
                LastChanged_Date = DBNull.Value != row["LastChanged_Date"] ? (DateTime?)row["LastChanged_Date"] : null,
                EncodedByName = "",
                LastChangedByName = "",
            });

            query.Dispose();
            companyGoalsViewModel.Dispose();
            return ReturnedList;
        }

        public async Task<CompanyGoalsViewModel> RemoveCompanyGoal(CompanyGoalsViewModel companyGoalsViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_CMP_Goals.FirstOrDefaultAsync(c => c.CompanyGoalsId == companyGoalsViewModel.CompanyGoalsId);
                RowToUpdate.Active = false;
                RowToUpdate.LastChanged_By = companyGoalsViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                companyGoalsViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_REMOVE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                companyGoalsViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return companyGoalsViewModel;
        }

        public async Task<CompanyGoalsViewModel> ReturnCompanyGoal(CompanyGoalsViewModel companyGoalsViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_CMP_Goals.FirstOrDefaultAsync(c => c.CompanyGoalsId == companyGoalsViewModel.CompanyGoalsId);
                RowToUpdate.Active = true;
                RowToUpdate.LastChanged_By = companyGoalsViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                companyGoalsViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_RETURN_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                companyGoalsViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return companyGoalsViewModel;
        }

        public async Task<CompanyGoalsViewModel> UpdateCompanyGoal(CompanyGoalsViewModel companyGoalsViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();
            try
            {
                var RowToUpdate = await context.tbl_CMP_Goals.FirstOrDefaultAsync(c => c.CompanyGoalsId == companyGoalsViewModel.CompanyGoalsId);

                RowToUpdate.CompanyId = companyGoalsViewModel.CompanyId;
                RowToUpdate.GoalId = companyGoalsViewModel.GoalId;

                RowToUpdate.Active = companyGoalsViewModel.Active;
                RowToUpdate.Computer_Name = companyGoalsViewModel.Computer_Name;
                RowToUpdate.LastChanged_By = companyGoalsViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();

                await context.SaveChangesAsync();
                companyGoalsViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_UPDATE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                companyGoalsViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();

            return companyGoalsViewModel;
        }
    }
}
