using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace GigHub.Core.Models
{
    public class Gig
    {
        public int Id { get; set; }

        public bool IsCanceled { get; private set; }

        public string ArtistId { get; set; }

        public ApplicationUser Artist { get; set; }

        public DateTime Datetime { get; set; }

        public string Venue { get; set; }

        public byte GenreId { get; set; }

        public Genre Genre { get; set; }

        public ICollection<Attendance> Attendances { get; private set; }

        public Gig()
        {
            this.Attendances = new Collection<Attendance>();
        }

        public void Cancell()
        {
            IsCanceled = true;

            var notification = Notification.GigCanceled(this);

            foreach (var attendee in Attendances.Select(x => x.Attendee))
            {
                attendee.Notify(notification);
            }
        }

        public void Modify(DateTime dateTime, string venue, byte genre)
        {
            var notification = Notification.GigUpdated(this, Datetime, Venue);

            Venue = venue;
            Datetime = dateTime;
            GenreId = genre;

            foreach (var attendee in Attendances.Select(x => x.Attendee))
            {
                attendee.Notify(notification);
            }
        }
    }


}