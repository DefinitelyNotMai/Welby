using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Utilities;

namespace WWA_CORE.Persistent.ViewModel.Algo
{
    public class TiseViewModel : CommonSchema
    {
        public int TiseId { get; set; }
        public int EmployeeId { get; set; }
        public int CompanyId {  get; set; }
        public float Factor_1 {  get; set; }
        public float Factor_2 { get; set; }
        public float Factor_3 { get; set; }
        public float Factor_4 { get; set; }
        public int Factor_5 { get; set; }
        public int Factor_6 { get; set; }
        public int Factor_7 { get; set; }
        public int Factor_8 { get; set; }

    }
}
