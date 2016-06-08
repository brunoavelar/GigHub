using GigHub.Core;
using Microsoft.AspNet.Identity;
using System.Web.Mvc;

namespace GigHub.Controllers
{
    [Authorize]
    public class FolloweesController : Controller
    {
        private IUnitOfWork unitOfWork;

        public FolloweesController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public ActionResult Index()
        {
            string userId = User.Identity.GetUserId();

            var artists = unitOfWork.Followings.GetFollowees(userId);

            return View(artists);
        }


    }
}
