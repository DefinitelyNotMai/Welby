using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WWA_CORE.Utilities
{
    public interface IQueryObject
    {
        string SortBy { get; set; }
        bool IsSortAscending { get; set; }
        bool IsApplyPaging { get; set; }
        bool IsCountOnly { get; set; }

        int Page { get; set; }
        int PageSize { get; set; }
        int PageCount { get; set; }
        int TotalItems { get; set; }
    }
}
