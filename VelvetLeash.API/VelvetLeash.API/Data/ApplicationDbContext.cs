using Microsoft.EntityFrameworkCore;
using VelvetLeash.API.Models;
using VelvetLeash.API.Model;

namespace VelvetLeash.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Pet> Pets { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Sitter> Sitters { get; set; }
        public DbSet<BoardingRequest> BoardingRequests { get; set; }
    }
}
