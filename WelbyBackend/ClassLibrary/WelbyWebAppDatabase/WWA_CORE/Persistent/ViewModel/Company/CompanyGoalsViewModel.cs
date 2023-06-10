using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.Resource.Company;

namespace WWA_CORE.Persistent.ViewModel.Company
{
    public class CompanyGoalsViewModel : CompanyGoalsResource
    {
        public int CompanyGoalsId { get; set; }
        public int GoalId { get; set; }
        public int CompanyId { get; set; }
    }
}
