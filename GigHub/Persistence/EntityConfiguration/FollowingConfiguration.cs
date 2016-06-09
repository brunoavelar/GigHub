using GigHub.Core.Models;
using System.Data.Entity.ModelConfiguration;

namespace GigHub.Persistence.EntityConfiguration
{
    public class Followingfiguration : EntityTypeConfiguration<Following>
    {
        public Followingfiguration()
        {
            HasKey(f => new { f.FollowerId, f.FolloweeId });
        }
    }
}