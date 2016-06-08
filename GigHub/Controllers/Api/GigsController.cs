using GigHub.Core;
using Microsoft.AspNet.Identity;
using System.Web.Http;

namespace GigHub.Controllers.Api
{
    [Authorize]
    public class GigsController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public GigsController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [HttpDelete]
        public IHttpActionResult Cancel(int id)
        {
            string userId = User.Identity.GetUserId();
            var gig = unitOfWork.Gigs.GetGigWithAttendees(id);

            if (gig == null)
                NotFound();

            if (gig.IsCanceled)
                return NotFound();

            gig.Cancell();

            unitOfWork.Complete();

            return Ok();
        }
    }
}
