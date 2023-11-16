using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Core.Repositories.Algo;
using WWA_CORE.Core.Repositories.Company;
using WWA_CORE.Core.Repositories.Employee;
using WWA_CORE.Core.Repositories.Masters;
using WWA_CORE.Core.Repositories.Registration;
using WWA_CORE.Utilities;

namespace WWA_CORE.Core.Repositories
{
    public interface IWWAUnitOfWork : IDisposable
    {
        ICityMasterRepository City { get; }
        ICompanyMasterRepository Company { get; }
        ICountryMasterRepository Country { get; }
        IGenderMasterRepository Gender { get; }
        IGoalMasterRepository Goal { get; }
        IIndustryTypeMasterRepository IndustryType { get; }
        IInterestMasterRepository Interest { get; }
        IStrengthMasterRepository Strength { get; }
        IValueMasterRepository Value { get; }
        IEmployeeRegistrationRepository Employee { get; }
        IEmployeeInterestRepository EmployeeInterest { get; }
        IEmployeeLearnedBehaviorsRepository EmployeeLearnedBehaviors { get; }
        IEmployeeRealizedStrengthsRepository EmployeeRealizedStrengths { get; }
        IEmployeeUnrealizedStrengthsRepository EmployeeUnrealizedStrengths { get; }
        IEmployeeWeaknessRepository EmployeeWeakness { get; }
        ICompanyGoalsRepository CompanyGoals { get; }
        ICompanyValuesRepository CompanyValues { get; }
        IDailyCheckInRepository DailyCheckIn { get; }
        ITiseRepository Tise { get; }
        IResultsRepository Results { get; }

        GlobalFunctions GlobalFunctions { get; set; }
        DbContextTransaction Transaction { get; }

        void BeginTransaction();
        void RollBackTransaction();
        void CommitTransaction();
        int Complete();
        Task<int> SaveAsync();
        Task<int> SaveThenCommitAsync();
        void CancelUncommitedChanges();
        bool HasChanges();
    }
}
