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
    public class GoalMasterService : IGoalMasterRepository
    {
        public async Task<GoalMasterViewModel> AddGoal(GoalMasterViewModel goalMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var rowtoInsert = new tbl_MST_Goal_Master
                {
                    Title = goalMasterViewModel.Title,
                    Description = goalMasterViewModel.Description,
                    DurationFrom = goalMasterViewModel.DurationFrom,
                    DurationTo = goalMasterViewModel.DurationTo,
                    
                    Active = true,
                    Encoded_By = goalMasterViewModel.Encoded_By,
                    Encoded_Date = globalFunctions.GetServerDateTime(),
                    Computer_Name = goalMasterViewModel.Computer_Name
                };

                context.tbl_MST_Goal_Master.Add(rowtoInsert);
                await context.SaveChangesAsync();
                goalMasterViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_ADD_MESSAGE_CODE;

            }
            catch (Exception ex)
            {
                goalMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }
            context.Dispose();
            globalFunctions.Dispose();
            return goalMasterViewModel;
        }

        public async Task<IEnumerable<GoalMasterViewModel>> GetGoalList(GoalMasterViewModel goalMasterViewModel)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_MST_GOAL_MASTER_GET,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
                {
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_MST_GOAL_MASTER_GET_GOALID, goalMasterViewModel.GoalId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_ACTIVE, goalMasterViewModel.Active),
                }
            };

            await query.ExecuteAsync();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new GoalMasterViewModel()
            {
                GoalId = Convert.ToInt32(row["GoalId"]),
                Title = Convert.ToString(row["Title"]),
                Description = Convert.ToString(row["Description"]),
                DurationFrom = Convert.ToDateTime(row["DurationFrom"]), 
                DurationTo = Convert.ToDateTime(row["DurationTo"]),

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
            goalMasterViewModel.Dispose();
            return ReturnedList;
        }

        public async Task<GoalMasterViewModel> RemoveGoal(GoalMasterViewModel goalMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_Goal_Master.FirstOrDefaultAsync(c => c.GoalId == goalMasterViewModel.GoalId);
                RowToUpdate.Active = false;
                RowToUpdate.LastChanged_By = goalMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                goalMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_REMOVE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                goalMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return goalMasterViewModel;
        }

        public async Task<GoalMasterViewModel> ReturnGoal(GoalMasterViewModel goalMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_Goal_Master.FirstOrDefaultAsync(c => c.GoalId == goalMasterViewModel.GoalId);
                RowToUpdate.Active = true;
                RowToUpdate.LastChanged_By = goalMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                goalMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_RETURN_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                goalMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return goalMasterViewModel;
        }

        public async Task<GoalMasterViewModel> UpdateGoal(GoalMasterViewModel goalMasterViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_MST_Goal_Master.FirstOrDefaultAsync(c => c.GoalId == goalMasterViewModel.GoalId);

                RowToUpdate.Title = goalMasterViewModel.Title;
                RowToUpdate.Description = goalMasterViewModel.Description;
                RowToUpdate.DurationFrom = goalMasterViewModel.DurationFrom;
                RowToUpdate.DurationTo = goalMasterViewModel.DurationTo;

                RowToUpdate.Active = goalMasterViewModel.Active;
                RowToUpdate.LastChanged_By = goalMasterViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                RowToUpdate.Computer_Name = goalMasterViewModel.Computer_Name;

                await context.SaveChangesAsync();

                goalMasterViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_UPDATE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                goalMasterViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return goalMasterViewModel;
        }
    }
}
