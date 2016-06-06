using GigHub.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GigHub.Controllers.Api
{
    [Authorize]
    public class GigsController : ApiController
    {
        private ApplicationDbContext _context;

        public GigsController()
        {
            _context = new ApplicationDbContext();
        }

        [HttpDelete]
        public IHttpActionResult Cancel(int id)
        {
            string userId = User.Identity.GetUserId();
            var gig = _context.Gigs
                .Include(x => x.Attendances.Select(y => y.Attendee))
                .Single(x => x.Id == id && x.ArtistId == userId);

            if (gig.IsCanceled)
                return NotFound();

            gig.Cancell();

            _context.SaveChanges();

            return Ok();
        }
    }
}
