using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Utilities;

namespace WWA_CORE.Persistent.Resource.Masters
{
    public class CompanyMasterResource : CommonSchema
    {
        public string CompanyValues { get; set; } 
        public string CompanyGoals { get; set; }
        public string CompanyLocation { get; set; }
        public string IndustryTypeDisplay { get; set; }
    }
}
