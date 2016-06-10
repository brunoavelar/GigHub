using FluentAssertions;
using GigHub.Core.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;

namespace GigHub.Tests.Models
{
    [TestClass]
    public class GigTests
    {
        [TestMethod]
        public void Cancel_WhenCalled_ShouldSetIsCanceledToTrue()
        {
            var gig = new Gig();

            gig.Cancell();
            gig.IsCanceled.Should().BeTrue();
        }

        [TestMethod]
        public void Cancel_WhenCalled_EachAttendeeShouldHaveANotification()
        {
            var gig = new Gig();
            var user = new ApplicationUser { Id = "1" };
            var attendance = new Attendance { Attendee = user };
            gig.Attendances.Add(attendance);

            gig.Cancell();

            var attendees = gig.Attendances.Select(a => a.Attendee).ToList();
            attendees.FirstOrDefault().UserNotifications.Count().Should().Be(1);
        }
    }
}
