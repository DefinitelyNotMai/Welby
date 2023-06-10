using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.ViewModel.Employee;

namespace WWA_CORE.Core.Repositories.Employee
{
    public interface IEmployeeLearnedBehaviorsRepository
    {
        Task<EmployeeLearnedBehaviorsViewModel> AddEmployeeLearnedBehavior(EmployeeLearnedBehaviorsViewModel employeeLearnedBehaviorsViewModel);
        Task<EmployeeLearnedBehaviorsViewModel> UpdateEmployeeLearnedBehavior(EmployeeLearnedBehaviorsViewModel employeeLearnedBehaviorsViewModel);
        Task<EmployeeLearnedBehaviorsViewModel> RemoveEmployeeLearnedBehavior(EmployeeLearnedBehaviorsViewModel employeeLearnedBehaviorsViewModel);
        Task<EmployeeLearnedBehaviorsViewModel> ReturnEmployeeLearnedBehavior(EmployeeLearnedBehaviorsViewModel employeeLearnedBehaviorsViewModel);
        Task<EmployeeLearnedBehaviorsViewModel> GetEmployeeLearnedBehaviors(EmployeeLearnedBehaviorsViewModel employeeLearnedBehaviorsViewModel);
    }
}
