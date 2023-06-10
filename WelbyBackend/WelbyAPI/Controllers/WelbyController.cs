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
    }
}