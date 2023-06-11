using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.ViewModel.Employee;

namespace WWA_CORE.Core.Repositories.Employee
{
    public interface IEmployeeInterestRepository
    {
        Task<EmployeeInterestViewModel> AddEmployeeInterest(EmployeeInterestViewModel employeeInterestViewModel);
        Task<EmployeeInterestViewModel> UpdateEmployeeInterest(EmployeeInterestViewModel employeeInterestViewModel);
        Task<EmployeeInterestViewModel> RemoveEmployeeInterest(EmployeeInterestViewModel employeeInterestViewModel);
        Task<EmployeeInterestViewModel> ReturnEmployeeInterest(EmployeeInterestViewModel employeeInterestViewModel);
        Task<IEnumerable<EmployeeInterestViewModel>> GetEmployeeInterests(EmployeeInterestViewModel employeeInterestViewModel);
    }
}
