using AutoMapper;
using GigHub.Core;
using GigHub.Core.Dtos;
using GigHub.Core.Models;
using Microsoft.AspNet.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace GigHub.Controllers.Api
{
    [RoutePrefix("api/gigs")]
    public class GigsController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public GigsController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public IEnumerable<GigDto> GetGigs()
        {
            var upcomingGigs = unitOfWork.Gigs.GetUpcomingGigs();

            return upcomingGigs.Select(g => Mapper.Map<Gig, GigDto>(g));
        }

        [Route("artist")]
        public IEnumerable<GigDto> GetGigsForArtist()
        {
            string userId = User.Identity.GetUserId();
            var upcomingGigs = unitOfWork.Gigs.GetUpcomingGigsByArtist(userId);

            return upcomingGigs.Select(g => Mapper.Map<Gig, GigDto>(g));
        }

        [HttpPost]
        public IHttpActionResult Post(GigDto gig)
        {
            string userId = User.Identity.GetUserId();

            Validate(gig);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entity = Mapper.Map<GigDto, Gig>(gig);
            entity.ArtistId = userId;

            var newGig = unitOfWork.Gigs.Add(entity);
            unitOfWork.Complete();

            var newGigDto = Mapper.Map<Gig, GigDto>(newGig);

            return Created<GigDto>(Request.RequestUri + "/" + newGigDto.Id.ToString(), newGigDto);
        }

        public IHttpActionResult Get(int id)
        {
            var gig = unitOfWork.Gigs.GetGig(id);

            if (gig == null)
                return NotFound();


            var gigDto = Mapper.Map<Gig, GigDto>(gig);
            return Ok(gigDto);
        }

        [Authorize]
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
