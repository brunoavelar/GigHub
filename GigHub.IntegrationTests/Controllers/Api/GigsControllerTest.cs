using AutoMapper;
using FluentAssertions;
using GigHub.App_Start;
using GigHub.Controllers.Api;
using GigHub.Core.Dtos;
using GigHub.Core.Models;
using GigHub.Core.ViewModels;
using GigHub.IntegrationTests.Extensions;
using GigHub.Persistence;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace GigHub.IntegrationTests.Controllers.Api
{
    [TestFixture]
    public class GigsControllerTest
    {
        private GigsController controller;
        private ApplicationDbContext context;
        private string gigsEndpoint = "http://localhost/api/gigs";

        [SetUp]
        public void SetUp()
        {
            Mapper.Initialize(c => c.AddProfile(new MappingProfile()));

            context = new ApplicationDbContext();
            controller = new GigsController(new UnitOfWork(context));

            controller.Configuration = new HttpConfiguration();
            controller.Request = new HttpRequestMessage
            {
                RequestUri = new Uri(gigsEndpoint)
            };
        }

        [TearDown]
        public void TearDown()
        {
            context.Dispose();
        }

        [Test, Isolated]
        public void Post_WhenCalledWithAValidGig_ShouldCreateAGig()
        {
            //Arrange
            var user = context.Users.First();
            controller.MockCurrentUser(user.Id, user.UserName);

            var genre = context.Genres.First();
            var gigDto = new GigDto { Datetime = DateTime.Now.AddDays(1), GenreId = genre.Id, Venue = "Gig Venue" };

            //Act
            GigDto created = (controller.Post(gigDto) as CreatedNegotiatedContentResult<GigDto>).Content;
            var gigFromDb = context.Gigs.SingleOrDefault(x => x.Id == created.Id);

            //Assert
            gigFromDb.Should().NotBeNull();
        }

        [Test, Isolated]
        public void Put_WhenCalledWithAValidGig_ShouldUpdateTheGig()
        {
            //Arrange
            var user = context.Users.First();
            controller.MockCurrentUser(user.Id, user.UserName);

            var genre = context.Genres.OrderBy(x => x.Id).First();
            var genreUpdated = context.Genres.OrderBy(x => x.Id).Skip(1).FirstOrDefault();
            var gig = new Gig { Datetime = DateTime.Now.AddDays(1), GenreId = genre.Id, Venue = "Gig Venue", ArtistId = user.Id };
            gig = context.Gigs.Add(gig);
            context.SaveChanges();

            //Act
            GigDto dto = Mapper.Map<Gig, GigDto>(gig);
            dto.Venue = dto.Venue + "-";
            dto.Datetime = dto.Datetime.AddDays(2);
            dto.Genre.Id = genreUpdated.Id;

            GigDto updated = (controller.Put(dto.Id, dto) as OkNegotiatedContentResult<GigDto>).Content;
            var gigFromDb = context.Gigs.SingleOrDefault(x => x.Id == dto.Id);

            //Assert
            gigFromDb.Should().NotBeNull();
            gigFromDb.Venue.Should().Be(dto.Venue);
            gigFromDb.Datetime.Should().Be(dto.Datetime);
            gigFromDb.GenreId.Should().Be(dto.GenreId);
        }
    }
}
