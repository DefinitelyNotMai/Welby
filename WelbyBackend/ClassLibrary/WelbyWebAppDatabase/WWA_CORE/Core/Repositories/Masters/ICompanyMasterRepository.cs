using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.ViewModel.Masters;

namespace WWA_CORE.Core.Repositories.Masters
{
    public interface ICompanyMasterRepository
    {
        Task<CompanyMasterViewModel> AddCompany(CompanyMasterViewModel companyMasterViewModel);
        Task<CompanyMasterViewModel> UpdateCompany(CompanyMasterViewModel companyMasterViewModel);
        Task<CompanyMasterViewModel> RemoveCompany(CompanyMasterViewModel companyMasterViewModel);
        Task<CompanyMasterViewModel> ReturnCompany(CompanyMasterViewModel companyMasterViewModel);
        Task<IEnumerable<CompanyMasterViewModel>> GetCompanyList(CompanyMasterViewModel companyMasterViewModel);
        Task<IEnumerable<CompanyMasterViewModel>> GetCompany(CompanyMasterViewModel companyMasterViewModel);

    }
}
