using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Constants;
using WWA_CORE.Core.Repositories.Registration;
using WWA_CORE.Persistent.Context;
using WWA_CORE.Persistent.ViewModel.Masters;
using WWA_CORE.Persistent.ViewModel.Registration;
using WWA_CORE.Utilities;

namespace WWA_CORE.Persistent.Service.Registration
{
    public class EmployeeRegistrationService : IEmployeeRegistrationRepository
    {
        public async Task<EmployeeRegistrationViewModel> AddEmployee(EmployeeRegistrationViewModel employeeRegistrationViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var rowtoInsert = new tbl_REG_Employee_Registration
                {
                    EmployeeId = employeeRegistrationViewModel.EmployeeId,
                    CompanyId = employeeRegistrationViewModel.CompanyId,
                    First_Name = employeeRegistrationViewModel.First_Name, 
                    Middle_Name = employeeRegistrationViewModel.Middle_Name,
                    Last_Name = employeeRegistrationViewModel.Last_Name,
                    GenderId = employeeRegistrationViewModel.GenderId,
                    Email = employeeRegistrationViewModel.Email,
                    Phone_Number = employeeRegistrationViewModel.Phone_Number,
                    CountryId = employeeRegistrationViewModel.CountryId,
                    Address = employeeRegistrationViewModel.Address,
                    Birthday = employeeRegistrationViewModel.Birthday,
                    Linkedin = employeeRegistrationViewModel.Linkedin,
                    Facebook = employeeRegistrationViewModel.Facebook,
                    Instagram = employeeRegistrationViewModel.Instagram,
                    TikTok = employeeRegistrationViewModel.TikTok,
                    Work = employeeRegistrationViewModel.Work,
                    Connect = employeeRegistrationViewModel.Contact,
                    Support = employeeRegistrationViewModel.Support,
                    ProfilePhoto = employeeRegistrationViewModel.ProfilePhoto,
                    Other_Notes = employeeRegistrationViewModel.Other_Notes,

                    Active = true,
                    Encoded_By = employeeRegistrationViewModel.Encoded_By,
                    Encoded_Date = globalFunctions.GetServerDateTime(),
                    Computer_Name = employeeRegistrationViewModel.Computer_Name
                };

                context.tbl_REG_Employee_Registration.Add(rowtoInsert);
                await context.SaveChangesAsync();
                employeeRegistrationViewModel.Message_Code = WWA_COREDefaults.DEFAULT_SUCCESS_ADD_MESSAGE_CODE;

            }
            catch (Exception ex)
            {
                employeeRegistrationViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }
            context.Dispose();
            globalFunctions.Dispose();
            return employeeRegistrationViewModel;
        }

