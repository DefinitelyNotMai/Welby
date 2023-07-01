using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Utilities;

namespace WWA_CORE.Persistent.Resource.Company
{
    public class CompanyGoalsResource : CommonSchema
    {
        public string CompanyNameDisplay { get; set; }
        public string GoalTitleDisplay { get; set; }

        public DateTime GoalDurationFrom { get; set; }
        public DateTime GoalDurationTo { get; set; }
    }
}
