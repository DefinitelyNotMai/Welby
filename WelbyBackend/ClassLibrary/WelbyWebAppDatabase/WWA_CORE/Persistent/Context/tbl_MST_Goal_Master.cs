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
    
    public partial class tbl_MST_Goal_Master
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tbl_MST_Goal_Master()
        {
            this.tbl_CMP_Goals = new HashSet<tbl_CMP_Goals>();
        }
    
        public int GoalId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Nullable<System.DateTime> DurationFrom { get; set; }
        public Nullable<System.DateTime> DurationTo { get; set; }
        public bool Active { get; set; }
        public int Encoded_By { get; set; }
        public System.DateTime Encoded_Date { get; set; }
        public Nullable<int> LastChanged_By { get; set; }
        public Nullable<System.DateTime> LastChanged_Date { get; set; }
        public string Computer_Name { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbl_CMP_Goals> tbl_CMP_Goals { get; set; }
    }
}