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
using System.Web.Http.Results;

namespace GigHub.Tests.Controllers.Api
{
    [TestClass]
    public class GigsControllersTests
    {
        private GigsController controller;
        private Mock<IGigRepository> repository;
        private string userId;

        [TestInitialize]
        public void TestInitialize()
        {
            Mapper.Initialize(c => c.AddProfile(new MappingProfile()));

            repository = new Mock<IGigRepository>();

            var mockUoW = new Mock<IUnitOfWork>();
            mockUoW.SetupGet(x => x.Gigs).Returns(repository.Object);

            userId = "1";

            controller = new GigsController(mockUoW.Object);
            controller.MockCurrentUser(userId, "user01@user.com");
        }

        [TestMethod]
        public void Cancel_NoGigWithGivenIdExists_ShouldReturnNotFound()
        {
            var result = controller.Cancel(1);

            result.Should().BeOfType<NotFoundResult>();
        }

        [TestMethod]
        public void Cancel_GigIsCanceled_ShouldReturnNotFound()
        {
            var gig = new Gig();
            gig.Cancell();

            repository.Setup(r => r.GetGigWithAttendees(1))
                .Returns(gig);

            var result = controller.Cancel(1);
            result.Should().BeOfType<NotFoundResult>();
        }

        [TestMethod]
        public void Cancel_UserCancelingAnotherUsersGig_ShouldReturnUnauthorized()
        {
            var gig = new Gig()
            {
                ArtistId = userId + "-"
            };

            repository.Setup(r => r.GetGigWithAttendees(1))
                .Returns(gig);

            var result = controller.Cancel(1);
            result.Should().BeOfType<UnauthorizedResult>();
        }

        [TestMethod]
        public void Cancel_ValidRequest_ShouldReturnOk()
        {
            var gig = new Gig()
            {
                ArtistId = userId
            };

            repository.Setup(r => r.GetGigWithAttendees(1))
                .Returns(gig);

            var result = controller.Cancel(1);
            result.Should().BeOfType<OkResult>();
        }

        [TestMethod]
        public void Get_WithValidId_ShouldReturnGig()
        {
            int gigId = 1;
            var gig = new Gig()
            {
                Id = gigId,
                Artist = new ApplicationUser(),
                Genre = new Genre(),
            };

            repository.Setup(x => x.GetGig(gigId)).Returns(gig);
            var result = controller.Get(gigId) as OkNegotiatedContentResult<GigDto>;
            result.Content.Id.Should().Be(gigId);
        }

        [TestMethod]
        public void Get_NoGigWithGivenIdExists_ShouldReturnNotFound()
        {
            int gigId = 1;
            var gig = new Gig()
            {
                Id = gigId,
                Artist = new ApplicationUser(),
                Genre = new Genre(),
            };

            repository.Setup(x => x.GetGig(gigId)).Returns(gig);

            var result = controller.Get(gigId + 1);
            result.Should().BeOfType<NotFoundResult>();
        }
    }
}
