using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.ViewModel.Masters;

namespace WWA_CORE.Core.Repositories.Masters
{
    public interface IValueMasterRepository
    {
        Task<ValueMasterViewModel> AddValue(ValueMasterViewModel valueMasterViewModel);
        Task<ValueMasterViewModel> UpdateValue(ValueMasterViewModel valueMasterViewModel);
        Task<ValueMasterViewModel> RemoveValue(ValueMasterViewModel valueMasterViewModel);
        Task<ValueMasterViewModel> ReturnValue(ValueMasterViewModel valueMasterViewModel);
        Task<IEnumerable<ValueMasterViewModel>> GetValues(ValueMasterViewModel valueMasterViewModel);
    }
}