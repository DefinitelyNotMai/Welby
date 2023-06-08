using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.Resource.Masters;
using WWA_CORE.Utilities;

namespace WWA_CORE.Persistent.ViewModel.Masters
{
    public class CityMasterViewModel : CityMasterResource
    {
        public int CityId { get; set; }
        public string Name { get; set; }
        public int CountryId { get; set; }
    }
}
