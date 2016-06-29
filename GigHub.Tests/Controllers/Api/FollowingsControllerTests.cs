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
    public class FollowingsControllerTests
    {
        private FollowingsController controller;
        private Mock<IFollowingRepository> repository;
        private string userId;

        [TestInitialize]
        public void TestInitialize()
        {
            Mapper.Initialize(c => c.AddProfile(new MappingProfile()));

            repository = new Mock<IFollowingRepository>();

            var mockUoW = new Mock<IUnitOfWork>();
            mockUoW.SetupGet(x => x.Followings).Returns(repository.Object);

            userId = "1";

            controller = new FollowingsController(mockUoW.Object);
            controller.MockCurrentUser(userId, "user01@user.com");
        }

        [TestMethod]
        public void Follow_UserFollowingAnArtistInWhichHeAlreadyFollows_ShouldReturnBadRequest()
        {
            string artistId = "1";
            var following = new Following();

            repository.Setup(r => r.GetFollowing(userId, artistId)).Returns(following);

            var dto = new FollowingDto
            {
                FolloweeId = artistId
            };
            var result = controller.Follow(dto);
            result.Should().BeOfType<BadRequestErrorMessageResult>();

        }

        [TestMethod]
        public void Follow_WithValidRequest_ShouldReturnOk()
        {
            var dto = new FollowingDto
            {
                FolloweeId = "1"
            };
            var result = controller.Follow(dto);
            result.Should().BeOfType<OkResult>();
        }

        [TestMethod]
        public void Unfollow_NoFollowingWithGivenIdExists_ShouldReturnNotFound()
        {
            var result = controller.Unfollow("1");
            result.Should().BeOfType<NotFoundResult>();
        }

        [TestMethod]
        public void Unfollow_WithValidRequest_ShouldReturnOk()
        {
            string artistId = "1";
            var following = new Following
            {
                FolloweeId = artistId,
                FollowerId = userId
            };

            repository.Setup(r => r.GetFollowing(userId, artistId)).Returns(following);

            var result = controller.Unfollow(artistId);
            result.Should().BeOfType<OkResult>();
        }

        [TestMethod]
        public void Get_WithValidId_ShouldReturnFollowingDto()
        {
            string artistId = "1";
            var following = new Following
            {
                FolloweeId = artistId,
                FollowerId = userId
            };

            repository.Setup(x => x.GetFollowing(userId, artistId)).Returns(following);

            var result = controller.Get(artistId) as OkNegotiatedContentResult<FollowingDto>;
            result.Content.FolloweeId.Should().Be(artistId);
        }

        [TestMethod]
        public void Get_NoFollowingWithGivenGigIdExists_ShouldReturnNotFound()
        {
            string artistId = "1";
            var following = new Following
            {
                FolloweeId = artistId,
                FollowerId = userId
            };

            repository.Setup(x => x.GetFollowing(userId, artistId)).Returns(following);

            var result = controller.Get(artistId + 1);
            result.Should().BeOfType<NotFoundResult>();
        }
    }
}
