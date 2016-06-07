using GigHub.Models;
using GigHub.ViewModels;
using Microsoft.AspNet.Identity;
using System;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;

namespace GigHub.Controllers
{
    public class GigsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public GigsController()
        {
            _context = new ApplicationDbContext();
        }

        public ActionResult Mine()
        {
            var userId = User.Identity.GetUserId();
            var gigs = _context.Gigs
                .Where(x =>
                    x.ArtistId == userId &&
                    x.Datetime > DateTime.Now &&
                    !x.IsCanceled)
                .Include(x => x.Genre)
                .ToList();

            return View(gigs);
        }

        [Authorize]
        public ActionResult Attending()
        {
            string userId = User.Identity.GetUserId();
            var gigs = _context.Attendances
                .Where(x => x.AttendeeId == userId)
                .Select(x => x.Gig)
                .Include(x => x.Artist)
                .Include(x => x.Genre)
                .ToList();

            var viewModel = new GigsViewModel
            {
                UpcomingGigs = gigs,
                ShowActions = User.Identity.IsAuthenticated,
                Heading = "Gigs I'm Attending"
            };

            return View("Gigs", viewModel);
        }

        [Authorize]
        public ActionResult Create()
        {
            var viewModel = new GigFormViewModel()
            {
                Genres = _context.Genres.ToList(),
                Heading = "Add a Gig"
            };

            return View("GigForm", viewModel);
        }

        [Authorize]
        public ActionResult Edit(int id)
        {
            string userId = User.Identity.GetUserId();
            var gig = _context.Gigs.FirstOrDefault(x => x.Id == id && x.ArtistId == userId);

            var viewModel = new GigFormViewModel()
            {
                Id = gig.Id,
                Heading = "Edit a Gig",
                Genres = _context.Genres.ToList(),
                Venue = gig.Venue,
                Date = gig.Datetime.ToString("MM/dd/yyyy"),
                Time = gig.Datetime.ToString("HH:mm"),
                Genre = gig.GenreId
            };

            return View("GigForm", viewModel);
        }

        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryToken]
        public ActionResult Create(GigFormViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                viewModel.Genres = _context.Genres.ToList();
                return View("GigForm", viewModel);
            }

            var gig = new Gig()
            {
                ArtistId = User.Identity.GetUserId(),
                Datetime = viewModel.GetDateTime(),
                GenreId = viewModel.Genre,
                Venue = viewModel.Venue
            };

            _context.Gigs.Add(gig);
            _context.SaveChanges();

            return RedirectToAction("Mine", "Gigs");
        }

        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryToken]
        public ActionResult Update(GigFormViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                viewModel.Genres = _context.Genres.ToList();
                return View("GigForm", viewModel);
            }

            string userId = User.Identity.GetUserId();
            var gig = _context.Gigs
                .Include(x => x.Attendances.Select(a => a.Attendee))
                .Single(x => x.Id == viewModel.Id && x.ArtistId == userId);

            gig.Update(viewModel.GetDateTime(), viewModel.Venue, viewModel.Genre);

            _context.SaveChanges();

            return RedirectToAction("Mine", "Gigs");
        }
    }
}