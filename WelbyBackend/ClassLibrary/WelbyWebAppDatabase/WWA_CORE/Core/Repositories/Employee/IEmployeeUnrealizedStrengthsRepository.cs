using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.ViewModel.Employee;

namespace WWA_CORE.Core.Repositories.Employee
{
    public interface IEmployeeUnrealizedStrengthsRepository
    {
        Task<EmployeeUnrealizedStrengthsViewModel> AddEmployeeUnrealizedStrength(EmployeeUnrealizedStrengthsViewModel employeeUnrealizedStrengthsViewModel);
        Task<EmployeeUnrealizedStrengthsViewModel> UpdateEmployeeUnrealizedStrength(EmployeeUnrealizedStrengthsViewModel employeeUnrealizedStrengthsViewModel);
        Task<EmployeeUnrealizedStrengthsViewModel> RemoveEmployeeUnrealizedStrength(EmployeeUnrealizedStrengthsViewModel employeeUnrealizedStrengthsViewModel);
        Task<EmployeeUnrealizedStrengthsViewModel> ReturnEmployeeUnrealizedStrength(EmployeeUnrealizedStrengthsViewModel employeeUnrealizedStrengthsViewModel);
        Task<IEnumerable<EmployeeUnrealizedStrengthsViewModel>> GetEmployeeUnrealizedStrength(EmployeeUnrealizedStrengthsViewModel employeeUnrealizedStrengthsViewModel);
    }
}
