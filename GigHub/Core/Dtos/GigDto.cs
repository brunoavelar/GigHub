using System;
using System.ComponentModel.DataAnnotations;

namespace GigHub.Core.Dtos
{
    public class GigDto
    {
        public int Id { get; set; }
        public bool IsCanceled { get; set; }

        public UserDto Artist { get; set; }

        public string ArtistId { get; set; }

        [Required]
        [FutureDate]
        public DateTime Datetime { get; set; }

        [Required]
        public string Venue { get; set; }

        public GenreDto Genre { get; set; }

        [Required]
        public byte? GenreId { get; set; }

        public override bool Equals(object obj)
        {
            if (obj == null || obj.GetType() != GetType())
                return false;

            GigDto gig = (GigDto)obj;

            bool id = this.Id.Equals(gig.Id);
            bool isCanceled = this.IsCanceled.Equals(gig.IsCanceled);
            bool artist = this.ArtistId == gig.ArtistId;
            bool datetime = this.Datetime.Equals(gig.Datetime);
            bool venue = this.Venue == gig.Venue;
            bool genre = this.GenreId.Equals(gig.GenreId);


            return id && isCanceled && artist && datetime && venue && genre;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode() ^ this.Id;
        }
    }
}