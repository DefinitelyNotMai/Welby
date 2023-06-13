using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using WWA_CORE.Core.Repositories;
using WWA_CORE.Persistent.ViewModel.Masters;
using WWA_CORE;
using System.Net;
using System.Net.Http;
using System.Web.Script.Serialization;
using System.Text;
using WWA_CORE.Persistent.ViewModel.Registration;
using System.Web.UI;

namespace WelbyAPI.Controllers
{
    public class WelbyController : ApiController
    {
        // GET: Welby
        private readonly IWWAUnitOfWork _wwauow;
        public WelbyController()
        {
            this._wwauow = this._wwauow ?? new WWAUnitOfWork();
        }

        #region EMPLOYEES
        [Route("~/api/GetEmployees")]
        [HttpGet]
        public async Task<IEnumerable<EmployeeRegistrationViewModel>> GetEmployeesList([FromBody] EmployeeRegistrationViewModel param)
        {
            var model = await _wwauow.Employee.GetAllEmployees(param);
            return model;
        }
        [Route("~/api/AddEmployee")]
        [HttpPost]
        public async Task<HttpResponseMessage> AddEmployee([FromBody] EmployeeRegistrationViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Employee.AddEmployee(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("SAVE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/UpdateEmployee")]
        [HttpPatch]
        public async Task<HttpResponseMessage> UpdateEmployee([FromBody] EmployeeRegistrationViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Employee.UpdateEmployee(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("UPDATE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/RemoveEmployee")]
        [HttpPatch]
        public async Task<HttpResponseMessage> RemoveEmployee([FromBody] EmployeeRegistrationViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Employee.RemoveEmployee(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("REMOVE") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/ReturnEmployee")]
        [HttpPatch]
        public async Task<HttpResponseMessage> ReturnEmployee([FromBody] EmployeeRegistrationViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Employee.RemoveEmployee(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("RETURN") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        #endregion

        #region COMPANY
        [Route("~/api/GetCompanies")]
        [HttpGet]
        public async Task<IEnumerable<CompanyMasterViewModel>> GetCompanyList([FromBody] CompanyMasterViewModel param)
        {
            var model = await _wwauow.Company.GetCompanyList(param);
            return model;
        }

        [Route("~/api/AddCompany")]
        [HttpPost]
        public async Task<HttpResponseMessage> AddCompany([FromBody] CompanyMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Company.AddCompany(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("SAVE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/UpdateCompany")]
        [HttpPatch]
        public async Task<HttpResponseMessage> UpdateCompany([FromBody] CompanyMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model =  await _wwauow.Company.UpdateCompany(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("UPDATE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/RemoveCompany")]
        [HttpPatch]
        public async Task<HttpResponseMessage> RemoveCompany([FromBody] CompanyMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Company.RemoveCompany(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("REMOVE") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/ReturnCompany")]
        [HttpPatch]
        public async Task<HttpResponseMessage> ReturnCompany([FromBody] CompanyMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Company.RemoveCompany(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("RETURN") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        #endregion

        #region INDUSTRY TYPE
        [Route("~/api/GetIndustryTypes")]
        [HttpGet]
        public async Task<IEnumerable<IndustryTypeMasterViewModel>> GetIndustryTypes([FromBody] IndustryTypeMasterViewModel param)
        {
            var model = await _wwauow.IndustryType.GetIndustryTypeList(param);
            return model;
        }

        [Route("~/api/AddIndustryType")]
        [HttpPost]
        public async Task<HttpResponseMessage> AddIndustryType([FromBody] IndustryTypeMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.IndustryType.AddIndustryType(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("SAVE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/DeleteIndustryType")]
        [HttpPatch]
        public async Task<HttpResponseMessage> RemoveIndustryType([FromBody] IndustryTypeMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.IndustryType.RemoveIndustryType(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("REMOVE") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/ReturnIndustryType")]
        [HttpPatch]
        public async Task<HttpResponseMessage> ReturnIndustryType([FromBody] IndustryTypeMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.IndustryType.ReturnIndustryType(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("RETURN") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/UpdateIndustryType")]
        [HttpPatch]
        public async Task<HttpResponseMessage> UpdateIndustryType([FromBody] IndustryTypeMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.IndustryType.UpdateIndustryType(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("UPDATE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }
        #endregion

        #region STRENGTH
        [Route("~/api/GetStrength")]
        [HttpGet]
        public async Task<IEnumerable<StrengthMasterViewModel>> GetStrengthList([FromBody] StrengthMasterViewModel param)
        {
            var model = await _wwauow.Strength.GetStrengthList(param);
            return model;
        }

        [Route("~/api/AddStrength")]
        [HttpPost]
        public async Task<HttpResponseMessage> AddStrength([FromBody] StrengthMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Strength.AddStrength(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("SAVE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/UpdateStrength")]
        [HttpPatch]
        public async Task<HttpResponseMessage> UpdateStrength([FromBody] StrengthMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Strength.UpdateStrength(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("UPDATE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/RemoveStrength")]
        [HttpPatch]
        public async Task<HttpResponseMessage> RemoveStrength([FromBody] StrengthMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Strength.RemoveStrength(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("REMOVE") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/ReturnStrength")]
        [HttpPatch]
        public async Task<HttpResponseMessage> ReturnStrength([FromBody] StrengthMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Strength.ReturnStrength(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("RETURN") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }
        #endregion
    }
}