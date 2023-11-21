using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.Resource.Masters;

namespace WWA_CORE.Persistent.ViewModel.Masters
{
    public class CompanyMasterViewModel : CompanyMasterResource
    {
        public int CompanyId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone_Number { get; set; }
        public string Website { get; set; }
        public string Address { get; set; }
        public DateTime? FoundingDate { get; set; }
        public string CompanySize { get; set; }

        public string Vision { get; set; }
        public string Mission { get; set; }
        public string Logo { get; set; }

        public int? CountryId { get; set; }
        public int? IndustryTypeId { get; set; }
    }
}
