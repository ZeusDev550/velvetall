using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using VelvetLeash.API.Data;
using VelvetLeash.API.Model;

namespace VelvetLeash.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SittersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public SittersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/sitters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sitter>>> GetSitters()
        {
            return await _context.Sitters.ToListAsync();
        }
    }
} 