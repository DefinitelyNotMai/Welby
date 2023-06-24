using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.ViewModel.Masters;

namespace WWA_CORE.Core.Repositories.Masters
{
    public interface IGenderMasterRepository
    {
        Task<GenderMasterViewModel> AddGender(GenderMasterViewModel genderMasterViewModel);
        Task<GenderMasterViewModel> UpdateGender(GenderMasterViewModel genderMasterViewModel);
        Task<GenderMasterViewModel> RemoveGender(GenderMasterViewModel genderMasterViewModel);
        Task<GenderMasterViewModel> ReturnGender(GenderMasterViewModel genderMasterViewModel);
        Task<IEnumerable<GenderMasterViewModel>> GetGenderList(GenderMasterViewModel genderMasterViewModel);
    }
}
