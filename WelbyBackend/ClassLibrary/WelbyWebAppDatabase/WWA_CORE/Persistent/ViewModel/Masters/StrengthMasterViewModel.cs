using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Utilities;

namespace WWA_CORE.Persistent.ViewModel.Masters
{
    public class StrengthMasterViewModel : CommonSchema
    {
        public int StrengthId { get; set; }
        public string Strength { get; set;}
        public string Category   { get; set;}
        public string Description { get; set;}
        
    }
}
