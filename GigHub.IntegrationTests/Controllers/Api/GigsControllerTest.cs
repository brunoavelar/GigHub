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
            string gigName = Guid.NewGuid().ToString();
            var gigDto = new GigDto { Datetime = DateTime.Now.AddDays(1), GenreId = genre.Id, Venue = gigName };

            //Act
            GigDto created = (controller.Post(gigDto) as CreatedNegotiatedContentResult<GigDto>).Content;
            var gigFromDb = context.Gigs.SingleOrDefault(x => x.Id == created.Id);

            //Assert
            gigFromDb.Should().NotBeNull();
        }
    }
}
