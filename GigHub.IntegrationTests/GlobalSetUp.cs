using GigHub.Core.Models;
using GigHub.Migrations;
using GigHub.Persistence;
using NUnit.Framework;
using System.Data.Entity.Migrations;
using System.Linq;

namespace GigHub.IntegrationTests
{
    [SetUpFixture]
    public class GlobalSetUp
    {
        [SetUp]
        public void SetUp()
        {
            MigrateDbToLatestVersion();

            Seed();
        }

        private static void MigrateDbToLatestVersion()
        {
            var configuration = new Configuration();
            var migrator = new DbMigrator(configuration);
            migrator.Update();
        }

        public void Seed()
        {
            var context = new ApplicationDbContext();

            if (context.Users.Any())
                return;

            context.Users.Add(new ApplicationUser { UserName = "user1", Name = "user1", Email = "user1@domain.com", PasswordHash = "-" });
            context.Users.Add(new ApplicationUser { UserName = "user2", Name = "user2", Email = "user2@domain.com", PasswordHash = "-" });
            context.Users.Add(new ApplicationUser { UserName = "user3", Name = "user3", Email = "user3@domain.com", PasswordHash = "-" });
            context.Users.Add(new ApplicationUser { UserName = "user4", Name = "user4", Email = "user4@domain.com", PasswordHash = "-" });

            context.SaveChanges();
        }
    }
}
