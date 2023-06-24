﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.Resource.Employee;

namespace WWA_CORE.Persistent.ViewModel.Employee
{
    public class EmployeeUnrealizedStrengthsViewModel : EmployeeUnrealizedStrengthsResource
    {
        public int EmployeeId { get; set; }
        public int StrengthId { get; set; }
        public int UnrealizedStrengthsId { get; set; }

    }
}