        public Task<string> GenerateNewEmployeeCode(int CurrentCompanyId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<EmployeeRegistrationViewModel>> GetAllEmployees(EmployeeRegistrationViewModel employeeRegistrationViewModel)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_REG_EMPLOYEE_REGISTRATION_PAGEWISE_GET,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
               {
                  new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_DATE_FROM , employeeRegistrationViewModel.DateFrom),
                  new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_DATE_TO , employeeRegistrationViewModel.DateTo),
                  new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_PAGE_NO , employeeRegistrationViewModel.PageNo),
                  new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_PAGE_SIZE , employeeRegistrationViewModel.PageSize),
                  new SqlParameter(PROCEDURE_PARAMETERS.PARA_REG_EMPLOYEE_REGISTRATION_PAGEWISE_GET_EMPLOYEEID , employeeRegistrationViewModel.EmployeeId),
                  new SqlParameter(PROCEDURE_PARAMETERS.PARA_REG_EMPLOYEE_REGISTRATION_PAGEWISE_GET_PHONE_NUMBER , employeeRegistrationViewModel.Phone_Number),
                  new SqlParameter(PROCEDURE_PARAMETERS.PARA_REG_EMPLOYEE_REGISTRATION_PAGEWISE_GET_EMAIL_ADDRESS , employeeRegistrationViewModel.Email),
               }
            };

            await query.ExecuteAsync();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new EmployeeRegistrationViewModel()
            {
                EmployeeId = Convert.ToInt32(row["EmployeeId"]),
                First_Name = Convert.ToString(row["First_Name"]),
                Middle_Name = Convert.ToString(row["Middle_Name"]),
                Last_Name = Convert.ToString(row["Last_Name"]),
                Phone_Number = Convert.ToString(row["Mobile_Number"]),
                Email = Convert.ToString(row["Email_Address"]),
                Birthday = Convert.ToDateTime(row["Birthday"]),
                Linkedin = Convert.ToString(row["Linkedin"]),
                Instagram = Convert.ToString(row["Instagram"]),
                Facebook = Convert.ToString(row["Facebook"]),
                ProfilePhoto = Convert.ToString(row["ProfilePhoto"]),
                Address = Convert.ToString(row["Address"]),

                GenderId = Convert.ToInt32(row["GenderId"]),
                CompanyId = Convert.ToInt32(row["CompanyId"]),
                CountryId = Convert.ToInt32(row["CountryId"]),
                

                Work = Convert.ToString(row["Work"]),
                Contact= Convert.ToString(row["Contact"]),
                Support = Convert.ToString(row["Support"]),
                Other_Notes = Convert.ToString(row["Other_Notes"]),


                EmployeeFullName = Convert.ToString(row["ClientFullName"]),
                GenderDisplayName = Convert.ToString(row["GenderDisplayName"]),
                CountryDisplay = Convert.ToString(row["CountryDisplay"]),
                EmployeeCompanyDisplay = Convert.ToString(row["EmployeeCompanyDisplay"]),

                Encoded_By = Convert.ToInt32(row["Encoded_By"]),
                Encoded_Date = Convert.ToDateTime(row["Encoded_Date"]),
                Computer_Name = Convert.ToString(row["Computer_Name"]),
                LastChanged_By = DBNull.Value != row["LastChanged_By"] ? Convert.ToInt32(row["LastChanged_By"]) : 0,
                LastChanged_Date = DBNull.Value != row["LastChanged_Date"] ? (DateTime?)row["LastChanged_Date"] : null,
                Active = Convert.ToBoolean(row["Active"]),
                EncodedByName = "",
                LastChangedByName = "",

                TotalRows = Convert.ToInt32(row["TotalRows"]),
                TotalPage = Convert.ToInt32(row["TotalPage"]),

            }).ToList();

            query.Dispose();
            employeeRegistrationViewModel.Dispose();
            return ReturnedList;
        }

        public async Task<IEnumerable<EmployeeRegistrationViewModel>> GetEmployee(EmployeeRegistrationViewModel employeeRegistrationViewModel)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_REG_EMPLOYEE_REGISTRATION_GET,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
               {
                  new SqlParameter(PROCEDURE_PARAMETERS.PARA_REG_EMPLOYEE_REGISTRATION_GET_EMPLOYEEID, employeeRegistrationViewModel.EmployeeId),
                   new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_ACTIVE, employeeRegistrationViewModel.Active)
               }
            };

            await query.ExecuteAsync();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new EmployeeRegistrationViewModel()
            {
                EmployeeId = Convert.ToInt32(row["EmployeeId"]),
                First_Name = Convert.ToString(row["First_Name"]),
                Middle_Name = Convert.ToString(row["Middle_Name"]),
                Last_Name = Convert.ToString(row["Last_Name"]),
                Phone_Number = Convert.ToString(row["Mobile_Number"]),
                Email = Convert.ToString(row["Email_Address"]),
                Birthday = Convert.ToDateTime(row["Birthday"]),
                Linkedin = Convert.ToString(row["Linkedin"]),
                Instagram = Convert.ToString(row["Instagram"]),
                Facebook = Convert.ToString(row["Facebook"]),
                ProfilePhoto = Convert.ToString(row["ProfilePhoto"]),
                Address = Convert.ToString(row["Address"]),

                GenderId = Convert.ToInt32(row["GenderId"]),
                CompanyId = Convert.ToInt32(row["CompanyId"]),
                CountryId = Convert.ToInt32(row["CountryId"]),


                Work = Convert.ToString(row["Work"]),
                Contact = Convert.ToString(row["Contact"]),
                Support = Convert.ToString(row["Support"]),
                Other_Notes = Convert.ToString(row["Other_Notes"]),


                EmployeeFullName = Convert.ToString(row["ClientFullName"]),
                GenderDisplayName = Convert.ToString(row["GenderDisplayName"]),
                CountryDisplay = Convert.ToString(row["CountryDisplay"]),
                EmployeeCompanyDisplay = Convert.ToString(row["EmployeeCompanyDisplay"]),

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
            employeeRegistrationViewModel.Dispose();
            return ReturnedList;
        }

        public async Task<EmployeeRegistrationViewModel> RemoveEmployee(EmployeeRegistrationViewModel employeeRegistrationModelView)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_REG_Employee_Registration.FirstOrDefaultAsync(c => c.EmployeeId == employeeRegistrationModelView.EmployeeId);
                RowToUpdate.Active = false;
                RowToUpdate.LastChanged_By = employeeRegistrationModelView.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                employeeRegistrationModelView.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_REMOVE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                employeeRegistrationModelView.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return employeeRegistrationModelView;
        }

        public async Task<EmployeeRegistrationViewModel> ReturnEmployee(EmployeeRegistrationViewModel employeeRegistrationModelView)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();

            try
            {
                var RowToUpdate = await context.tbl_REG_Employee_Registration.FirstOrDefaultAsync(c => c.EmployeeId == employeeRegistrationModelView.EmployeeId);
                RowToUpdate.Active = true;
                RowToUpdate.LastChanged_By = employeeRegistrationModelView.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();
                await context.SaveChangesAsync();
                employeeRegistrationModelView.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_RETURN_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                employeeRegistrationModelView.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";

            }

            context.Dispose();
            globalFunctions.Dispose();

            return employeeRegistrationModelView;
        }

        public async Task<EmployeeRegistrationViewModel> UpdateEmployee(EmployeeRegistrationViewModel employeeRegistrationViewModel)
        {
            var context = new WWAEntities();
            var globalFunctions = new GlobalFunctions();
            try
            {
                var RowToUpdate = await context.tbl_REG_Employee_Registration.FirstOrDefaultAsync(c => c.EmployeeId == employeeRegistrationViewModel.EmployeeId);

                RowToUpdate.EmployeeId = employeeRegistrationViewModel.EmployeeId;
                RowToUpdate.CompanyId = employeeRegistrationViewModel.CompanyId;
                RowToUpdate.First_Name = employeeRegistrationViewModel.First_Name;
                RowToUpdate.Middle_Name = employeeRegistrationViewModel.Middle_Name;
                RowToUpdate.Last_Name = employeeRegistrationViewModel.Last_Name;
                RowToUpdate.GenderId = employeeRegistrationViewModel.GenderId;
                RowToUpdate.Email = employeeRegistrationViewModel.Email;
                RowToUpdate.Phone_Number = employeeRegistrationViewModel.Phone_Number;
                RowToUpdate.Birthday = employeeRegistrationViewModel.Birthday;
                RowToUpdate.Address = employeeRegistrationViewModel.Address;
                RowToUpdate.CountryId = employeeRegistrationViewModel.CountryId;
                RowToUpdate.Linkedin = employeeRegistrationViewModel.Linkedin;
                RowToUpdate.Facebook = employeeRegistrationViewModel.Facebook;
                RowToUpdate.Instagram = employeeRegistrationViewModel.Instagram;
                RowToUpdate.TikTok = employeeRegistrationViewModel.TikTok;
                RowToUpdate.Work = employeeRegistrationViewModel.Work;
                RowToUpdate.Connect = employeeRegistrationViewModel.Contact;
                RowToUpdate.Support = employeeRegistrationViewModel.Support;
                RowToUpdate.ProfilePhoto = employeeRegistrationViewModel.ProfilePhoto;
                RowToUpdate.Other_Notes = employeeRegistrationViewModel.Other_Notes;

                RowToUpdate.Active = employeeRegistrationViewModel.Active;
                RowToUpdate.Computer_Name = employeeRegistrationViewModel.Computer_Name;
                RowToUpdate.LastChanged_By = employeeRegistrationViewModel.Encoded_By;
                RowToUpdate.LastChanged_Date = globalFunctions.GetServerDateTime();

                await context.SaveChangesAsync();
                employeeRegistrationViewModel.Message_Code = $"{WWA_COREDefaults.DEFAULT_SUCCESS_UPDATE_MESSAGE_CODE}";
            }
            catch (Exception ex)
            {
                employeeRegistrationViewModel.Message_Code = $"{ex.Message} \n {ex.InnerException.ToString() ?? ""}";
            }

            context.Dispose();
            globalFunctions.Dispose();

            return employeeRegistrationViewModel;
        }
    }
}
