using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.ViewModel.Algo;

namespace WWA_CORE.Core.Repositories.Algo
{
    public interface ITiseReport
    {
        Task<byte[]> CreateReport(TiseReportViewModel tiseReportViewModel);
    }
}
