using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.ViewModel.Masters;

namespace WWA_CORE.Core.Repositories.Masters
{
    public interface IInterestMasterRepository
    {
        Task<InterestMasterViewModel> AddInterest(InterestMasterViewModel interestMasterViewModel);
        Task<InterestMasterViewModel> UpdateInterest(InterestMasterViewModel interestMasterViewModel);
        Task<InterestMasterViewModel> RemoveInterest(InterestMasterViewModel interestMasterViewModel);
        Task<InterestMasterViewModel> ReturnInterest(InterestMasterViewModel interestMasterViewModel);
        Task<IEnumerable<InterestMasterViewModel>> GetInterestsList(InterestMasterViewModel interestMasterViewModel);
    }
}
