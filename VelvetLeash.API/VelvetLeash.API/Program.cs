using VelvetLeash.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using VelvetLeash.API.Model;
using Microsoft.Data.Sqlite;

var builder = WebApplication.CreateBuilder(args);

// Add EF Core with SQL Server
// For development, we'll use SQLite instead of SQL Server
string cs = "Data Source=velvetleash.db";
builder.Services.AddDbContext<ApplicationDbContext>(a => a.UseSqlite(cs));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ CORS setup
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

// ✅ JWT Auth setup
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? "fallback-key"))
    };
});

var app = builder.Build(); // ✅ Declare 'app' before using it

// ✅ Use CORS middleware
app.UseCors("AllowAll");

// Swagger for development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Create and seed the database
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    
    // Create the database if it doesn't exist
    db.Database.EnsureCreated();
    
    // Seed sitters if DB is empty
    if (!db.Sitters.Any())
    {
        db.Sitters.AddRange(
            new Sitter { Name = "Alice Johnson", Location = "New York", Rating = 4.8, Bio = "Loves all animals!", IsAvailable = true },
            new Sitter { Name = "Bob Smith", Location = "Los Angeles", Rating = 4.6, Bio = "Experienced with dogs and cats.", IsAvailable = true },
            new Sitter { Name = "Carol Lee", Location = "Chicago", Rating = 4.9, Bio = "Pet care professional.", IsAvailable = false }
        );
        db.SaveChanges();
    }
}

app.Run();
