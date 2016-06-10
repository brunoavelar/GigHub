using FluentAssertions;
using GigHub.Controllers.Api;
using GigHub.Core;
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
    }
}
