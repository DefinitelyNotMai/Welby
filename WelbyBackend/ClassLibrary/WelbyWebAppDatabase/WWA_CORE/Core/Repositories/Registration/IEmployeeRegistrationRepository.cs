using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.ViewModel.Registration;

namespace WWA_CORE.Core.Repositories.Registration
{
    public interface IEmployeeRegistrationRepository
    {
        Task<string> GenerateNewEmployeeCode(int CurrentCompanyId);
        Task<EmployeeRegistrationViewModel> AddEmployee(EmployeeRegistrationViewModel employeeRegistrationViewModel);
        Task<EmployeeRegistrationViewModel> RemoveEmployee(EmployeeRegistrationViewModel employeeRegistrationModelView);
        Task<EmployeeRegistrationViewModel> ReturnEmployee(EmployeeRegistrationViewModel employeeRegistrationModelView);
        Task<EmployeeRegistrationViewModel> UpdateEmployee(EmployeeRegistrationViewModel employeeRegistrationViewModel);    
        Task<IEnumerable<EmployeeRegistrationViewModel>> GetAllEmployees(EmployeeRegistrationViewModel employeeRegistrationViewModel);
    }
}
