using GigHub.Core;
using GigHub.Core.Dtos;
using GigHub.Core.Models;
using Microsoft.AspNet.Identity;
using System.Web.Http;

namespace GigHub.Controllers.Api
{
    [Authorize]
    public class FollowingsController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public FollowingsController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public IHttpActionResult Follow(FollowingDto dto)
        {
            string userId = User.Identity.GetUserId();

            if (unitOfWork.Followings.GetFollowing(userId, dto.FolloweeId) != null)
                return BadRequest("Following already exists.");

            var following = new Following()
            {
                FollowerId = userId,
                FolloweeId = dto.FolloweeId
            };

            unitOfWork.Followings.Add(following);
            unitOfWork.Complete();

            return Ok();
        }

        [HttpDelete]
        public IHttpActionResult Unfollow(string id)
        {
            string userId = User.Identity.GetUserId();
            var following = unitOfWork.Followings.GetFollowing(userId, id);

            if (following == null)
                return NotFound();

            unitOfWork.Followings.Remove(following);
            unitOfWork.Complete();

            return Ok();
        }
    }
}
