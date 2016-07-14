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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace GigHub.Tests.Controllers.Api
{
    [TestClass]
    public class GigsControllersTests
    {
        private GigsController controller;
        private Mock<IGigRepository> repository;
        private string userId;
        private string gigsEndpoint = "http://localhost/api/gigs";

        [TestInitialize]
        public void TestInitialize()
        {
            Mapper.Initialize(c => c.AddProfile(new MappingProfile()));

            repository = new Mock<IGigRepository>();

            var mockUoW = new Mock<IUnitOfWork>();
            mockUoW.SetupGet(x => x.Gigs).Returns(repository.Object);

            userId = "1";

            controller = new GigsController(mockUoW.Object);
            controller.Configuration = new HttpConfiguration();
            controller.Request = new HttpRequestMessage
            {
                RequestUri = new Uri(gigsEndpoint)
            };
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

        [TestMethod]
        public void GetGigs_WithValidId_ShouldReturnAllGig()
        {
            var gigs = new List<Gig>
            {
                new Gig { ArtistId = "1" },
                new Gig { ArtistId = "2" },
            };

            repository.Setup(r => r.GetUpcomingGigs(null)).Returns(gigs);
            var result = controller.GetGigs().ToList();
            result.Count.Should().Be(2);
        }

        [TestMethod]
        public void GetGigsForArtist_WithValidId_ShouldReturnGigsWithArtistId()
        {
            var gigs = new List<Gig>
            {
                new Gig { ArtistId = "1" },
                new Gig { ArtistId = "1" },
            };

            repository.Setup(r => r.GetUpcomingGigsByArtist("1")).Returns(gigs);
            var result = controller.GetGigsForArtist().ToList();
            result.Count.Should().Be(2);
        }

        [TestMethod]
        public void Post_WithInvalidVenue_ShouldReturnBadRequest()
        {
            GigDto gig = CreateValidGigDto();
            gig.Venue = null;
            AssertBadRequestPostMethod(gig);
        }

        [TestMethod]
        public void Post_WithInvalidGenre_ShouldReturnBadRequest()
        {
            GigDto gig = CreateValidGigDto();
            gig.GenreId = null;
            AssertBadRequestPostMethod(gig);
        }

        [TestMethod]
        public void Post_WithDateTimeInThePast_ShouldReturnBadRequest()
        {
            GigDto gig = CreateValidGigDto();
            gig.Datetime = DateTime.Now.AddDays(-2);
            AssertBadRequestPostMethod(gig);
        }

        [TestMethod]
        public void Post_WithValidRequest_ShouldReturnCreated()
        {
            int futureGigId = 1;
            GigDto gig = CreateValidGigDto();
            repository.Setup(x => x.Add(It.IsAny<Gig>()))
                .Returns((Gig g) =>
                {
                    g.Id = futureGigId;
                    gig = Mapper.Map<Gig, GigDto>(g);
                    return g;
                });


            var result = controller.Post(gig);
            var created = result as CreatedNegotiatedContentResult<GigDto>;

            result.Should().BeOfType<CreatedNegotiatedContentResult<GigDto>>();
            created.Location.AbsoluteUri.Should().Be(gigsEndpoint + "/" + futureGigId);
            created.Content.Should().Be(gig);
        }


        private static GigDto CreateValidGigDto()
        {
            return new GigDto
            {
                Artist = new UserDto
                {
                    Id = "1",
                    Name = "Test artist"
                },
                ArtistId = "1",
                Datetime = DateTime.Now.AddDays(1),
                Venue = "Venue 01",
                Genre = new GenreDto
                {
                    Id = 1,
                    Name = "Rock"
                },
                GenreId = 1,
                IsCanceled = false,
            };
        }

        private void AssertBadRequestPostMethod(GigDto gig)
        {
            var result = controller.Post(gig);
            result.Should().BeOfType<InvalidModelStateResult>();
        }

        [TestMethod]
        public void Put_WithValidRequest_ShouldReturnOk()
        {
            int gigId = 1;
            GigDto gigDto = CreateValidGigDto();
            gigDto.Id = gigId;
            Gig gig = Mapper.Map<GigDto, Gig>(gigDto);
            repository.Setup(x => x.GetGigWithAttendees(gigId)).Returns(gig);

            gigDto.Venue = gigDto.Venue + "-";
            gigDto.Datetime = gigDto.Datetime.AddDays(2);
            gigDto.GenreId = 2;


            var result = controller.Put(gigId, gigDto);
            var created = result as OkNegotiatedContentResult<GigDto>;

            result.Should().BeOfType<OkNegotiatedContentResult<GigDto>>();
            created.Content.Should().Be(gigDto);
        }

        [TestMethod]
        public void Put_WithInvalidGigId_ShouldReturnNotFound()
        {
            int gigId = 1;
            GigDto gigDto = CreateValidGigDto();
            gigDto.Id = gigId;
            Gig gig = Mapper.Map<GigDto, Gig>(gigDto);
            repository.Setup(x => x.GetGigWithAttendees(gigId)).Returns(gig);

            var result = controller.Put(gigId + 2, gigDto);
            result.Should().BeOfType<NotFoundResult>();
        }

        [TestMethod]
        public void Put_WithGigIdFromAnotherUser_ShouldReturnUnauthorized()
        {
            GigDto gigDto = CreateValidGigDto();
            gigDto.Id = 1;
            gigDto.ArtistId = "- ";
            Gig gig = Mapper.Map<GigDto, Gig>(gigDto);

            repository.Setup(x => x.GetGigWithAttendees(1)).Returns(gig);

            var result = controller.Put(1, gigDto);
            result.Should().BeOfType<UnauthorizedResult>();
        }

        [TestMethod]
        public void Put_WithInvalidVenue_ShouldReturnBadRequest()
        {
            GigDto gigDto = CreateValidGigDto();
            gigDto.Id = 1;
            Gig gig = Mapper.Map<GigDto, Gig>(gigDto);
            repository.Setup(x => x.GetGigWithAttendees(1)).Returns(gig);

            gigDto.Venue = null;

            AsserBadRequestPutMethod(gigDto);
        }

        [TestMethod]
        public void Put_WithInvalidGenre_ShouldReturnBadRequest()
        {
            GigDto gigDto = CreateValidGigDto();
            gigDto.Id = 1;
            Gig gig = Mapper.Map<GigDto, Gig>(gigDto);
            repository.Setup(x => x.GetGigWithAttendees(1)).Returns(gig);

            gigDto.GenreId = null;
            AsserBadRequestPutMethod(gigDto);
        }

        [TestMethod]
        public void Put_WithDateTimeInThePast_ShouldReturnBadRequest()
        {
            GigDto gigDto = CreateValidGigDto();
            gigDto.Id = 1;
            Gig gig = Mapper.Map<GigDto, Gig>(gigDto);
            repository.Setup(x => x.GetGigWithAttendees(1)).Returns(gig);

            gigDto.Datetime = DateTime.Now.AddDays(-2);
            AsserBadRequestPutMethod(gigDto);
        }

        private void AsserBadRequestPutMethod(GigDto gigDto)
        {
            var result = controller.Put(1, gigDto);
            result.Should().BeOfType<InvalidModelStateResult>();
        }
    }
}
