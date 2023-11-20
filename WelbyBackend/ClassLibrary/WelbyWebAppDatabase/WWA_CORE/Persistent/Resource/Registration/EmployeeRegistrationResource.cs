using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Utilities;

namespace WWA_CORE.Persistent.Resource.Registration
{
    public class EmployeeRegistrationResource : CommonSchema
    {
        public string EmployeeFullName { get; set; }
        public string CountryDisplay { get; set; } 
        public string EmployeeCompanyDisplay { get; set; }
        public string GenderDisplayName { get; set; }
    
    }
}
