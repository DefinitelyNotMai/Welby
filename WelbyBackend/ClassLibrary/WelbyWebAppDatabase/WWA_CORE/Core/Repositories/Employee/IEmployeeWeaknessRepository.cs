using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.ViewModel.Employee;

namespace WWA_CORE.Core.Repositories.Employee
{
    public interface IEmployeeWeaknessRepository
    {
        Task<EmployeeWeaknessViewModel> AddEmployeeWeakness(EmployeeWeaknessViewModel employeeWeaknessViewModel);
        Task<EmployeeWeaknessViewModel> UpdateEmployeeWeakness(EmployeeWeaknessViewModel employeeWeaknessViewModel);
        Task<EmployeeWeaknessViewModel> RemoveEmployeeWeakness(EmployeeWeaknessViewModel employeeWeaknessViewModel);
        Task<EmployeeWeaknessViewModel> ReturnEmployeeWeakness(EmployeeWeaknessViewModel employeeWeaknessViewModel);
        Task<IEnumerable<EmployeeWeaknessViewModel>> GetEmployeeWeakness(EmployeeWeaknessViewModel employeeWeaknessViewModel);
    }
}
