using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.Resource.Masters;
using WWA_CORE.Utilities;

namespace WWA_CORE.Persistent.ViewModel.Masters
{
    public class ValueMasterViewModel : ValueMasterResource
    {
        public int ValueId { get; set; }
        public string Title { get; set; }
        public string Description { get; set;}

    }
}
