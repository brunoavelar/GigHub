using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace GigHub.Models
{
    public class Gig
    {
        public int Id { get; set; }

        public bool IsCanceled { get; private set; }

        [Required]
        public string ArtistId { get; set; }

        public ApplicationUser Artist { get; set; }

        public DateTime Datetime { get; set; }

        [Required]
        [StringLength(255)]
        public string Venue { get; set; }

        [Required]
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

        public void Update(DateTime dateTime, string venue, byte genre)
        {
            var notification = Notification.GigUpdated(this, dateTime, venue);

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