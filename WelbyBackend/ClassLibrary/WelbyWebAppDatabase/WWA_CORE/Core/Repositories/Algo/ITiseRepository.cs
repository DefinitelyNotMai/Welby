using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.ViewModel.Algo;

namespace WWA_CORE.Core.Repositories.Algo
{
    public interface ITiseRepository
    {
        Task<TiseViewModel> AddTise(TiseViewModel tiseViewModel);
        Task<TiseViewModel> UpdateTise(TiseViewModel tiseViewModel);
        Task<TiseViewModel> RemoveTise(TiseViewModel tiseViewModel);
        Task<TiseViewModel> ReturnTise(TiseViewModel tiseViewModel);
        Task<IEnumerable<TiseViewModel>> GetTise(TiseViewModel tiseViewModel);
    }
}
