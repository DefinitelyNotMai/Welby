using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.ViewModel.Employee;

namespace WWA_CORE.Core.Repositories.Employee
{
    public interface IEmployeeRealizedStrengthsRepository
    {
        Task<EmployeeRealizedStrengthsViewModel> AddEmployeeRealizedStrength(EmployeeRealizedStrengthsViewModel employeeRealizedStrengthsViewModel);
        Task<EmployeeRealizedStrengthsViewModel> UpdateEmployeeRealizedStrength(EmployeeRealizedStrengthsViewModel employeeRealizedStrengthsViewModel);
        Task<EmployeeRealizedStrengthsViewModel> RemoveEmployeeRealizedStrength(EmployeeRealizedStrengthsViewModel employeeRealizedStrengthsViewModel);
        Task<EmployeeRealizedStrengthsViewModel> ReturnEmployeeRealizedStrength(EmployeeRealizedStrengthsViewModel employeeRealizedStrengthsViewModel);
    }
}
