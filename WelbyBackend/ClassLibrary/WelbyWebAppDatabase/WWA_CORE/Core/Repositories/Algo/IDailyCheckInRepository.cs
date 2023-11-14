using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.ViewModel.Algo;

namespace WWA_CORE.Core.Repositories.Algo
{
    public interface IDailyCheckInRepository
    {
        Task<DailyCheckInViewModel> AddDailyCheckIn(DailyCheckInViewModel dailyCheckInViewModel);
        Task<DailyCheckInViewModel> RemoveDailyCheckIn(DailyCheckInViewModel dailyCheckInViewModel);
        Task<DailyCheckInViewModel> ReturnDailyCheckIn(DailyCheckInViewModel dailyCheckInViewModel);

        Task<IEnumerable<DailyCheckInViewModel>> GetAllDailyCheckIn(DailyCheckInViewModel dailyCheckInViewModel);
    }
}
