using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.ViewModel.Masters;

namespace WWA_CORE.Core.Repositories.Masters
{
    public interface ICityMasterRepository
    {
        Task<CityMasterViewModel> AddCity(CityMasterViewModel cityMasterViewModel);
        Task<CityMasterViewModel> UpdateCity(CityMasterViewModel cityMasterViewModel);
        Task<CityMasterViewModel> RemoveCity(CityMasterViewModel cityMasterViewModel);
        Task<CityMasterViewModel> ReturnCity(CityMasterViewModel cityMasterViewModel);
        Task<IEnumerable<CityMasterViewModel>> GetCityList(CityMasterViewModel cityMasterViewModel);

    }
}
