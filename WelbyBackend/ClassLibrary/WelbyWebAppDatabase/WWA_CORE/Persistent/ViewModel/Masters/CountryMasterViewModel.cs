using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.Resource.Masters;

namespace WWA_CORE.Persistent.ViewModel.Masters
{
    public class CountryMasterViewModel : CountryMasterResource
    {
        public int CountryId { get; set; }
        public string Name { get; set; }
        public string Nationality { get; set; }
        public string Flag_Image { get; set; }
    }
}
