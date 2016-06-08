using GigHub.Core;
using GigHub.Core.Repositories;
using GigHub.Persistence.Repositories;

namespace GigHub.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext context;

        public IGigRepository Gigs { get; private set; }
        public IAttendanceRepository Attendances { get; private set; }
        public IGenreRepository Genres { get; private set; }
        public IFollowingRepository Followings { get; private set; }
        public INotificationRepository Notifications { get; private set; }
        public IUserNotificationRepository UserNotifications { get; private set; }


        public UnitOfWork(ApplicationDbContext context)
        {
            this.context = context;
            Gigs = new GigRepository(context);
            Attendances = new AttendanceRepository(context);
            Genres = new GenreRepository(context);
            Followings = new FollowingRepository(context);
            Notifications = new NotificationRepository(context);
            UserNotifications = new UserNotificationRepository(context);
        }

        public void Complete()
        {
            context.SaveChanges();
        }
    }
}