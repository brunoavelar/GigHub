using FluentAssertions;
using GigHub.Core.Models;
using GigHub.Persistence;
using GigHub.Persistence.Repositories;
using GigHub.Tests.Extensions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Data.Entity;

namespace GigHub.Tests.Persistence.Repository
{
    [TestClass]
    public class NotificationRepositoryTests
    {
        private NotificationRepository repository;
        private Mock<DbSet<UserNotification>> notificationsMock;

        [TestInitialize]
        public void TestInitialize()
        {
            notificationsMock = new Mock<DbSet<UserNotification>>();

            var context = new Mock<IApplicationDbContext>();
            context.Setup(c => c.UserNotifications).Returns(notificationsMock.Object);

            repository = new NotificationRepository(context.Object);
        }

        [TestMethod]
        public void GetNewNotificationsFor_NotificationIsRead_ShouldNotBeReturned()
        {
            var notification = Notification.GigCanceled(new Gig());
            var user = new ApplicationUser { Id = "1" };
            var userNotification = new UserNotification(user, notification);
            userNotification.Read();

            notificationsMock.SetSource(new[] { userNotification });

            var notifications = repository.GetNewNotificationsFor(user.Id);

            notifications.Should().BeEmpty();
        }

        [TestMethod]
        public void GetNewNotificationsFor_NotificationIsForADifferentUser_ShouldNotBeReturned()
        {
            var notification = Notification.GigCanceled(new Gig());
            var user = new ApplicationUser { Id = "1" };
            var userNotification = new UserNotification(user, notification);

            notificationsMock.SetSource(new[] { userNotification });

            var notifications = repository.GetNewNotificationsFor(user.Id + "-");

            notifications.Should().BeEmpty();
        }

        [TestMethod]
        public void GetNewNotificationsFor_NewNotificationForTheGivenUser_ShouldBeReturned()
        {
            var notification = Notification.GigCanceled(new Gig());
            var user = new ApplicationUser { Id = "1" };
            var userNotification = new UserNotification(user, notification);

            notificationsMock.SetSource(new[] { userNotification });

            var notifications = repository.GetNewNotificationsFor(user.Id);

            notifications.Should().BeEmpty();
        }
    }
}
