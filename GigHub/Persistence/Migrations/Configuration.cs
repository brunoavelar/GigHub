namespace GigHub.Migrations
{
    using Core.Models;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Persistence;
    using System;
    using System.Linq;
    using System.Data.Entity.Migrations;
    using System.Data.Entity;
    using System.Collections.Generic;

    public sealed class Configuration : DbMigrationsConfiguration<ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            MigrationsDirectory = @"Persistence\Migrations";
        }

        protected override void Seed(ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            SeedUsers(context);
            SeeGenres(context);
            context.SaveChanges();

            SeedGigs(context);

            SeedAttendances(context);

            //System.Diagnostics.Debugger.Launch();
            var gigsToChange = context.Gigs.Where(g => g.Venue == "San Francisco").Include(g => g.Attendances).ToList();
            foreach (var gig in gigsToChange)
            {
                gig.Modify(gig.Datetime.AddDays(1), gig.Venue, gig.Genre.Id);
            }
            context.SaveChanges();


            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }

        private static void SeedAttendances(ApplicationDbContext context)
        {
            if (context.Attendances.Any())
                return;

            var bruno = context.Users.Single(u => u.UserName == "brunoavelar@gmail.com");
            var attendances = new List<Attendance>();

            foreach (var gig in context.Gigs.Where(g => g.Venue == "San Francisco").ToList())
            {
                context.Attendances.AddOrUpdate(
                    new Attendance()
                    {
                        GigId = gig.Id,
                        AttendeeId = bruno.Id
                    }
                );
            }
            context.SaveChanges();
        }

        private static void SeedGigs(ApplicationDbContext context)
        {
            if (context.Gigs.Any())
                return;

            AddDreamTheaterGigs(context);
            AddIronMaidenGigs(context);
            AddJoeSatrianiGigs(context);
            context.SaveChanges();
        }

        private static void AddDreamTheaterGigs(ApplicationDbContext context)
        {
            var dreamTheater = context.Users.Single(x => x.UserName == "dreamtheater@gighub.com");
            var prog = context.Genres.Single(x => x.Name == "Progressive Rock");

            context.Gigs.AddOrUpdate(g => g.Id,
                new Gig
                {
                    ArtistId = dreamTheater.Id,
                    Venue = "San Francisco",
                    GenreId = prog.Id,
                    Datetime = new DateTime(2017, 1, 2, 8, 0, 0)
                },

                new Gig
                {
                    ArtistId = dreamTheater.Id,
                    Venue = "New York",
                    GenreId = prog.Id,
                    Datetime = new DateTime(2017, 1, 5, 8, 0, 0)
                },

                new Gig
                {
                    ArtistId = dreamTheater.Id,
                    Venue = "Orlando",
                    GenreId = prog.Id,
                    Datetime = new DateTime(2017, 1, 8, 8, 0, 0)
                },

                new Gig
                {
                    ArtistId = dreamTheater.Id,
                    Venue = "São Paulo",
                    GenreId = prog.Id,
                    Datetime = new DateTime(2017, 1, 13, 8, 0, 0)
                }
            );
        }

        private static void AddIronMaidenGigs(ApplicationDbContext context)
        {
            var ironMaiden = context.Users.Single(x => x.UserName == "ironmaiden@gighub.com");
            var metal = context.Genres.Single(x => x.Name == "Heavy Metal");

            context.Gigs.AddOrUpdate(g => g.Id,
                new Gig
                {
                    ArtistId = ironMaiden.Id,
                    Venue = "San Francisco",
                    GenreId = metal.Id,
                    Datetime = new DateTime(2017, 1, 2, 8, 0, 0)
                },

                new Gig
                {
                    ArtistId = ironMaiden.Id,
                    Venue = "New York",
                    GenreId = metal.Id,
                    Datetime = new DateTime(2017, 1, 5, 8, 0, 0)
                },

                new Gig
                {
                    ArtistId = ironMaiden.Id,
                    Venue = "Orlando",
                    GenreId = metal.Id,
                    Datetime = new DateTime(2017, 1, 8, 8, 0, 0)
                },

                new Gig
                {
                    ArtistId = ironMaiden.Id,
                    Venue = "São Paulo",
                    GenreId = metal.Id,
                    Datetime = new DateTime(2017, 1, 13, 8, 0, 0)
                }
            );
        }

        private static void AddJoeSatrianiGigs(ApplicationDbContext context)
        {
            var satriani = context.Users.Single(x => x.UserName == "satriani@gighub.com");
            var instrumental = context.Genres.Single(x => x.Name == "Instrumental Rock");

            context.Gigs.AddOrUpdate(g => g.Id,
                new Gig
                {
                    ArtistId = satriani.Id,
                    Venue = "San Francisco",
                    GenreId = instrumental.Id,
                    Datetime = new DateTime(2017, 1, 2, 8, 0, 0)
                },

                new Gig
                {
                    ArtistId = satriani.Id,
                    Venue = "New York",
                    GenreId = instrumental.Id,
                    Datetime = new DateTime(2017, 1, 5, 8, 0, 0)
                },

                new Gig
                {
                    ArtistId = satriani.Id,
                    Venue = "Orlando",
                    GenreId = instrumental.Id,
                    Datetime = new DateTime(2017, 1, 8, 8, 0, 0)
                },

                new Gig
                {
                    ArtistId = satriani.Id,
                    Venue = "São Paulo",
                    GenreId = instrumental.Id,
                    Datetime = new DateTime(2017, 1, 13, 8, 0, 0)
                }
            );
        }

        private static void SeeGenres(ApplicationDbContext context)
        {
            context.Genres.AddOrUpdate(
                new Genre
                {
                    Id = 1,
                    Name = "Heavy Metal"
                },
                new Genre
                {
                    Id = 2,
                    Name = "Progressive Rock"
                },
                new Genre
                {
                    Id = 3,
                    Name = "Instrumental Rock"
                }
            );
        }

        private static void SeedUsers(ApplicationDbContext context)
        {
            var passwordHash = new PasswordHasher();
            string password = passwordHash.HashPassword("123456");
            context.Users.AddOrUpdate(u => u.UserName,
                new ApplicationUser
                {
                    Name = "Bruno Avelar",
                    UserName = "brunoavelar@gmail.com",
                    Email = "brunoavelar@gmail.com",
                    EmailConfirmed = true,
                    PasswordHash = password,
                    SecurityStamp = Guid.NewGuid().ToString("D")

                },

                new ApplicationUser
                {
                    Name = "Dream Theater",
                    UserName = "dreamtheater@gighub.com",
                    Email = "dreamtheater@gighub.com",
                    EmailConfirmed = true,
                    PasswordHash = password,
                    SecurityStamp = Guid.NewGuid().ToString("D")
                },

                new ApplicationUser
                {
                    Name = "Iron Maiden",
                    UserName = "ironmaiden@gighub.com",
                    Email = "ironmaiden@gighub.com",
                    EmailConfirmed = true,
                    PasswordHash = password,
                    SecurityStamp = Guid.NewGuid().ToString("D")
                },

                new ApplicationUser
                {
                    Name = "Joe Satriani",
                    UserName = "satriani@gighub.com",
                    Email = "satriani@gighub.com",
                    EmailConfirmed = true,
                    PasswordHash = password,
                    SecurityStamp = Guid.NewGuid().ToString("D")
                }
            );
        }
    }
}
