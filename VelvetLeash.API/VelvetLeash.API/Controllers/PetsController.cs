using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VelvetLeash.API.Data;
using VelvetLeash.API.Models;

namespace VelvetLeash.API.Controllers
{
    [ApiController]
    [Route("api/pets")]
    public class PetsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PetsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/pets
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string userId = null)
        {
            var query = _context.Pets.AsQueryable();

            if (!string.IsNullOrEmpty(userId))
            {
                query = query.Where(p => p.UserId == userId);
            }

            var pets = await query.OrderBy(p => p.Name).ToListAsync();
            return Ok(new { success = true, data = pets });
        }

        // GET: api/pets/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null) 
                return NotFound(new { success = false, message = "Pet not found" });
            
            return Ok(new { success = true, data = pet });
        }

        // GET: api/pets/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserPets(string userId)
        {
            var pets = await _context.Pets
                .Where(p => p.UserId == userId)
                .OrderBy(p => p.Name)
                .ToListAsync();

            return Ok(new { success = true, data = pets });
        }

        // POST: api/pets
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePetDto petDto)
        {
            if (petDto == null)
                return BadRequest(new { success = false, message = "Invalid pet data" });

            var pet = new Pet
            {
                Name = petDto.Name,
                Type = petDto.Type,
                Size = petDto.Size,
                Age = petDto.Age,
                GetAlongWithDogs = petDto.GetAlongWithDogs,
                GetAlongWithCats = petDto.GetAlongWithCats,
                IsUnsureWithDogs = petDto.IsUnsureWithDogs,
                IsUnsureWithCats = petDto.IsUnsureWithCats,
                SpecialInstructions = petDto.SpecialInstructions,
                MedicalConditions = petDto.MedicalConditions,
                UserId = petDto.UserId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Pets.Add(pet);
            await _context.SaveChangesAsync();

            return Ok(new 
            { 
                success = true, 
                message = "Pet created successfully",
                data = pet
            });
        }

        // PUT: api/pets/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdatePetDto petDto)
        {
            var existingPet = await _context.Pets.FindAsync(id);
            if (existingPet == null)
                return NotFound(new { success = false, message = "Pet not found" });

            // Update properties
            existingPet.Name = petDto.Name;
            existingPet.Type = petDto.Type;
            existingPet.Size = petDto.Size;
            existingPet.Age = petDto.Age;
            existingPet.GetAlongWithDogs = petDto.GetAlongWithDogs;
            existingPet.GetAlongWithCats = petDto.GetAlongWithCats;
            existingPet.IsUnsureWithDogs = petDto.IsUnsureWithDogs;
            existingPet.IsUnsureWithCats = petDto.IsUnsureWithCats;
            existingPet.SpecialInstructions = petDto.SpecialInstructions;
            existingPet.MedicalConditions = petDto.MedicalConditions;
            existingPet.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new 
            { 
                success = true, 
                message = "Pet updated successfully",
                data = existingPet
            });
        }

        // DELETE: api/pets/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null) 
                return NotFound(new { success = false, message = "Pet not found" });

            _context.Pets.Remove(pet);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Pet deleted successfully" });
        }

        // GET: api/pets/types
        [HttpGet("types")]
        public IActionResult GetPetTypes()
        {
            var petTypes = new[]
            {
                new { id = 1, name = "Dog" },
                new { id = 2, name = "Cat" },
                new { id = 3, name = "Bird" },
                new { id = 4, name = "Fish" },
                new { id = 5, name = "Other" }
            };

            return Ok(new { success = true, data = petTypes });
        }

        // GET: api/pets/sizes
        [HttpGet("sizes")]
        public IActionResult GetPetSizes()
        {
            var petSizes = new[]
            {
                new { id = 1, name = "Small (0-25 lbs)" },
                new { id = 2, name = "Medium (26-60 lbs)" },
                new { id = 3, name = "Large (61-100 lbs)" },
                new { id = 4, name = "Extra Large (100+ lbs)" }
            };

            return Ok(new { success = true, data = petSizes });
        }

        // GET: api/pets/ages
        [HttpGet("ages")]
        public IActionResult GetPetAges()
        {
            var petAges = new[]
            {
                new { id = 1, name = "Puppy/Kitten (0-1 year)" },
                new { id = 2, name = "Young (1-3 years)" },
                new { id = 3, name = "Adult (3-7 years)" },
                new { id = 4, name = "Senior (7+ years)" }
            };

            return Ok(new { success = true, data = petAges });
        }
    }

    public class CreatePetDto
    {
        public string Name { get; set; }
        public int Type { get; set; }
        public int Size { get; set; }
        public int Age { get; set; }
        public bool GetAlongWithDogs { get; set; }
        public bool GetAlongWithCats { get; set; }
        public bool IsUnsureWithDogs { get; set; }
        public bool IsUnsureWithCats { get; set; }
        public string SpecialInstructions { get; set; }
        public string MedicalConditions { get; set; }
        public string UserId { get; set; }
    }

    public class UpdatePetDto
    {
        public string Name { get; set; }
        public int Type { get; set; }
        public int Size { get; set; }
        public int Age { get; set; }
        public bool GetAlongWithDogs { get; set; }
        public bool GetAlongWithCats { get; set; }
        public bool IsUnsureWithDogs { get; set; }
        public bool IsUnsureWithCats { get; set; }
        public string SpecialInstructions { get; set; }
        public string MedicalConditions { get; set; }
    }
}
