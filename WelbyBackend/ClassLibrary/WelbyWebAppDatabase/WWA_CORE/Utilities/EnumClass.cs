using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WWA_CORE.Utilities
{
    public class EnumClass
    {
        public enum StrengthCategory
        {
            THINKING = 1,
            BEING = 2,
            COMMUNICATING = 3,
            MOTIVATING = 4,
            RELATING = 5
        }
        public enum AccountAccessTransaction
        {
            CREATE = 1,
            UPDATE = 2,
            REMOVE_ACCESS = 3,
            RETURNED_ACCESS = 4,
        }
        public enum LogTransaction
        {
            LOG_IN_SUCCESS = 1,
            LOG_IN_FAIL = 2,
            LOG_OUT_SUCCESS = 3,

        }
    }
}
