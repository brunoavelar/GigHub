using GigHub.Core.Models;
using GigHub.Core.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace GigHub.Persistence.Repositories
{
    public class UserNotificationRepository : IUserNotificationRepository
    {
        private readonly ApplicationDbContext context;

        public UserNotificationRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public IEnumerable<UserNotification> GetUserNotificationsFor(string userId)
        {
            return context.UserNotifications
                .Where(un => un.UserId == userId && !un.IsRead)
                .ToList();
        }
    }
}