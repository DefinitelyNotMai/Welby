﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Utilities;

namespace WWA_CORE.Persistent.Resource.Algo
{
    public class DailyCheckInResource : CommonSchema
    {
        public string CompanyName { get; set; }
        public string EmployeeName { get; set; }

    }
}