using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.ViewModel.Company;

namespace WWA_CORE.Core.Repositories.Company
{
    public interface ICompanyGoalsRepository
    {
        Task<CompanyGoalsViewModel> AddCompanyGoal(CompanyGoalsViewModel companyGoalsViewModel);
        Task<CompanyGoalsViewModel> UpdateCompanyGoal(CompanyGoalsViewModel companyGoalsViewModel);
        Task<CompanyGoalsViewModel> RemoveCompanyGoal(CompanyGoalsViewModel companyGoalsViewModel);
        Task<CompanyGoalsViewModel> ReturnCompanyGoal(CompanyGoalsViewModel companyGoalsViewModel);
        Task<IEnumerable<CompanyGoalsViewModel>> GetCompanyGoals(CompanyGoalsViewModel companyGoalsViewModel);
    }
}
