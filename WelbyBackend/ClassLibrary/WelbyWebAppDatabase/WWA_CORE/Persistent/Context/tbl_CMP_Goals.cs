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
    
    public partial class tbl_CMP_Goals
    {
        public int CompanyGoalsId { get; set; }
        public int CompanyId { get; set; }
        public int GoalId { get; set; }
        public bool Active { get; set; }
        public int Encoded_By { get; set; }
        public System.DateTime Encoded_Date { get; set; }
        public Nullable<int> LastChanged_By { get; set; }
        public Nullable<System.DateTime> LastChanged_Date { get; set; }
        public string Computer_Name { get; set; }
    
        public virtual tbl_MST_Company tbl_MST_Company { get; set; }
        public virtual tbl_MST_Goal_Master tbl_MST_Goal_Master { get; set; }
    }
}
