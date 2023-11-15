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
        Task<ResultsViewModel> AddResults(ResultsViewModel resultsViewModel);
        Task<ResultsViewModel> UpdateResults(ResultsViewModel resultsViewModel);
        Task<ResultsViewModel> RemoveResults(ResultsViewModel resultsViewModel);
        Task<ResultsViewModel> ReturnResult(ResultsViewModel resultsViewModel);
        Task<IEnumerable<ResultsViewModel>> GetResult(ResultsViewModel resultsViewModel);
    }
}
