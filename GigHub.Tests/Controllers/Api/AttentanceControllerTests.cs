using AutoMapper;
using FluentAssertions;
using GigHub.App_Start;
using GigHub.Controllers.Api;
using GigHub.Core;
using GigHub.Core.Dtos;
using GigHub.Core.Models;
using GigHub.Core.Repositories;
using GigHub.Tests.Extensions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Results;

namespace GigHub.Tests.Controllers.Api
{
    [TestClass]
    public class AttentanceControllerTests
    {
        private AttendancesController controller;
        private Mock<IAttendanceRepository> repository;
        private string userId;

        [TestInitialize]
        public void TestInitialize()
        {
            Mapper.Initialize(c => c.AddProfile(new MappingProfile()));

            repository = new Mock<IAttendanceRepository>();

            var mockUoW = new Mock<IUnitOfWork>();
            mockUoW.SetupGet(x => x.Attendances).Returns(repository.Object);

            userId = "1";

            controller = new AttendancesController(mockUoW.Object);
            controller.MockCurrentUser(userId, "user01@user.com");
        }

        [TestMethod]
        public void Attend_UserAttendingAGigForWhichHeHasAnAttendance_ShouldReturnBadRequest()
        {
            int gigId = 1;
            var attendance = new Attendance();

            repository.Setup(r => r.GetAttendance(userId, gigId)).Returns(attendance);

            var dto = new AttendanceDto
            {
                GigId = gigId
            };
            var result = controller.Attend(dto);
            result.Should().BeOfType<BadRequestErrorMessageResult>();

        }

        [TestMethod]
        public void Attend_WithValidRequest_ShouldReturnOk()
        {
            var dto = new AttendanceDto
            {
                GigId = 1
            };
            var result = controller.Attend(dto);
            result.Should().BeOfType<OkResult>();
        }

        [TestMethod]
        public void Delete_NoAttendanceWithGivenIdExists_ShouldReturnNotFound()
        {
            var result = controller.DeleteAttendance(1);
            result.Should().BeOfType<NotFoundResult>();
        }

        [TestMethod]
        public void Delete_WithValidRequest_ShouldReturnOk()
        {
            int gigId = 1;
            var attendance = new Attendance
            {
                GigId = gigId,
                AttendeeId = userId
            };

            repository.Setup(r => r.GetAttendance(userId, gigId)).Returns(attendance);

            var result = controller.DeleteAttendance(gigId);
            result.Should().BeOfType<OkResult>();
        }

        [TestMethod]
        public void Get_WithValidId_ShouldReturnAttendanceDto()
        {
            int gigId = 1;
            var attendance = new Attendance()
            {
                AttendeeId = userId,
                GigId = gigId
            };

            repository.Setup(x => x.GetAttendance(userId, gigId)).Returns(attendance);

            var result = controller.Get(gigId) as OkNegotiatedContentResult<AttendanceDto>;
            result.Content.GigId.Should().Be(gigId);
        }

        [TestMethod]
        public void Get_NoAttendanceWithGivenGigIdExists_ShouldReturnNotFound()
        {
            int gigId = 1;
            var attendance = new Attendance()
            {
                AttendeeId = userId,
                GigId = gigId
            };

            repository.Setup(x => x.GetAttendance(userId, gigId)).Returns(attendance);

            var result = controller.Get(gigId + 1);
            result.Should().BeOfType<NotFoundResult>();
        }

        [TestMethod]
        public void GetAttendances_ShouldReturnAttendances()
        {
            var attendances = new Attendance[]
            {
                new Attendance
                {
                    GigId = 1,
                    AttendeeId = userId
                },
                new Attendance
                {
                    GigId = 2,
                    AttendeeId = userId
                }
            };

            repository.Setup(x => x.GetFutureAttendances(userId)).Returns(attendances);

            var result = controller.GetAttendances();
            var content = (result as OkNegotiatedContentResult<IEnumerable<AttendanceDto>>).Content;

            result.Should().BeOfType<OkNegotiatedContentResult<IEnumerable<AttendanceDto>>>();
            content.Count().Should().Be(2);
        }
    }
}
