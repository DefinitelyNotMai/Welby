using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.ViewModel.Masters;

namespace WWA_CORE.Core.Repositories.Masters
{
    public interface IIndustryTypeMasterRepository
    {
        Task<IndustryTypeMasterViewModel> AddIndustryType(IndustryTypeMasterViewModel industryTypeMasterViewModel);
        Task<IndustryTypeMasterViewModel> RemoveIndustryType(IndustryTypeMasterViewModel industryTypeMasterViewModel);
        Task<IndustryTypeMasterViewModel> ReturnIndustryType(IndustryTypeMasterViewModel industryTypeMasterViewModel);
        Task<IndustryTypeMasterViewModel> UpdateIndustryType(IndustryTypeMasterViewModel industryTypeMasterViewModel);
        Task<IEnumerable<IndustryTypeMasterViewModel>> GetIndustryTypeList(IndustryTypeMasterViewModel industryTypeMasterViewModel);

    }
}
