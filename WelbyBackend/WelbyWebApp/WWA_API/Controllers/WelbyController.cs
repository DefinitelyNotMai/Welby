using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WWA_CORE;
using WWA_CORE.Core.Repositories;
using WWA_CORE.Persistent.ViewModel.Masters;

namespace WWA_API.Controllers
{
    public class WelbyController : ApiController
    {
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




    }
}