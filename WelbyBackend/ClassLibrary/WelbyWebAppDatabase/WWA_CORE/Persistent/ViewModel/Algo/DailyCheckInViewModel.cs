using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.Resource.Algo;
using WWA_CORE.Utilities;

namespace WWA_CORE.Persistent.ViewModel.Algo
{
    public class DailyCheckInViewModel : DailyCheckInResource
    {
        public int DailyCheckInId {  get; set; }
        public int EmployeeId { get; set; }
        public int CompanyId { get; set; }
        public int FocusAtWork_int { get; set; }
        public int EnergyAtWork_int { get; set; }
        public int PositiveEmotions_int { get; set; }
        public int NegativeEmotions_int { get; set; }

        public string FocusAtWork_value { get; set; }
        public string EnergyAtWork_value { get; set; }
        public string PositiveEmotions_value { get; set; }
        public string NegativeEmotions_value { get; set; }

        public int? Productivity { get; set; }
        public float Prediction {  get; set; }
    }
}
