using GigHub.Core.Models;
using GigHub.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace GigHub.Persistence.Repositories
{
    public class GigRepository : IGigRepository
    {
        private ApplicationDbContext context;

        public GigRepository(ApplicationDbContext context)
        {
            this.context = context;

        }

        public Gig GetGigWithAttendees(int gigId)
        {
            return context.Gigs
                .Include(x => x.Attendances.Select(a => a.Attendee))
                .SingleOrDefault(x => x.Id == gigId);
        }

        public Gig GetGig(int gigId)
        {
            return context.Gigs
                .Include(g => g.Artist)
                .Include(g => g.Genre)
                .SingleOrDefault(x => x.Id == gigId);
        }

        public IEnumerable<Gig> GetGigsUserAttending(string userId)
        {
            return context.Attendances
                .Where(x => x.AttendeeId == userId)
                .Select(x => x.Gig)
                .Include(x => x.Artist)
                .Include(x => x.Genre)
                .ToList();
        }

        public IEnumerable<Gig> GetUpcomingGigsByArtist(string userId)
        {
            return context.Gigs
                .Where(x =>
                    x.ArtistId == userId &&
                    x.Datetime > DateTime.Now &&
                    !x.IsCanceled)
                .Include(x => x.Genre)
                .ToList();
        }

        public void Add(Gig gig)
        {
            context.Gigs.Add(gig);
        }

        public IEnumerable<Gig> GetUpcomingGigs(string searchTerms = null)
        {
            var upcommingGigs = context.Gigs
                .Where(x => x.Datetime > DateTime.Now && !x.IsCanceled)
                .Include(x => x.Artist)
                .Include(x => x.Genre);

            if (!string.IsNullOrWhiteSpace(searchTerms))
            {
                upcommingGigs = upcommingGigs
                    .Where(g =>
                        g.Artist.Name.Contains(searchTerms) ||
                        g.Genre.Name.Contains(searchTerms) ||
                        g.Venue.Contains(searchTerms));
            }

            return upcommingGigs.ToList();
        }
    }
}