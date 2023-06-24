//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class tbl_REG_Employee_Registration
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tbl_REG_Employee_Registration()
        {
            this.tbl_EMP_Interest = new HashSet<tbl_EMP_Interest>();
            this.tbl_EMP_Learned_Behaviors = new HashSet<tbl_EMP_Learned_Behaviors>();
            this.tbl_EMP_Realized_Strengths = new HashSet<tbl_EMP_Realized_Strengths>();
            this.tbl_EMP_Unrealized_Strengths = new HashSet<tbl_EMP_Unrealized_Strengths>();
            this.tbl_EMP_Weakness = new HashSet<tbl_EMP_Weakness>();
        }
    
        public int EmployeeId { get; set; }
        public string First_Name { get; set; }
        public string Middle_Name { get; set; }
        public string Last_Name { get; set; }
        public string Nickname { get; set; }
        public string Email { get; set; }
        public string Phone_Number { get; set; }
        public string Address { get; set; }
        public Nullable<System.DateTime> Birthday { get; set; }
        public string Linkedin { get; set; }
        public string Facebook { get; set; }
        public string Instagram { get; set; }
        public string TikTok { get; set; }
        public string Work { get; set; }
        public string Connect { get; set; }
        public string Support { get; set; }
        public string Other_Notes { get; set; }
        public string ProfilePhoto { get; set; }
        public Nullable<int> GenderId { get; set; }
        public int CompanyId { get; set; }
        public Nullable<int> CountryId { get; set; }
        public bool Active { get; set; }
        public int Encoded_By { get; set; }
        public System.DateTime Encoded_Date { get; set; }
        public Nullable<int> LastChanged_By { get; set; }
        public Nullable<System.DateTime> LastChanged_Date { get; set; }
        public string Computer_Name { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbl_EMP_Interest> tbl_EMP_Interest { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbl_EMP_Learned_Behaviors> tbl_EMP_Learned_Behaviors { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbl_EMP_Realized_Strengths> tbl_EMP_Realized_Strengths { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbl_EMP_Unrealized_Strengths> tbl_EMP_Unrealized_Strengths { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbl_EMP_Weakness> tbl_EMP_Weakness { get; set; }
        public virtual tbl_MST_Company tbl_MST_Company { get; set; }
        public virtual tbl_MST_Country_Master tbl_MST_Country_Master { get; set; }
        public virtual tbl_MST_Gender_Master tbl_MST_Gender_Master { get; set; }
    }
}