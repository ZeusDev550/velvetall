using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VelvetLeash.API.Data;
using VelvetLeash.API.Models;

namespace VelvetLeash.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PetsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PetsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.Pets.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null) return NotFound();
            return Ok(pet);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Pet pet)
        {
            _context.Pets.Add(pet);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = pet.Id }, pet);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Pet updatedPet)
        {
            if (id != updatedPet.Id) return BadRequest();
            _context.Entry(updatedPet).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null) return NotFound();
            _context.Pets.Remove(pet);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
