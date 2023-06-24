using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Utilities;

namespace WWA_CORE.Persistent.ViewModel.Masters
{
    public class GenderMasterViewModel : CommonSchema
    {
        public int GenderId { get; set; }
        public string Gender { get; set; }
        public bool Biological { get; set; }
    }
}
