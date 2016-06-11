using FluentAssertions;
using GigHub.Core.Models;
using GigHub.Persistence;
using GigHub.Persistence.Repositories;
using GigHub.Tests.Extensions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Data.Entity;

namespace GigHub.Tests.Persistence.Repository
{
    [TestClass]
    public class GigRepositoryTests
    {
        private GigRepository repository;
        private Mock<DbSet<Gig>> gigsMock;
        private Mock<DbSet<Attendance>> attendancesMock;

        [TestInitialize]
        public void TestInitialize()
        {
            gigsMock = new Mock<DbSet<Gig>>();
            attendancesMock = new Mock<DbSet<Attendance>>();

            var context = new Mock<IApplicationDbContext>();
            context.SetupGet(c => c.Gigs).Returns(gigsMock.Object);
            context.SetupGet(c => c.Attendances).Returns(attendancesMock.Object);

            repository = new GigRepository(context.Object);
        }

        [TestMethod]
        public void GetUpcomingGigsByArtist_GigIsInThePast_ShouldNotBeReturned()
        {
            var gig = new Gig { Datetime = DateTime.Now.AddDays(-1), ArtistId = "1" };
            gigsMock.SetSource(new[] { gig });

            var gigs = repository.GetUpcomingGigsByArtist("1");
            gigs.Should().BeEmpty();
        }

        [TestMethod]
        public void GetUpcomingGigsByArtist_GigIsCanceled_ShouldNotBeReturned()
        {
            var gig = new Gig { Datetime = DateTime.Now.AddDays(1), ArtistId = "1" };
            gig.Cancell();
            gigsMock.SetSource(new[] { gig });

            var gigs = repository.GetUpcomingGigsByArtist("1");
            gigs.Should().BeEmpty();
        }

        [TestMethod]
        public void GetUpcomingGigsByArtist_GigIsForADiferentArtist_ShouldNotBeReturned()
        {
            var gig = new Gig { Datetime = DateTime.Now.AddDays(1), ArtistId = "1" };
            gigsMock.SetSource(new[] { gig });

            var gigs = repository.GetUpcomingGigsByArtist(gig.ArtistId + "-");
            gigs.Should().BeEmpty();
        }

        [TestMethod]
        public void GetUpcomingGigsByArtist_GigIsForTheGivenArtistAndIsInTheFurure_ShouldReturn()
        {
            var gig = new Gig { Datetime = DateTime.Now.AddDays(1), ArtistId = "1" };
            gigsMock.SetSource(new[] { gig });

            var gigs = repository.GetUpcomingGigsByArtist(gig.ArtistId);
            gigs.Should().Contain(gig);
        }

        [TestMethod]
        public void GetGigsUserAttending_GigIsInThePast_ShouldNotBeReturned()
        {
            string userId = "1";
            var gig = new Gig { Datetime = DateTime.Now.AddDays(-1) };
            var attendance = new Attendance() { Gig = gig, AttendeeId = userId };
            attendancesMock.SetSource(new[] { attendance });

            var gigs = repository.GetGigsUserAttending(userId);
            gigs.Should().BeEmpty();
        }

        [TestMethod]
        public void GetGigsUserAttending_GigIsCanceled_ShouldNotBeReturned()
        {
            string userId = "1";
            var gig = new Gig { Datetime = DateTime.Now.AddDays(1) };
            gig.Cancell();
            var attendance = new Attendance() { Gig = gig, AttendeeId = userId };

            attendancesMock.SetSource(new[] { attendance });


            var gigs = repository.GetGigsUserAttending(userId);
            gigs.Should().BeEmpty();
        }

        [TestMethod]
        public void GetGigsUserAttending_UserIsNotAttendingToAnyGig_ShouldNotBeReturned()
        {
            string userId = "1";
            var gig = new Gig { Datetime = DateTime.Now.AddDays(1) };
            var attendance = new Attendance() { Gig = gig, AttendeeId = userId };

            attendancesMock.SetSource(new[] { attendance });


            var gigs = repository.GetGigsUserAttending(userId + "-");
            gigs.Should().BeEmpty();
        }

        [TestMethod]
        public void GetGigsUserAttending_UserIsAttendingToTheGigAndIsInTheFuture_ShouldReturn()
        {
            string userId = "1";
            var gig = new Gig { Datetime = DateTime.Now.AddDays(1) };
            var attendance = new Attendance() { Gig = gig, AttendeeId = userId };

            attendancesMock.SetSource(new[] { attendance });


            var gigs = repository.GetGigsUserAttending(userId);
            gigs.Should().Contain(gig);
        }
    }
}
