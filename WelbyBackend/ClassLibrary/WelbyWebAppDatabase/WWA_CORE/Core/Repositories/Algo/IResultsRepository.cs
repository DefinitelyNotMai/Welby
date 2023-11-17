using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.ViewModel.Algo;

namespace WWA_CORE.Core.Repositories.Algo
{
    public interface IResultsRepository
    {
        Task<ResultsViewModel> AddResult(ResultsViewModel resultsViewModel);
        Task<ResultsViewModel> UpdateResult(ResultsViewModel resultsViewModel);
        Task<ResultsViewModel> RemoveResult(ResultsViewModel resultsViewModel);
        Task<ResultsViewModel> ReturnResult(ResultsViewModel resultsViewModel);
        Task<IEnumerable<ResultsViewModel>> GetResult(ResultsViewModel resultsViewModel);
    }
}
