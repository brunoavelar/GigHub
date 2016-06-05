using GigHub.Models;
using GigHub.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Microsoft.AspNet.Identity;
using System.Data.Entity;

namespace GigHub.Controllers
{
    [Authorize]
    public class FolloweesController : Controller
    {
        private ApplicationDbContext _context;

        public FolloweesController()
        {
            _context = new ApplicationDbContext();
        }

        public ActionResult Index()
        {
            string userId = User.Identity.GetUserId();

            var artists = _context.Followings
                .Where(x => x.FollowerId == userId)
                .Select(x => x.Followee)
                .ToList();

            return View(artists);
        }
    }
}
