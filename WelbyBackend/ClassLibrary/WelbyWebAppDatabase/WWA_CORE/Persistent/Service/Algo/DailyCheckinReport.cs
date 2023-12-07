using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Constants;
using WWA_CORE.Core.Repositories.Algo;
using WWA_CORE.Persistent.ViewModel.Algo;
using WWA_CORE.Utilities;

namespace WWA_CORE.Persistent.Service.Algo
{
    class EmployeeDailyCheckin
    {
        public IEnumerable<DailyCheckinReportViewModel> GetDailyCheckins(DailyCheckinReportViewModel dailyCheckinReportViewModel)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_EMP_DAILYCHECKIN_GET,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
                {
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_GET_TRAININGSET_EMPLOYEEID, dailyCheckinReportViewModel.EmployeeId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_CMP_DAILYCHECKIN_GET_COMPANYID, dailyCheckinReportViewModel.CompanyId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_ACTIVE, dailyCheckinReportViewModel.Active)
                }
            };
            query.Execute();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new DailyCheckinReportViewModel()
            {
                Encoded_Date = Convert.ToDateTime(row["Encoded_Date"]),
                EmployeeId = Convert.ToInt32(row["EmployeeId"]),
                EmployeeName = Convert.ToString(row["EmployeeName"]),
                CompanyId = Convert.ToInt32(row["CompanyId"]),
                EnergyAtWork = Convert.ToInt32(row["EnergyAtWork_int"]),
                FocusAtWork = Convert.ToInt32(row["FocusAtWork_int"]),
                PositiveEmotions = Convert.ToInt32(row["PositiveEmotions_int"]),
                NegativeEmotions = Convert.ToInt32(row["NegativeEmotions_int"]),
                Productivity = Convert.ToInt32(row["Productivity"])
            }).ToList();
            query.Dispose();
            dailyCheckinReportViewModel.Dispose();
            return ReturnedList;
        }

        public byte[] ExportToExcel(DailyCheckinReportViewModel dailyCheckinReportViewModel)
        {
            EmployeeDailyCheckin employeeDailyCheckin = new EmployeeDailyCheckin();
            var empDailyCheckins = employeeDailyCheckin.GetDailyCheckins(dailyCheckinReportViewModel).ToList();

            using(var package = new ExcelPackage())
            {
                ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("EmployeeData");

                // Set column headers
                worksheet.Cells[1, 1].Value = "EmployeeId";
                worksheet.Cells[1, 2].Value = "EmployeeName";
                worksheet.Cells[1, 3].Value = "EnergyAtWork";
                worksheet.Cells[1, 4].Value = "FocusAtWork";
                worksheet.Cells[1, 5].Value = "NegativeEmotions";
                worksheet.Cells[1, 6].Value = "PositiveEmotions";
                worksheet.Cells[1, 7].Value = "Productivity";
                worksheet.Cells[1, 8].Value = "Date";

                // Fill data into Excel
                int row = 2; // Start from row 2 (below headers)
                foreach (var data in empDailyCheckins)
                {
                    worksheet.Cells[row, 1].Value = data.EmployeeId;
                    worksheet.Cells[row, 2].Value = data.EmployeeName;
                    worksheet.Cells[row, 3].Value = data.EnergyAtWork;
                    worksheet.Cells[row, 4].Value = data.FocusAtWork;
                    worksheet.Cells[row, 5].Value = data.NegativeEmotions;
                    worksheet.Cells[row, 6].Value = data.PositiveEmotions;
                    worksheet.Cells[row, 7].Value = data.Productivity;
                    worksheet.Cells[row, 8].Value = data.Encoded_Date.ToString("MMMM dd, yyyy");

                    row++;
                }

                // Save the Excel file to a memory stream
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    package.SaveAs(memoryStream);
                    return memoryStream.ToArray(); // Return the byte array of the Excel file content
                }
            }

        }
    }
    public class DailyCheckinReport : IDailyCheckinReport
    {
        public async Task<byte[]> CreateReport(DailyCheckinReportViewModel dailyCheckinReportViewModel)
        {
            EmployeeDailyCheckin report = new EmployeeDailyCheckin();

            return await Task.Run(() => report.ExportToExcel(dailyCheckinReportViewModel));
        }
    }
}
