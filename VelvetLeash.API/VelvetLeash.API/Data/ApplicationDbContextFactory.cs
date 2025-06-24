using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace VelvetLeash.API.Data
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();

            // ✅ Updated connection string without instance name
            string cs = "Server=SHAIKH;Database=velvetleash;User Id=sa;Password=sarim5ahmed;TrustServerCertificate=True;";
            optionsBuilder.UseSqlServer(cs);

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}
