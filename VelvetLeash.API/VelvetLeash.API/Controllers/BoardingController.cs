using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using VelvetLeash.API.Data;
using VelvetLeash.API.Model;

namespace VelvetLeash.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BoardingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public BoardingController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBoardingRequest([FromBody] BoardingRequest request)
        {
            if (request == null)
                return BadRequest("Invalid data");

            _context.BoardingRequests.Add(request);
            await _context.SaveChangesAsync();
            return Ok(new { success = true, message = "Boarding request saved" });
        }
    }
} 