using GigHub.Core.Models;
using GigHub.Core.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace GigHub.Persistence.Repositories
{
    public class FollowingRepository : IFollowingRepository
    {
        private ApplicationDbContext context;

        public FollowingRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public Following GetFollowing(string userId, string artistId)
        {
            return context.Followings.SingleOrDefault(a => a.FolloweeId == artistId && a.FollowerId == userId);
        }

        public IEnumerable<ApplicationUser> GetFollowees(string userId)
        {
            return context.Followings
                            .Where(x => x.FollowerId == userId)
                            .Select(x => x.Followee)
                            .ToList();
        }

        public void Remove(Following following)
        {
            context.Followings.Remove(following);
        }

        public void Add(Following following)
        {
            context.Followings.Add(following);
        }
    }
}