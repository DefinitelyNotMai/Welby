using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.ViewModel.Masters;

namespace WWA_CORE.Core.Repositories.Masters
{
    public interface IGoalMasterRepository
    {
        Task<GoalMasterViewModel> AddGoal(GoalMasterViewModel goalMasterViewModel);
        Task<GoalMasterViewModel> UpdateGoal(GoalMasterViewModel goalMasterViewModel);
        Task<GoalMasterViewModel> RemoveGoal(GoalMasterViewModel goalMasterViewModel);
        Task<GoalMasterViewModel> ReturnGoal(GoalMasterViewModel goalMasterViewModel); 
        Task<IEnumerable<GoalMasterViewModel>> GetGoalByTitleDescription(GoalMasterViewModel goalMasterViewModel);
        Task<IEnumerable<GoalMasterViewModel>> GetGoals(GoalMasterViewModel goalMasterViewModel);
    }
}
