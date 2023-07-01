using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using WWA_CORE.Core.Repositories;
using WWA_CORE.Persistent.ViewModel.Masters;
using WWA_CORE.Persistent.ViewModel.Employee;
using WWA_CORE.Persistent.ViewModel.Company;
using WWA_CORE.Persistent.ViewModel.Registration;
using WWA_CORE;
using System.Net;
using System.Net.Http;
using System.Web.Script.Serialization;
using System.Text;
using System.Web.UI;
using System.EnterpriseServices.Internal;
using System.Web.Http.Cors;

namespace WelbyAPI.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "Origin, X-Requested-With, Content-Type, Accept", methods: "GET, POST, PUT, DELETE, OPTIONS, PATCH")]
    public class WelbyController : ApiController
    {
        // GET: Welby
        private readonly IWWAUnitOfWork _wwauow;
        public WelbyController()
        {
            this._wwauow = this._wwauow ?? new WWAUnitOfWork();
        }

        #region EMPLOYEES
        [Route("~/api/GetAllEmployees")]
        [HttpGet]
        public async Task<IEnumerable<EmployeeRegistrationViewModel>> GetEmployeesList([FromUri] EmployeeRegistrationViewModel param)
        {
            var model = await _wwauow.Employee.GetAllEmployees(param);
            
            return model;
        }

        //GetSingle Employee
        [Route("~/api/GetEmployee")]
        [HttpGet]
        public async Task<IEnumerable<EmployeeRegistrationViewModel>> GetEmployee([FromUri] EmployeeRegistrationViewModel param)
        {
            var model = await _wwauow.Employee.GetEmployee(param);
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

        #region VALUE
        [Route("~/api/GetAllValue")]
        [HttpGet]
        public async Task<IEnumerable<ValueMasterViewModel>> GetValueList([FromBody] ValueMasterViewModel param)
        {
            var model = await _wwauow.Value.GetAllValues(param);
            return model;
        }

        [Route("~/api/AddValue")]
        [HttpPost]
        public async Task<HttpResponseMessage> AddValue([FromBody] ValueMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Value.AddValue(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("SAVE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/UpdateValue")]
        [HttpPatch]
        public async Task<HttpResponseMessage> UpdateValue([FromBody] ValueMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Value.UpdateValue(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("UPDATE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/RemoveValue")]
        [HttpPatch]
        public async Task<HttpResponseMessage> RemoveValue([FromBody] ValueMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Value.RemoveValue(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("REMOVE") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/ReturnValue")]
        [HttpPatch]
        public async Task<HttpResponseMessage> ReturnValue([FromBody] ValueMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Value.ReturnValue(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("RETURN") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
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

        #region INTEREST
        [Route("~/api/GetAllInterest")]
        [HttpGet]
        public async Task<IEnumerable<InterestMasterViewModel>> GetInterestList([FromBody] InterestMasterViewModel param)
        {
            var model = await _wwauow.Interest.GetInterestsList(param);
            return model;
        }

        [Route("~/api/AddInterest")]
        [HttpPost]
        public async Task<HttpResponseMessage> AddInterest([FromBody] InterestMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Interest.AddInterest(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("SAVE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/UpdateInterest")]
        [HttpPatch]
        public async Task<HttpResponseMessage> UpdateInterest([FromBody] InterestMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Interest.UpdateInterest(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("UPDATE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/RemoveInterest")]
        [HttpPatch]
        public async Task<HttpResponseMessage> RemoveInterest([FromBody] InterestMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Interest.RemoveInterest(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("REMOVE") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/ReturnInterest")]
        [HttpPatch]
        public async Task<HttpResponseMessage> ReturnInterest([FromBody] InterestMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Interest.AddInterest(param);
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

        [Route("~/api/RemoveIndustryType")]
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

        #region GOAL
        [Route("~/api/GetAllGoal")]
        [HttpGet]
        public async Task<IEnumerable<GoalMasterViewModel>> GetGoalList([FromBody] GoalMasterViewModel param)
        {
            var model = await _wwauow.Goal.GetGoalList(param);
            return model;
        }

        [Route("~/api/AddGoal")]
        [HttpPost]
        public async Task<HttpResponseMessage> AddGoal([FromBody] GoalMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Goal.AddGoal(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("SAVE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/UpdateGoal")]
        [HttpPatch]
        public async Task<HttpResponseMessage> UpdateGoal([FromBody] GoalMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Goal.UpdateGoal(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("UPDATE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/RemoveGoal")]
        [HttpPatch]
        public async Task<HttpResponseMessage> RemoveGoal([FromBody] GoalMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Goal.RemoveGoal(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("REMOVE") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/ReturnValue")]
        [HttpPatch]
        public async Task<HttpResponseMessage> ReturnGoal([FromBody] GoalMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Goal.ReturnGoal(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("RETURN") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }
        #endregion

        #region GENDER
        [Route("~/api/GetGender")]
        [HttpGet]
        public async Task<IEnumerable<GenderMasterViewModel>> GetGenderList([FromBody] GenderMasterViewModel param)
        {
            var model = await _wwauow.Gender.GetGenderList(param);
            return model;
        }

        [Route("~/api/AddGender")]
        [HttpPost]
        public async Task<HttpResponseMessage> AddGender([FromBody] GenderMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Gender.AddGender(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("SAVE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/UpdateGender")]
        [HttpPatch]
        public async Task<HttpResponseMessage> UpdateGender([FromBody] GenderMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Gender.UpdateGender(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("UPDATE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/RemoveGender")]
        [HttpPatch]
        public async Task<HttpResponseMessage> RemoveGender([FromBody] GenderMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Gender.RemoveGender(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("REMOVE") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/ReturnGender")]
        [HttpPatch]
        public async Task<HttpResponseMessage> ReturnGender([FromBody] GenderMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Gender.ReturnGender(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("RETURN") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }
        #endregion

        #region COUNTRY
        [Route("~/api/GetAllCountry")]
        [HttpGet]
        public async Task<IEnumerable<CountryMasterViewModel>> GetCountryList([FromUri] CountryMasterViewModel param)
        {
            var model = await _wwauow.Country.GetCountryList(param);
            return model;
        }

        [Route("~/api/AddCountry")]
        [HttpPost]
        public async Task<HttpResponseMessage> AddCountry([FromBody] CountryMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Country.AddCountry(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("SAVE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/UpdateCountry")]
        [HttpPatch]
        public async Task<HttpResponseMessage> UpdateCountry([FromBody] CountryMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Country.UpdateCountry(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("UPDATE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/RemoveCountry")]
        [HttpPatch]
        public async Task<HttpResponseMessage> RemoveCountry([FromBody] CountryMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Country.RemoveCountry(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("REMOVE") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/ReturnCountry")]
        [HttpPatch]
        public async Task<HttpResponseMessage> ReturnCountry([FromBody] CountryMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.Country.ReturnCountry(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("RETURN") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }
        #endregion

        #region COMPANY
        [Route("~/api/GetCompanies")]
        [HttpGet]
        public async Task<IEnumerable<CompanyMasterViewModel>> GetCompanyList([FromUri] CompanyMasterViewModel param)
        {
            var model = await _wwauow.Company.GetCompanyList(param);
            return model;
        }

        [Route("~/api/GetCompany")]
        [HttpGet]
        public async Task<IEnumerable<CompanyMasterViewModel>> GetCompany([FromUri] CompanyMasterViewModel param)
        {
            var model = await _wwauow.Company.GetCompany(param);
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

        #region CITY
        [Route("~/api/GetAllCity")]
        [HttpGet]
        public async Task<IEnumerable<CityMasterViewModel>> GetCityList([FromBody] CityMasterViewModel param)
        {
            var model = await _wwauow.City.GetCityList(param);
            return model;
        }

        [Route("~/api/AddCity")]
        [HttpPost]
        public async Task<HttpResponseMessage> AddCity([FromBody] CityMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.City.AddCity(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("SAVE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/UpdateCity")]
        [HttpPatch]
        public async Task<HttpResponseMessage> UpdateCity([FromBody] CityMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.City.UpdateCity(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("UPDATE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/RemoveCity")]
        [HttpPatch]
        public async Task<HttpResponseMessage> RemoveCity([FromBody] CityMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.City.RemoveCity(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("REMOVE") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/ReturnCity")]
        [HttpPatch]
        public async Task<HttpResponseMessage> ReturnCity([FromBody] CityMasterViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.City.ReturnCity(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("RETURN") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }
        #endregion

        #region EMPLOYEE INTEREST
        [Route("~/api/GetEmployeeInterests")]
        [HttpGet]
        public async Task<IEnumerable<EmployeeInterestViewModel>> GetEmployeeInterestsList([FromBody] EmployeeInterestViewModel param)
        {
            var model = await _wwauow.EmployeeInterest.GetEmployeeInterests(param);
            return model;
        }

        [Route("~/api/AddEmployeeInterests")]
        [HttpPost]
        public async Task<HttpResponseMessage> AddEmployeeInterest([FromBody] EmployeeInterestViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.EmployeeInterest.AddEmployeeInterest(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("SAVE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/UpdateEmployeeInterests")]
        [HttpPatch]
        public async Task<HttpResponseMessage> UpdateEmployeeInterest([FromBody] EmployeeInterestViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.EmployeeInterest.UpdateEmployeeInterest(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("UPDATE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/RemoveEmployeeInterests")]
        [HttpPatch]
        public async Task<HttpResponseMessage> RemoveEmployeeInterest([FromBody] EmployeeInterestViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.EmployeeInterest.RemoveEmployeeInterest(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("REMOVE") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/ReturnEmployeeInterests")]
        [HttpPatch]
        public async Task<HttpResponseMessage> ReturnEmployeeInterest([FromBody] EmployeeInterestViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.EmployeeInterest.ReturnEmployeeInterest(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("RETURN") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }
        #endregion

        #region EMPLOYEE LEARNED BEHAVIORS
        [Route("~/api/GetEmployeeLearnedBehaviors")]
        [HttpGet]
        public async Task<IEnumerable<EmployeeLearnedBehaviorsViewModel>> GetEmployeeLearnedBehaviorsList([FromBody] EmployeeLearnedBehaviorsViewModel param)
        {
            var model = await _wwauow.EmployeeLearnedBehaviors.GetEmployeeLearnedBehaviors(param);
            return model;
        }

        [Route("~/api/AddEmployeeLearnedBehavior")]
        [HttpPost]
        public async Task<HttpResponseMessage> AddEmployeeLearnedBehavior([FromBody] EmployeeLearnedBehaviorsViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.EmployeeLearnedBehaviors.AddEmployeeLearnedBehavior(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("SAVE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/UpdateEmployeeLearnedBehavior")]
        [HttpPatch]
        public async Task<HttpResponseMessage> UpdateEmployeeLearnedBehavior([FromBody] EmployeeLearnedBehaviorsViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.EmployeeLearnedBehaviors.UpdateEmployeeLearnedBehavior(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("UPDATE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/RemoveEmployeeLearnedBehavior")]
        [HttpPatch]
        public async Task<HttpResponseMessage> RemoveEmployeeLearnedBehaviors([FromBody] EmployeeLearnedBehaviorsViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.EmployeeLearnedBehaviors.RemoveEmployeeLearnedBehavior(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("REMOVE") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/ReturnEmployeeLearnedBehavior")]
        [HttpPatch]
        public async Task<HttpResponseMessage> ReturnEmployeeLearnedBehaviors([FromBody] EmployeeLearnedBehaviorsViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.EmployeeLearnedBehaviors.ReturnEmployeeLearnedBehavior(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("RETURN") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }
        #endregion

        #region EMPLOYEE REALIZED STRENGTH
        [Route("~/api/GetEmployeeRealizedStrengths")]
        [HttpGet]
        public async Task<IEnumerable<EmployeeRealizedStrengthsViewModel>> GetEmployeeRealizedStrengthList([FromBody] EmployeeRealizedStrengthsViewModel param)
        {
            var model = await _wwauow.EmployeeRealizedStrengths.GetEmployeeRealizedStrength(param);
            return model;
        }

        [Route("~/api/AddEmployeeRealizedStrength")]
        [HttpPost]
        public async Task<HttpResponseMessage> AddEmployeeRealizedStrength([FromBody] EmployeeRealizedStrengthsViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.EmployeeRealizedStrengths.AddEmployeeRealizedStrength(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("SAVE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/UpdateEmployeeRealizedStrength")]
        [HttpPatch]
        public async Task<HttpResponseMessage> UpdateEmployeeRealizedStrength([FromBody] EmployeeRealizedStrengthsViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.EmployeeRealizedStrengths.UpdateEmployeeRealizedStrength(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("UPDATE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/RemoveEmployeeRealizedStrengths")]
        [HttpPatch]
        public async Task<HttpResponseMessage> RemoveEmployeeRealizedStrengths([FromBody] EmployeeRealizedStrengthsViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.EmployeeRealizedStrengths.RemoveEmployeeRealizedStrength(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("REMOVE") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/ReturnEmployeeRealizedStrengths")]
        [HttpPatch]
        public async Task<HttpResponseMessage> ReturnEmployeeRealizedStrengths([FromBody] EmployeeRealizedStrengthsViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.EmployeeRealizedStrengths.ReturnEmployeeRealizedStrength(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("RETURN") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }
        #endregion

        #region EMPLOYEE UNREALIZED STRENGTH
        [Route("~/api/GetEmployeeUnrealizedStrengths")]
        [HttpGet]
        public async Task<IEnumerable<EmployeeUnrealizedStrengthsViewModel>> GetEmployeeUnrealizedStrengthList([FromBody] EmployeeUnrealizedStrengthsViewModel param)
        {
            var model = await _wwauow.EmployeeUnrealizedStrengths.GetEmployeeUnrealizedStrength(param);
            return model;
        }

        [Route("~/api/AddEmployeeUnrealizedStrength")]
        [HttpPost]
        public async Task<HttpResponseMessage> AddEmployeeUnrealizedStrength([FromBody] EmployeeUnrealizedStrengthsViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.EmployeeUnrealizedStrengths.AddEmployeeUnrealizedStrength(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("SAVE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/UpdateEmployeeUnrealizedStrength")]
        [HttpPatch]
        public async Task<HttpResponseMessage> UpdateEmployeeUnrealizedStrength([FromBody] EmployeeUnrealizedStrengthsViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.EmployeeUnrealizedStrengths.UpdateEmployeeUnrealizedStrength(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("UPDATE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/RemoveEmployeeUnrealizedStrengths")]
        [HttpPatch]
        public async Task<HttpResponseMessage> RemoveEmployeeUnrealizedStrengths([FromBody] EmployeeUnrealizedStrengthsViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.EmployeeUnrealizedStrengths.RemoveEmployeeUnrealizedStrength(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("REMOVE") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/ReturnEmployeeUnrealizedStrengths")]
        [HttpPatch]
        public async Task<HttpResponseMessage> ReturnEmployeeUnrealizedStrengths([FromBody] EmployeeUnrealizedStrengthsViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.EmployeeUnrealizedStrengths.ReturnEmployeeUnrealizedStrength(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("RETURN") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }
        #endregion

        #region EMPLOYEE WEAKNESS
        [Route("~/api/GetEmployeeWeaknesses")]
        [HttpGet]
        public async Task<IEnumerable<EmployeeWeaknessViewModel>> GetEmployeeWeaknessList([FromBody] EmployeeWeaknessViewModel param)
        {
            var model = await _wwauow.EmployeeWeakness.GetEmployeeWeakness(param);
            return model;
        }

        [Route("~/api/AddEmployeeWeakness")]
        [HttpPost]
        public async Task<HttpResponseMessage> AddEmployeeWeakness([FromBody] EmployeeWeaknessViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.EmployeeWeakness.AddEmployeeWeakness(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("SAVE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/UpdateEmployeeWeakness")]
        [HttpPatch]
        public async Task<HttpResponseMessage> UpdateEmployeeWeakness([FromBody] EmployeeWeaknessViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.EmployeeWeakness.UpdateEmployeeWeakness(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("UPDATE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/RemoveEmployeeWeakness")]
        [HttpPatch]
        public async Task<HttpResponseMessage> RemoveEmployeeWeakness([FromBody] EmployeeWeaknessViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.EmployeeWeakness.RemoveEmployeeWeakness(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("REMOVE") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/ReturnEmployeeWeakness")]
        [HttpPatch]
        public async Task<HttpResponseMessage> ReturnEmployeeWeakness([FromBody] EmployeeWeaknessViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.EmployeeWeakness.ReturnEmployeeWeakness(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("RETURN") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }
        #endregion

        #region COMPANY GOALS
        [Route("~/api/GetCompanyGoals")]
        [HttpGet]
        public async Task<IEnumerable<CompanyGoalsViewModel>> GetCompanyGoalsList([FromBody] CompanyGoalsViewModel param)
        {
            var model = await _wwauow.CompanyGoals.GetCompanyGoals(param);
            return model;
        }

        [Route("~/api/AddCompanyGoals")]
        [HttpPost]
        public async Task<HttpResponseMessage> AddCompanyGoal([FromBody] CompanyGoalsViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.CompanyGoals.AddCompanyGoal(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("SAVE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/UpdateCompanyGoals")]
        [HttpPatch]
        public async Task<HttpResponseMessage> UpdateCompanyGoal([FromBody] CompanyGoalsViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.CompanyGoals.UpdateCompanyGoal(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("UPDATE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/RemoveCompanyGoals")]
        [HttpPatch]
        public async Task<HttpResponseMessage> RemoveCompanyGoal([FromBody] CompanyGoalsViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.CompanyGoals.RemoveCompanyGoal(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("REMOVE") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/ReturnCompanyGoals")]
        [HttpPatch]
        public async Task<HttpResponseMessage> ReturnCompanyGoal([FromBody] CompanyGoalsViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.CompanyGoals.ReturnCompanyGoal(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("RETURN") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }
        #endregion

        #region COMPANY VALUES
        [Route("~/api/GetCompanyValues/{Companyid}")]
        [HttpGet]
        public async Task<IEnumerable<CompanyValuesViewModel>> GetCompanyValuesList([FromBody] CompanyValuesViewModel param)
        {
            var model = await _wwauow.CompanyValues.GetCompanyValues(param);
            return model;
        }

        [Route("~/api/AddCompanyValues")]
        [HttpPost]
        public async Task<HttpResponseMessage> AddCompanyValue([FromBody] CompanyValuesViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.CompanyValues.AddCompanyValue(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("SAVE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/UpdateCompanyValues")]
        [HttpPatch]
        public async Task<HttpResponseMessage> UpdateCompanyValue([FromBody] CompanyValuesViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.CompanyValues.UpdateCompanyValue(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("UPDATE") || model.Message_Code.ToUpper().Trim().Contains("DUPLICATE")) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest);
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/RemoveCompanyValues")]
        [HttpPatch]
        public async Task<HttpResponseMessage> RemoveCompanyValue([FromBody] CompanyValuesViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.CompanyValues.RemoveCompanyValue(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("REMOVE") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }

        [Route("~/api/ReturnCompanyValues")]
        [HttpPatch]
        public async Task<HttpResponseMessage> ReturnCompanyValue([FromBody] CompanyValuesViewModel param)
        {
            var js = new JavaScriptSerializer();
            var model = await _wwauow.CompanyValues.ReturnCompanyValue(param);
            var response = (model.Message_Code.ToUpper().Trim().Contains("RETURN") ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.BadRequest));
            var sample = js.Serialize(model);
            response.Content = new StringContent(sample, Encoding.UTF8, "application/json");
            return response;
        }
        #endregion
    }
}