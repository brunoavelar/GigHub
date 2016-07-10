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
    public class AttendanceRepositoryTests
    {
        private AttendanceRepository repository;
        private Mock<DbSet<Attendance>> attendanceMock;

        [TestInitialize]
        public void TestInitialize()
        {
            attendanceMock = new Mock<DbSet<Attendance>>();

            var context = new Mock<IApplicationDbContext>();
            context.Setup(c => c.Attendances).Returns(attendanceMock.Object);

            repository = new AttendanceRepository(context.Object);
        }

        [TestMethod]
        public void GetFutureAttendances_GigInThePast_ShouldNotBeReturned()
        {
            var gig = new Gig() { Id = 1, Datetime = DateTime.Now.AddDays(-1) };
            var user = new ApplicationUser { Id = "1" };
            var attendance = new Attendance() { Gig = gig, GigId = gig.Id, AttendeeId = user.Id };

            attendanceMock.SetSource(new[] { attendance });

            var attendances = repository.GetFutureAttendances(user.Id);

            attendances.Should().BeEmpty();
        }

        [TestMethod]
        public void GetFutureAttendances_AttendanceOfAnotherUser_ShouldNotBeReturned()
        {
            var gig = new Gig() { Id = 1, Datetime = DateTime.Now.AddDays(1) };
            var user = new ApplicationUser { Id = "1" };
            var attendance = new Attendance() { Gig = gig, GigId = gig.Id, AttendeeId = user.Id };

            attendanceMock.SetSource(new[] { attendance });

            var attendances = repository.GetFutureAttendances("2");

            attendances.Should().BeEmpty();
        }

        [TestMethod]
        public void GetFutureAttendances_GigInTheFuture_ShouldBeReturned()
        {
            var gig = new Gig() { Id = 1, Datetime = DateTime.Now.AddDays(1) };
            var user = new ApplicationUser { Id = "1" };
            var attendance = new Attendance() { Gig = gig, GigId = gig.Id, AttendeeId = user.Id };

            attendanceMock.SetSource(new[] { attendance });

            var attendances = repository.GetFutureAttendances(user.Id);

            attendances.Should().Contain(attendance);
        }

        [TestMethod]
        public void GetAttendance_AttendanceOfAnotherUser_ShouldNotBeReturned()
        {
            var gig = new Gig() { Id = 1, Datetime = DateTime.Now.AddDays(1) };
            var user = new ApplicationUser { Id = "1" };
            var attendance = new Attendance() { Gig = gig, GigId = gig.Id, AttendeeId = user.Id };

            attendanceMock.SetSource(new[] { attendance });

            var attendanceFomRepository = repository.GetAttendance("2", gig.Id);

            attendanceFomRepository.Should().BeNull();
        }

        [TestMethod]
        public void GetAttendance_AttendanceOfAnotherGig_ShouldNotBeReturned()
        {
            var gig = new Gig() { Id = 1, Datetime = DateTime.Now.AddDays(1) };
            var user = new ApplicationUser { Id = "1" };
            var attendance = new Attendance() { Gig = gig, GigId = gig.Id, AttendeeId = user.Id };

            attendanceMock.SetSource(new[] { attendance });

            var attendanceFomRepository = repository.GetAttendance(user.Id, 2);

            attendanceFomRepository.Should().BeNull();
        }

        [TestMethod]
        public void GetAttendance_ValidGigAndUser_ShouldReturn()
        {
            var gig = new Gig() { Id = 1, Datetime = DateTime.Now.AddDays(1) };
            var user = new ApplicationUser { Id = "1" };
            var attendance = new Attendance() { Gig = gig, GigId = gig.Id, AttendeeId = user.Id };

            attendanceMock.SetSource(new[] { attendance });

            var attendanceFomRepository = repository.GetAttendance(user.Id, gig.Id);

            attendanceFomRepository.Should().BeSameAs(attendance);
        }

    }
}
