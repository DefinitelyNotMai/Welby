using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.ViewModel.Masters;

namespace WWA_CORE.Core.Repositories.Masters
{
    public interface IStrengthMasterRepository
    {
        Task<StrengthMasterViewModel> AddStrength(StrengthMasterViewModel strengthMasterViewModel);
        Task<StrengthMasterViewModel> UpdateStrength(StrengthMasterViewModel strengthMasterViewModel);
        Task<StrengthMasterViewModel> RemoveStrength(StrengthMasterViewModel strengthMasterViewModel);
        Task<StrengthMasterViewModel> ReturnStrength(StrengthMasterViewModel strengthMasterViewModel);
        Task<IEnumerable<StrengthMasterViewModel>> GetStrengthList(StrengthMasterViewModel strengthMasterViewModel);

        Task<IEnumerable<WWA_CORE.Utilities.KeyValuePair>> GetStrengthCategory();
    }
}
