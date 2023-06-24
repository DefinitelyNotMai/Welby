using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Utilities;

namespace WWA_CORE.Persistent.Resource.Employee
{
    public class EmployeeInterestsResource : CommonSchema
    {
        public string EmployeeInterestsDisplay { get; set; }
        public string InterestNameDisplay { get; set; }
        public string EmployeeFirstNameDisplay { get; set; }
    }
}
