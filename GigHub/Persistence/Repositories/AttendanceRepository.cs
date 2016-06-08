using GigHub.Core.Models;
using GigHub.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GigHub.Persistence.Repositories
{
    public class AttendanceRepository : IAttendanceRepository
    {
        private ApplicationDbContext context;

        public AttendanceRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public IEnumerable<Attendance> GetFutureAttendances(string userId)
        {
            return context.Attendances
                            .Where(a => a.AttendeeId == userId && a.Gig.Datetime > DateTime.Now)
                            .ToList();
        }

        public Attendance GetAttendance(string userId, int gigId)
        {
            return context.Attendances.SingleOrDefault(a => a.GigId == gigId && a.AttendeeId == userId);
        }

        public void Remove(Attendance attendance)
        {
            context.Attendances.Remove(attendance);
        }

        public void Add(Attendance attendence)
        {
            context.Attendances.Add(attendence);
        }
    }
}