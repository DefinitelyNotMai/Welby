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
    class EmployeeTise
    {
        public IEnumerable<TiseReportViewModel> GetTiseResults(TiseReportViewModel tiseReportViewModel)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_EMP_TISE_GET,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
                {
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_DATE_FROM , tiseReportViewModel.DateFrom),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_DATE_TO , tiseReportViewModel.DateTo),

                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_CMP_TISE_GET_COMPANYID, tiseReportViewModel.CompanyId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_CMP_TISE_GET_EMPLOYEEID, tiseReportViewModel.EmployeeId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_ACTIVE, tiseReportViewModel.Active)
                }
            };
            query.Execute();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new TiseReportViewModel()
            {
                Encoded_Date = Convert.ToDateTime(row["Encoded_Date"]),
                EmployeeId = Convert.ToInt32(row["EmployeeId"]),
                EmployeeName = Convert.ToString(row["EmployeeName"]),
                CompanyId = Convert.ToInt32(row["CompanyId"]),
                CompanyName = Convert.ToString(row["CompanyName"]),
                Factor_1 = Convert.ToSingle(row["Factor_1"]),
                Factor_2 = Convert.ToSingle(row["Factor_2"]),
                Factor_3 = Convert.ToSingle(row["Factor_3"]),
                Factor_4 = Convert.ToSingle(row["Factor_4"]),
                Factor_5 = Convert.ToInt32(row["Factor_5"]),
                Factor_6 = Convert.ToInt32(row["Factor_6"]),
                Factor_7 = Convert.ToInt32(row["Factor_7"]),
                Factor_8 = Convert.ToInt32(row["Factor_8"]),
            }).ToList();
            query.Dispose();
           tiseReportViewModel.Dispose();
            return ReturnedList;
        }

        public byte[] ExportToExcel(TiseReportViewModel tiseReportViewModel)
        {
            EmployeeTise employeeTise = new EmployeeTise();
            var empTise = employeeTise.GetTiseResults(tiseReportViewModel);

            using (var package = new ExcelPackage())
            {
                ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("EmployeeData");

                // Set column headers
                worksheet.Cells[1, 1].Value = "Employee Id";
                worksheet.Cells[1, 2].Value = "Employee Name";
                worksheet.Cells[1, 3].Value = "Social Mutualism";
                worksheet.Cells[1, 4].Value = "Sense of Being Valued";
                worksheet.Cells[1, 5].Value = "Nurtured Psychological Needs";
                worksheet.Cells[1, 6].Value = "Positive Work Relationships";
                worksheet.Cells[1, 7].Value = "Subjective WellBeing";
                worksheet.Cells[1, 8].Value = "Organizational Commitment";
                worksheet.Cells[1, 9].Value = "Intent to Quit";
                worksheet.Cells[1, 10].Value = "Presenteeism";
                worksheet.Cells[1, 11].Value = "Date";


                // Fill data into Excel
                int row = 2; // Start from row 2 (below headers)
                foreach (var data in empTise)
                {
                    worksheet.Cells[row, 1].Value = data.EmployeeId;
                    worksheet.Cells[row, 2].Value = data.EmployeeName;
                    worksheet.Cells[row, 3].Value = data.Factor_1;
                    worksheet.Cells[row, 4].Value = data.Factor_2;
                    worksheet.Cells[row, 5].Value = data.Factor_3;
                    worksheet.Cells[row, 6].Value = data.Factor_4;
                    worksheet.Cells[row, 7].Value = data.Factor_5;
                    worksheet.Cells[row, 8].Value = data.Factor_6;
                    worksheet.Cells[row, 9].Value = data.Factor_7;
                    worksheet.Cells[row, 10].Value = data.Factor_8;
                    worksheet.Cells[row, 11].Value = data.Encoded_Date.ToString("MMMM dd, yyyy");

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
    public class TiseReport : ITiseReport
    {
        public async Task<byte[]> CreateReport(TiseReportViewModel tiseReportViewModel)
        {
            EmployeeTise report = new EmployeeTise();
            return await Task.Run(() => report.ExportToExcel(tiseReportViewModel));
        }
    }
}
