using GigHub.Core.Models;
using System.Collections.Generic;

namespace GigHub.Core.Repositories
{
    public interface IFollowingRepository
    {
        Following GetFollowing(string userId, string artistId);
        IEnumerable<ApplicationUser> GetFollowees(string userId);
        void Remove(Following following);
        void Add(Following following);
    }
}