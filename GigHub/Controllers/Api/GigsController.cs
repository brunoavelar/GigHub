using AutoMapper;
using GigHub.Core;
using GigHub.Core.Dtos;
using GigHub.Core.Models;
using GigHub.Persistence;
using Microsoft.AspNet.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace GigHub.Controllers.Api
{
    [Authorize]
    public class GigsController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public GigsController()
        {
            unitOfWork = new UnitOfWork(new ApplicationDbContext());
        }

        public GigsController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        public IEnumerable<GigDto> GetAll()
        {
            var upcomingGigs = unitOfWork.Gigs.GetUpcomingGigs();

            return upcomingGigs.Select(g => Mapper.Map<Gig, GigDto>(g));

        }

        [HttpDelete]
        public IHttpActionResult Cancel(int id)
        {
            string userId = User.Identity.GetUserId();
            var gig = unitOfWork.Gigs.GetGigWithAttendees(id);

            if (gig == null || gig.IsCanceled)
                return NotFound();

            if (gig.ArtistId != userId)
                return Unauthorized();

            gig.Cancell();

            unitOfWork.Complete();

            return Ok();
        }
    }
}
