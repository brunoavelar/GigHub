using AutoMapper;
using GigHub.Core;
using GigHub.Core.Dtos;
using GigHub.Core.Models;
using Microsoft.AspNet.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using WebGrease.Css.Extensions;

namespace GigHub.Controllers.Api
{
    [Authorize]
    public class NotificationsController : ApiController
    {
        private IUnitOfWork unitOfWork;

        public NotificationsController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public IEnumerable<NotificationDto> GetNewNotifications()
        {
            string userId = User.Identity.GetUserId();
            IEnumerable<Notification> notifications = unitOfWork.Notifications.GetNewNotificationsFor(userId);

            return notifications.Select(n => Mapper.Map<Notification, NotificationDto>(n));
        }

        [HttpPost]
        public IHttpActionResult MarkAsRead()
        {
            var userId = User.Identity.GetUserId();

            IEnumerable<UserNotification> userNotifications = unitOfWork.UserNotifications.GetUserNotificationsFor(userId);
            userNotifications.ForEach(x => x.Read());

            unitOfWork.Complete();

            return Ok();
        }
    }
}
