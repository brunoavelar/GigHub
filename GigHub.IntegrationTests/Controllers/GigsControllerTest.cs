using FluentAssertions;
using GigHub.Controllers;
using GigHub.Core.Models;
using GigHub.Core.ViewModels;
using GigHub.IntegrationTests.Extensions;
using GigHub.Persistence;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GigHub.IntegrationTests.Controllers
{
    [TestFixture]
    public class GigsControllerTest
    {
        private GigsController controller;
        private ApplicationDbContext context;

        [SetUp]
        public void SetUp()
        {
            context = new ApplicationDbContext();
            controller = new GigsController(new UnitOfWork(context));
        }

        [TearDown]
        public void TearDown()
        {
            context.Dispose();
        }

        [Test, Isolated]
        public void Mine_WhenCalled_ShouldCreturnUpcomingGigs()
        {
            //Arrange
            var user = context.Users.First();
            controller.MockCurrentUser(user.Id, user.UserName);

            var genre = context.Genres.First();
            var gig = new Gig { Artist = user, Datetime = DateTime.Now.AddDays(1), Genre = genre, Venue = "-" };
            context.Gigs.Add(gig);
            context.SaveChanges();

            //Act
            var result = controller.Mine();

            //Assert
            (result.ViewData.Model as IEnumerable<Gig>).Should().HaveCount(1);
        }

        [Test, Isolated]
        public void Update_WhenCalled_ShouldUpdateTheGivenGigs()
        {
            //Arrange
            var user = context.Users.First();
            controller.MockCurrentUser(user.Id, user.UserName);

            var genre = context.Genres.Single(g => g.Id == 1);
            var gig = new Gig { Artist = user, Datetime = DateTime.Now.AddDays(1), Genre = genre, Venue = "-" };
            context.Gigs.Add(gig);
            context.SaveChanges();

            var updatedGig = new GigFormViewModel
            {
                Id = gig.Id,
                Date = DateTime.Today.AddMonths(1).ToString("d, MMM yyyy"),
                Time = "21:00",
                Venue = "Venue",
                Genre = 2
            };

            //Act
            var result = controller.Update(updatedGig);

            //Assert
            context.Entry(gig).Reload();
            gig.Datetime.Should().Be(DateTime.Today.AddMonths(1).AddHours(21));
            gig.Venue.Should().Be("venue");
            gig.Genre.Should().Be(2);
        }
    }
}
