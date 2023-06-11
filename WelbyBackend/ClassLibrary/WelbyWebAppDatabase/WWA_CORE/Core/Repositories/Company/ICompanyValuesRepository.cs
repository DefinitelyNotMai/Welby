using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.ViewModel.Company;

namespace WWA_CORE.Core.Repositories.Company
{
    public interface ICompanyValuesRepository
    {
        Task<CompanyValuesViewModel> AddCompanyValue(CompanyValuesViewModel companyValuesViewModel);
        Task<CompanyValuesViewModel> UpdateCompanyValue(CompanyValuesViewModel companyValuesViewModel);
        Task<CompanyValuesViewModel> RemoveCompayValue(CompanyValuesViewModel companyValuesViewModel);
        Task<CompanyValuesViewModel> ReturnCompanyValue(CompanyValuesViewModel companyValuesViewModel);
        Task<IEnumerable<CompanyValuesViewModel>> GetCompanyValue(CompanyValuesViewModel companyValuesViewModel);
    }
}
