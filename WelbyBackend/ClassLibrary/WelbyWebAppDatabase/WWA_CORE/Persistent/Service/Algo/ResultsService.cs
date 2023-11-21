using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using WWA_CORE.Constants;
using WWA_CORE.Core.Repositories.Algo;
using WWA_CORE.Persistent.Context;
using WWA_CORE.Persistent.ViewModel.Algo;
using WWA_CORE.Utilities;
using System.Data;
using System.Data.Entity;

namespace WWA_CORE.Persistent.Service.Algo
{
    public class ResultsService : IResultsRepository
    {
        public async Task<ResultsViewModel> AddResult(ResultsViewModel resultsViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var rowToInsert = new tbl_Results
                {
                    ResultDescription = resultsViewModel.ResultDescription,
                    Active = true,
                    Encoded_By = resultsViewModel.Encoded_By,
                    Encoded_Date = globalFunctions.GetServerDateTime(),
                    Computer_Name = resultsViewModel.Computer_Name,
                };

                context.tbl_Results.Add(rowToInsert);
                await context.SaveChangesAsync();
                resultsViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_ADD_MESSAGE_CODE;
            } 
            catch (Exception ex)
            {
                resultsViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();
            return resultsViewModel;
        }

        public async Task<IEnumerable<ResultsViewModel>> GetResult(ResultsViewModel resultsViewModel)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_GET_RESULT,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
                {
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_GET_RESULTID, resultsViewModel.ResultsId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_ACTIVE, resultsViewModel.Active)
                }
            };

            await query.ExecuteAsync();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new ResultsViewModel()
            {
                ResultsId = Convert.ToInt32(row["ResultId"]),
                ResultDescription = Convert.ToString(row["ResultDescription"]),

                Active = Convert.ToBoolean(row["Active"]),
                Encoded_By = Convert.ToInt32(row["Encoded_By"]),
                Encoded_Date = Convert.ToDateTime(row["Encoded_Date"]),
                Computer_Name = Convert.ToString(row["Computer_Name"]),
                LastChanged_By = DBNull.Value != row["LastChanged_By"] ? Convert.ToInt32(row["LastChanged_By"]) : 0,
                LastChanged_Date = DBNull.Value != row["LastChanged_Date"] ? (DateTime?)row["LastChanged_Date"] : null,
            }).ToList();

            query.Dispose();
            resultsViewModel.Dispose();
            return ReturnedList;
        }

        public async Task<ResultsViewModel> RemoveResult(ResultsViewModel resultsViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_Results.FirstOrDefaultAsync(c => c.ResultsId == resultsViewModel.ResultsId);
                RowToUpdate.Active = false;
                RowToUpdate.LastChanged_By = resultsViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                resultsViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_REMOVE_MESSAGE_CODE;
            }
            catch (Exception ex)
            {
               resultsViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();

            return resultsViewModel;
        }

        public async Task<ResultsViewModel> ReturnResult(ResultsViewModel resultsViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_Results.FirstOrDefaultAsync(c => c.ResultsId == resultsViewModel.ResultsId);
                RowToUpdate.Active = true;
                RowToUpdate.LastChanged_By = resultsViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                resultsViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_RETURN_MESSAGE_CODE;
            }
            catch (Exception ex)
            {
                resultsViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();

            return resultsViewModel;
        }

        public Task<ResultsViewModel> UpdateResult(ResultsViewModel resultsViewModel)
        {
            throw new NotImplementedException();
        }
    }
}
