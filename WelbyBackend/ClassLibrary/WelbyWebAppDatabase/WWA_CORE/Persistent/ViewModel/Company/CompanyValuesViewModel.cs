using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.Resource.Company;

namespace WWA_CORE.Persistent.ViewModel.Company
{
    public class CompanyValuesViewModel : CompanyValuesResource
    {
        public string CompanyValuesId { get; set; }
        public string CompanyId { get; set; }
        public string ValueId { get; set; }
    }
}
