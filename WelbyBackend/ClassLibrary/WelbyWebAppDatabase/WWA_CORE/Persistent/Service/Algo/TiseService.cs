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
using WWA_CORE.Persistent.ViewModel.Registration;

namespace WWA_CORE.Persistent.Service.Algo
{
    public class TiseService : ITiseRepository
    {
        public async Task<TiseViewModel> AddTise(TiseViewModel tiseViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var rowToInsert = new tbl_EMP_TISE
                {
                    EmployeeId = tiseViewModel.EmployeeId,
                    CompanyId = tiseViewModel.CompanyId,
                    Factor_1 = tiseViewModel.Factor_1,
                    Factor_2 = tiseViewModel.Factor_2,
                    Factor_3 = tiseViewModel.Factor_3,
                    Factor_4 = tiseViewModel.Factor_4,
                    Factor_5 = tiseViewModel.Factor_5,
                    Factor_6 = tiseViewModel.Factor_6,
                    Factor_7 = tiseViewModel.Factor_7,
                    Factor_8 = tiseViewModel.Factor_8,
                    Active = true,
                    Encoded_By = tiseViewModel.Encoded_By,
                    Encoded_Date = globalFunctions.GetServerDateTime(),
                    Computer_Name = tiseViewModel.Computer_Name,
                };

                context.tbl_EMP_TISE.Add(rowToInsert);
                await context.SaveChangesAsync();
                tiseViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_ADD_MESSAGE_CODE;
            } 
            catch (Exception ex)
            {
                tiseViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();

            return tiseViewModel;

        }

        public async Task<IEnumerable<TiseViewModel>> GetTise(TiseViewModel tiseViewModel)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_EMP_TISE_GET,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
                {
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_DATE_FROM , tiseViewModel.DateFrom),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_DATE_TO ,tiseViewModel.DateTo),

                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_CMP_TISE_GET_COMPANYID, tiseViewModel.CompanyId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_CMP_TISE_GET_EMPLOYEEID, tiseViewModel.EmployeeId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_ACTIVE, tiseViewModel.Active)
                }
            };
            
            await query.ExecuteAsync();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new TiseViewModel()
            {
                TiseId = Convert.ToInt32(row["TiseId"]),
                EmployeeId = Convert.ToInt32(row["EmployeeId"]),
                CompanyId = Convert.ToInt32(row["CompanyId"]),
                Factor_1 = Convert.ToSingle(row["Factor_1"]),
                Factor_2 = Convert.ToSingle(row["Factor_2"]),
                Factor_3 = Convert.ToSingle(row["Factor_3"]),
                Factor_4 = Convert.ToSingle(row["Factor_4"]),
                Factor_5 = Convert.ToInt32(row["Factor_5"]),
                Factor_6 = Convert.ToInt32(row["Factor_6"]),
                Factor_7 = Convert.ToInt32(row["Factor_7"]),
                Factor_8 = Convert.ToInt32(row["Factor_8"]),

                Active = Convert.ToBoolean(row["Active"]),
                Encoded_By = Convert.ToInt32(row["Encoded_By"]),
                Encoded_Date = Convert.ToDateTime(row["Encoded_Date"]),
                Computer_Name = Convert.ToString(row["Computer_Name"]),
                LastChanged_By = DBNull.Value != row["LastChanged_By"] ? Convert.ToInt32(row["LastChanged_By"]) : 0,
                LastChanged_Date = DBNull.Value != row["LastChanged_Date"] ? (DateTime?)row["LastChanged_Date"] : null,
            }).ToList();

            query.Dispose();
            tiseViewModel.Dispose();

            return ReturnedList;
        }

        public async Task<TiseViewModel> RemoveTise(TiseViewModel tiseViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_EMP_TISE.FirstOrDefaultAsync(c => c.TiseId == tiseViewModel.TiseId);
                RowToUpdate.Active = false;
                RowToUpdate.LastChanged_By = tiseViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                tiseViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_REMOVE_MESSAGE_CODE;
            }
            catch (Exception ex)
            {
                tiseViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();

            return tiseViewModel;
        }

        public async Task<TiseViewModel> ReturnTise(TiseViewModel tiseViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_EMP_TISE.FirstOrDefaultAsync(c => c.TiseId == tiseViewModel.TiseId);
                RowToUpdate.Active = true;
                RowToUpdate.LastChanged_By = tiseViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                tiseViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_RETURN_MESSAGE_CODE;
            }
            catch (Exception ex)
            {
                tiseViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();

            return tiseViewModel;
        }

        public Task<TiseViewModel> UpdateTise(TiseViewModel tiseViewModel)
        {
            throw new NotImplementedException();
        }
    }
}
