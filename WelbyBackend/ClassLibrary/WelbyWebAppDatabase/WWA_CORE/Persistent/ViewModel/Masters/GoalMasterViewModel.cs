﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Utilities;

namespace WWA_CORE.Persistent.ViewModel.Masters
{
    public class GoalMasterViewModel : CommonSchema
    {
        public int GoalId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? DurationFrom { get; set; }
        public DateTime? DurationTo { get; set; }
    }
}
