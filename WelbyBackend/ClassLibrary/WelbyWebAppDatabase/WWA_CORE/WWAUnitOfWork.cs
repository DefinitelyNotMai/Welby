using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Core.Repositories;
using WWA_CORE.Core.Repositories.Algo;
using WWA_CORE.Core.Repositories.Employee;
using WWA_CORE.Core.Repositories.Masters;
using WWA_CORE.Core.Repositories.Registration;
using WWA_CORE.Persistent.Context;
using WWA_CORE.Persistent.Service.Algo;
using WWA_CORE.Persistent.Service.Employee;
using WWA_CORE.Persistent.Service.Masters;
using WWA_CORE.Persistent.Service.Registration;
using WWA_CORE.Utilities;

namespace WWA_CORE
{
    public class WWAUnitOfWork : IWWAUnitOfWork
    {
        private readonly WWAEntities WWAContext;
        private DbContextTransaction _transaction;

        public ICompanyMasterRepository Company { get; private set; }
        public ICountryMasterRepository Country { get; private set; }
        public IGenderMasterRepository Gender { get; private set; }
        public IGoalMasterRepository Goal { get; private set; }
        public IIndustryTypeMasterRepository IndustryType { get; private set; }
        public IInterestMasterRepository Interest { get; private set; }
        public IStrengthMasterRepository Strength { get; private set; }
        public IValueMasterRepository Value { get; private set; }
        public IEmployeeRegistrationRepository Employee { get; private set; }
        public IEmployeeInterestRepository EmployeeInterest { get; private set; }
        public IEmployeeLearnedBehaviorsRepository EmployeeLearnedBehaviors { get; private set; }
        public IEmployeeRealizedStrengthsRepository EmployeeRealizedStrengths { get; private set; }
        public IEmployeeUnrealizedStrengthsRepository EmployeeUnrealizedStrengths { get; private set; }
        public IEmployeeWeaknessRepository EmployeeWeakness { get; private set; }
        public IDailyCheckInRepository DailyCheckIn { get; private set; }
        public ITiseRepository Tise { get; private set; }
        public IResultsRepository Results { get; private set; }
        public GlobalFunctions GlobalFunctions { get; set; }
        public DbContextTransaction Transaction
        {
            get { return _transaction; }
        }

        public WWAUnitOfWork()
        {
            WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING = ConfigurationManager.ConnectionStrings["WWAConnection"].ToString();
            
            this.GlobalFunctions = new GlobalFunctions();
            this.WWAContext = new WWAEntities();

            this.Company = new CompanyMasterService();
            this.Country = new CountryMasterService();
            this.Gender = new GenderMasterService();
            this.Goal = new GoalMasterService();
            this.IndustryType = new IndustryTypeMasterService();
            this.Interest = new InterestMasterService();
            this.Strength = new StrengthMasterService();
            this.Value = new ValueMasterService();
            this.Employee = new EmployeeRegistrationService();
            this.EmployeeInterest = new EmployeeInterestService();
            this.EmployeeLearnedBehaviors = new EmployeeLearnedBehaviorsService();
            this.EmployeeRealizedStrengths = new EmployeeRealizedStrengthsService();
            this.EmployeeUnrealizedStrengths = new EmployeeUnrealizedStrengthsService();
            this.EmployeeWeakness = new EmployeeWeaknessService();
            this.DailyCheckIn = new DailyCheckInService();
            this.Tise = new TiseService();
            this.Results = new ResultsService();
        }

        public void BeginTransaction()
        {
            _transaction = WWAContext.Database.BeginTransaction();
        }
        public void RollBackTransaction()
        {
            _transaction.Rollback();
            _transaction.Dispose();
        }
        public void CommitTransaction()
        {
            _transaction.Commit();
            _transaction.Dispose();
        }

        public int Complete()
        {
            return WWAContext.SaveChanges();
        }
        public async Task<int> SaveAsync()
        {
            return await WWAContext.SaveChangesAsync();
        }
        public async Task<int> SaveThenCommitAsync()
        {
            int result = await WWAContext.SaveChangesAsync();

            CommitTransaction();

            return result;
        }

        public void Dispose()
        {
            WWAContext.Dispose();
        }
        public bool HasChanges()
        {
            return WWAContext.ChangeTracker.HasChanges();
        }
        public void CancelUncommitedChanges()
        {
            foreach (var entry in WWAContext.ChangeTracker.Entries())
            {
                switch (entry.State)
                {
                    case EntityState.Modified:
                    case EntityState.Deleted:
                        entry.State = EntityState.Modified;
                        entry.State = EntityState.Unchanged;
                        break;
                    case EntityState.Added:
                        entry.State = EntityState.Detached;
                        break;
                }
            }
        }
    }
}
