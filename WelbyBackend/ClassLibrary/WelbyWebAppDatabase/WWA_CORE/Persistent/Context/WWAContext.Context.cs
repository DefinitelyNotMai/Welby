﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WWA_CORE.Persistent.Context
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class WWAEntities : DbContext
    {
        public WWAEntities()
            : base("name=WWAEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<tbl_CMP_Goals> tbl_CMP_Goals { get; set; }
        public virtual DbSet<tbl_CMP_Values> tbl_CMP_Values { get; set; }
        public virtual DbSet<tbl_EMP_Interest> tbl_EMP_Interest { get; set; }
        public virtual DbSet<tbl_EMP_Learned_Behaviors> tbl_EMP_Learned_Behaviors { get; set; }
        public virtual DbSet<tbl_EMP_Realized_Strengths> tbl_EMP_Realized_Strengths { get; set; }
        public virtual DbSet<tbl_EMP_Unrealized_Strengths> tbl_EMP_Unrealized_Strengths { get; set; }
        public virtual DbSet<tbl_EMP_Weakness> tbl_EMP_Weakness { get; set; }
        public virtual DbSet<tbl_MST_City_Master> tbl_MST_City_Master { get; set; }
        public virtual DbSet<tbl_MST_Company> tbl_MST_Company { get; set; }
        public virtual DbSet<tbl_MST_Country_Master> tbl_MST_Country_Master { get; set; }
        public virtual DbSet<tbl_MST_Gender_Master> tbl_MST_Gender_Master { get; set; }
        public virtual DbSet<tbl_MST_Goal_Master> tbl_MST_Goal_Master { get; set; }
        public virtual DbSet<tbl_MST_IndustryType_Master> tbl_MST_IndustryType_Master { get; set; }
        public virtual DbSet<tbl_MST_Interest_Master> tbl_MST_Interest_Master { get; set; }
        public virtual DbSet<tbl_MST_Strength_Master> tbl_MST_Strength_Master { get; set; }
        public virtual DbSet<tbl_MST_Value_Master> tbl_MST_Value_Master { get; set; }
        public virtual DbSet<tbl_REG_Employee_Registration> tbl_REG_Employee_Registration { get; set; }
    
        public virtual int procWWA_CMP_Goals_Get(Nullable<int> companyGoalsId, Nullable<int> companyId, Nullable<bool> active)
        {
            var companyGoalsIdParameter = companyGoalsId.HasValue ?
                new ObjectParameter("CompanyGoalsId", companyGoalsId) :
                new ObjectParameter("CompanyGoalsId", typeof(int));
    
            var companyIdParameter = companyId.HasValue ?
                new ObjectParameter("CompanyId", companyId) :
                new ObjectParameter("CompanyId", typeof(int));
    
            var activeParameter = active.HasValue ?
                new ObjectParameter("Active", active) :
                new ObjectParameter("Active", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("procWWA_CMP_Goals_Get", companyGoalsIdParameter, companyIdParameter, activeParameter);
        }
    
        public virtual int procWWA_CMP_Values_Get(Nullable<int> companyValuesId, Nullable<int> companyId, Nullable<bool> active)
        {
            var companyValuesIdParameter = companyValuesId.HasValue ?
                new ObjectParameter("CompanyValuesId", companyValuesId) :
                new ObjectParameter("CompanyValuesId", typeof(int));
    
            var companyIdParameter = companyId.HasValue ?
                new ObjectParameter("CompanyId", companyId) :
                new ObjectParameter("CompanyId", typeof(int));
    
            var activeParameter = active.HasValue ?
                new ObjectParameter("Active", active) :
                new ObjectParameter("Active", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("procWWA_CMP_Values_Get", companyValuesIdParameter, companyIdParameter, activeParameter);
        }
    
        public virtual int procWWA_EMP_Interest_Get(Nullable<int> employeeInterestId, Nullable<bool> active)
        {
            var employeeInterestIdParameter = employeeInterestId.HasValue ?
                new ObjectParameter("EmployeeInterestId", employeeInterestId) :
                new ObjectParameter("EmployeeInterestId", typeof(int));
    
            var activeParameter = active.HasValue ?
                new ObjectParameter("Active", active) :
                new ObjectParameter("Active", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("procWWA_EMP_Interest_Get", employeeInterestIdParameter, activeParameter);
        }
    
        public virtual int procWWA_EMP_Learned_Behaviors_Get(Nullable<int> learnedBehaviorsId, Nullable<int> employeeId, Nullable<bool> active)
        {
            var learnedBehaviorsIdParameter = learnedBehaviorsId.HasValue ?
                new ObjectParameter("LearnedBehaviorsId", learnedBehaviorsId) :
                new ObjectParameter("LearnedBehaviorsId", typeof(int));
    
            var employeeIdParameter = employeeId.HasValue ?
                new ObjectParameter("EmployeeId", employeeId) :
                new ObjectParameter("EmployeeId", typeof(int));
    
            var activeParameter = active.HasValue ?
                new ObjectParameter("Active", active) :
                new ObjectParameter("Active", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("procWWA_EMP_Learned_Behaviors_Get", learnedBehaviorsIdParameter, employeeIdParameter, activeParameter);
        }
    
        public virtual int procWWA_EMP_Realized_Strengths_Get(Nullable<int> realizedStrengthsId, Nullable<int> employeeId, Nullable<bool> active)
        {
            var realizedStrengthsIdParameter = realizedStrengthsId.HasValue ?
                new ObjectParameter("RealizedStrengthsId", realizedStrengthsId) :
                new ObjectParameter("RealizedStrengthsId", typeof(int));
    
            var employeeIdParameter = employeeId.HasValue ?
                new ObjectParameter("EmployeeId", employeeId) :
                new ObjectParameter("EmployeeId", typeof(int));
    
            var activeParameter = active.HasValue ?
                new ObjectParameter("Active", active) :
                new ObjectParameter("Active", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("procWWA_EMP_Realized_Strengths_Get", realizedStrengthsIdParameter, employeeIdParameter, activeParameter);
        }
    
        public virtual int procWWA_EMP_Unrealized_Strengths_Get(Nullable<int> unrealizedStrengthsId, Nullable<int> employeeId, Nullable<bool> active)
        {
            var unrealizedStrengthsIdParameter = unrealizedStrengthsId.HasValue ?
                new ObjectParameter("UnrealizedStrengthsId", unrealizedStrengthsId) :
                new ObjectParameter("UnrealizedStrengthsId", typeof(int));
    
            var employeeIdParameter = employeeId.HasValue ?
                new ObjectParameter("EmployeeId", employeeId) :
                new ObjectParameter("EmployeeId", typeof(int));
    
            var activeParameter = active.HasValue ?
                new ObjectParameter("Active", active) :
                new ObjectParameter("Active", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("procWWA_EMP_Unrealized_Strengths_Get", unrealizedStrengthsIdParameter, employeeIdParameter, activeParameter);
        }
    
        public virtual int procWWA_EMP_Weakness_Get(Nullable<int> employeeWeaknessId, Nullable<int> employeeId, Nullable<bool> active)
        {
            var employeeWeaknessIdParameter = employeeWeaknessId.HasValue ?
                new ObjectParameter("EmployeeWeaknessId", employeeWeaknessId) :
                new ObjectParameter("EmployeeWeaknessId", typeof(int));
    
            var employeeIdParameter = employeeId.HasValue ?
                new ObjectParameter("EmployeeId", employeeId) :
                new ObjectParameter("EmployeeId", typeof(int));
    
            var activeParameter = active.HasValue ?
                new ObjectParameter("Active", active) :
                new ObjectParameter("Active", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("procWWA_EMP_Weakness_Get", employeeWeaknessIdParameter, employeeIdParameter, activeParameter);
        }
    
        public virtual int procWWA_MST_City_Master_Get(Nullable<int> cityId, Nullable<int> countryId, Nullable<bool> active)
        {
            var cityIdParameter = cityId.HasValue ?
                new ObjectParameter("CityId", cityId) :
                new ObjectParameter("CityId", typeof(int));
    
            var countryIdParameter = countryId.HasValue ?
                new ObjectParameter("CountryId", countryId) :
                new ObjectParameter("CountryId", typeof(int));
    
            var activeParameter = active.HasValue ?
                new ObjectParameter("Active", active) :
                new ObjectParameter("Active", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("procWWA_MST_City_Master_Get", cityIdParameter, countryIdParameter, activeParameter);
        }
    
        public virtual int procWWA_MST_Company_Master_Get(Nullable<int> companyId, Nullable<int> countryId, Nullable<int> industryTypeId, Nullable<bool> active)
        {
            var companyIdParameter = companyId.HasValue ?
                new ObjectParameter("CompanyId", companyId) :
                new ObjectParameter("CompanyId", typeof(int));
    
            var countryIdParameter = countryId.HasValue ?
                new ObjectParameter("CountryId", countryId) :
                new ObjectParameter("CountryId", typeof(int));
    
            var industryTypeIdParameter = industryTypeId.HasValue ?
                new ObjectParameter("IndustryTypeId", industryTypeId) :
                new ObjectParameter("IndustryTypeId", typeof(int));
    
            var activeParameter = active.HasValue ?
                new ObjectParameter("Active", active) :
                new ObjectParameter("Active", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("procWWA_MST_Company_Master_Get", companyIdParameter, countryIdParameter, industryTypeIdParameter, activeParameter);
        }
    
        public virtual int procWWA_MST_Company_Master_Login_Get(Nullable<int> companyId, string phone_Number, string email, Nullable<bool> active)
        {
            var companyIdParameter = companyId.HasValue ?
                new ObjectParameter("CompanyId", companyId) :
                new ObjectParameter("CompanyId", typeof(int));
    
            var phone_NumberParameter = phone_Number != null ?
                new ObjectParameter("Phone_Number", phone_Number) :
                new ObjectParameter("Phone_Number", typeof(string));
    
            var emailParameter = email != null ?
                new ObjectParameter("Email", email) :
                new ObjectParameter("Email", typeof(string));
    
            var activeParameter = active.HasValue ?
                new ObjectParameter("Active", active) :
                new ObjectParameter("Active", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("procWWA_MST_Company_Master_Login_Get", companyIdParameter, phone_NumberParameter, emailParameter, activeParameter);
        }
    
        public virtual int procWWA_MST_Country_Master_Get(Nullable<int> countryId, Nullable<bool> active)
        {
            var countryIdParameter = countryId.HasValue ?
                new ObjectParameter("CountryId", countryId) :
                new ObjectParameter("CountryId", typeof(int));
    
            var activeParameter = active.HasValue ?
                new ObjectParameter("Active", active) :
                new ObjectParameter("Active", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("procWWA_MST_Country_Master_Get", countryIdParameter, activeParameter);
        }
    
        public virtual int procWWA_MST_Gender_Master_Get(Nullable<int> genderId, Nullable<bool> biological, Nullable<bool> active)
        {
            var genderIdParameter = genderId.HasValue ?
                new ObjectParameter("GenderId", genderId) :
                new ObjectParameter("GenderId", typeof(int));
    
            var biologicalParameter = biological.HasValue ?
                new ObjectParameter("Biological", biological) :
                new ObjectParameter("Biological", typeof(bool));
    
            var activeParameter = active.HasValue ?
                new ObjectParameter("Active", active) :
                new ObjectParameter("Active", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("procWWA_MST_Gender_Master_Get", genderIdParameter, biologicalParameter, activeParameter);
        }
    
        public virtual int procWWA_MST_Goal_Master_Get(Nullable<int> goalId, Nullable<bool> active)
        {
            var goalIdParameter = goalId.HasValue ?
                new ObjectParameter("GoalId", goalId) :
                new ObjectParameter("GoalId", typeof(int));
    
            var activeParameter = active.HasValue ?
                new ObjectParameter("Active", active) :
                new ObjectParameter("Active", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("procWWA_MST_Goal_Master_Get", goalIdParameter, activeParameter);
        }
    
        public virtual int procWWA_MST_IndustryType_Master_Get(Nullable<int> industryTypeId, Nullable<bool> active)
        {
            var industryTypeIdParameter = industryTypeId.HasValue ?
                new ObjectParameter("IndustryTypeId", industryTypeId) :
                new ObjectParameter("IndustryTypeId", typeof(int));
    
            var activeParameter = active.HasValue ?
                new ObjectParameter("Active", active) :
                new ObjectParameter("Active", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("procWWA_MST_IndustryType_Master_Get", industryTypeIdParameter, activeParameter);
        }
    
        public virtual int procWWA_MST_Interest_Master_Get(Nullable<int> interestId, Nullable<bool> active)
        {
            var interestIdParameter = interestId.HasValue ?
                new ObjectParameter("InterestId", interestId) :
                new ObjectParameter("InterestId", typeof(int));
    
            var activeParameter = active.HasValue ?
                new ObjectParameter("Active", active) :
                new ObjectParameter("Active", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("procWWA_MST_Interest_Master_Get", interestIdParameter, activeParameter);
        }
    
        public virtual int procWWA_MST_Strength_Master_Get(Nullable<int> strengthId, Nullable<bool> active)
        {
            var strengthIdParameter = strengthId.HasValue ?
                new ObjectParameter("StrengthId", strengthId) :
                new ObjectParameter("StrengthId", typeof(int));
    
            var activeParameter = active.HasValue ?
                new ObjectParameter("Active", active) :
                new ObjectParameter("Active", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("procWWA_MST_Strength_Master_Get", strengthIdParameter, activeParameter);
        }
    
        public virtual int procWWA_MST_Value_Master_Get(Nullable<int> valueId, Nullable<bool> active)
        {
            var valueIdParameter = valueId.HasValue ?
                new ObjectParameter("ValueId", valueId) :
                new ObjectParameter("ValueId", typeof(int));
    
            var activeParameter = active.HasValue ?
                new ObjectParameter("Active", active) :
                new ObjectParameter("Active", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("procWWA_MST_Value_Master_Get", valueIdParameter, activeParameter);
        }
    
        public virtual int procWWA_REG_Employee_Get(Nullable<int> employeeId, Nullable<bool> active)
        {
            var employeeIdParameter = employeeId.HasValue ?
                new ObjectParameter("EmployeeId", employeeId) :
                new ObjectParameter("EmployeeId", typeof(int));
    
            var activeParameter = active.HasValue ?
                new ObjectParameter("Active", active) :
                new ObjectParameter("Active", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("procWWA_REG_Employee_Get", employeeIdParameter, activeParameter);
        }
    
        public virtual int procWWA_REG_Employee_Registration_Pagewise_Get(Nullable<int> employeeId, string phone_Number, string email, Nullable<int> pageNo, Nullable<int> pageSize, string dateFrom, string dateTo)
        {
            var employeeIdParameter = employeeId.HasValue ?
                new ObjectParameter("EmployeeId", employeeId) :
                new ObjectParameter("EmployeeId", typeof(int));
    
            var phone_NumberParameter = phone_Number != null ?
                new ObjectParameter("Phone_Number", phone_Number) :
                new ObjectParameter("Phone_Number", typeof(string));
    
            var emailParameter = email != null ?
                new ObjectParameter("Email", email) :
                new ObjectParameter("Email", typeof(string));
    
            var pageNoParameter = pageNo.HasValue ?
                new ObjectParameter("PageNo", pageNo) :
                new ObjectParameter("PageNo", typeof(int));
    
            var pageSizeParameter = pageSize.HasValue ?
                new ObjectParameter("PageSize", pageSize) :
                new ObjectParameter("PageSize", typeof(int));
    
            var dateFromParameter = dateFrom != null ?
                new ObjectParameter("DateFrom", dateFrom) :
                new ObjectParameter("DateFrom", typeof(string));
    
            var dateToParameter = dateTo != null ?
                new ObjectParameter("DateTo", dateTo) :
                new ObjectParameter("DateTo", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("procWWA_REG_Employee_Registration_Pagewise_Get", employeeIdParameter, phone_NumberParameter, emailParameter, pageNoParameter, pageSizeParameter, dateFromParameter, dateToParameter);
        }
    }
}
