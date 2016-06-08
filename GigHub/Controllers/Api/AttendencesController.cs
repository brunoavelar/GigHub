using GigHub.Core;
using GigHub.Core.Dtos;
using GigHub.Core.Models;
using Microsoft.AspNet.Identity;
using System.Web.Http;

namespace GigHub.Controllers.Api
{
    [Authorize]
    public class AttendancesController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public AttendancesController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [HttpPost]
        public IHttpActionResult Attend(AttendanceDto dto)
        {
            string userId = User.Identity.GetUserId();

            if (unitOfWork.Attendances.GetAttendance(userId, dto.GigId) != null)
                return BadRequest("The attendance already exists.");

            var attendence = new Attendance()
            {
                GigId = dto.GigId,
                AttendeeId = userId
            };

            unitOfWork.Attendances.Add(attendence);
            unitOfWork.Complete();

            return Ok();
        }

        [HttpDelete]
        public IHttpActionResult DeleteAttendance(int id)
        {
            string userId = User.Identity.GetUserId();
            var attendance = unitOfWork.Attendances.GetAttendance(userId, id);

            if (attendance == null)
                return NotFound();

            unitOfWork.Attendances.Remove(attendance);
            unitOfWork.Complete();

            return Ok();
        }
    }
}
