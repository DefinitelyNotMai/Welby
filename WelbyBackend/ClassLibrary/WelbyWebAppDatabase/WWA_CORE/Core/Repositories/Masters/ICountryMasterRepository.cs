using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.ViewModel.Masters;

namespace WWA_CORE.Core.Repositories.Masters
{
    public interface ICountryMasterRepository
    {
        Task<CountryMasterViewModel> AddCountry(CountryMasterViewModel countryMasterViewModel);
        Task<CountryMasterViewModel> UpdateCountry(CountryMasterViewModel countryMasterViewModel);
        Task<CountryMasterViewModel> RemoveCountry(CountryMasterViewModel countryMasterViewModel);
        Task<CountryMasterViewModel> ReturnCountry(CountryMasterViewModel countryMasterViewModel);
        Task<IEnumerable<CountryMasterViewModel>> GetCountryList(CountryMasterViewModel countryMasterViewModel);
    }
}
