using Microsoft.AspNetCore.Mvc;
using Database;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Level1CategoriesController : ControllerBase
    {
        private readonly Level1Test _level1TestService;

        // Inject Level1Test service
        public Level1CategoriesController(Level1Test level1TestService)
        {
            _level1TestService = level1TestService;
        }

        // Endpoint to get Level1Categories
        [HttpGet]
        public IActionResult GetLevel1Categories()
        {
            var categories = _level1TestService.GetLevel1Categories();
            return Ok(categories); // Returns a list of categories as a JSON response
        }
    }
}
