using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Utilities;

namespace WWA_CORE.Persistent.ViewModel.Algo
{
    public class DailyCheckInViewModel : CommonSchema
    {
        public int DailyCheckInId {  get; set; }
        public int EmployeeId { get; set; }
        public int FocusAtWork { get; set; }
        public int EnergyAtWork { get; set; }
        public int PositiveEmotions { get; set; }
        public int NegativeEmotions { get; set; }
    }
}
