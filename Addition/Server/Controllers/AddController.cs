using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AddController : ControllerBase
    {
        [HttpPost()]
        public IActionResult AddNumbers([FromBody] NumbersRequest request)
        {
            if (request == null) {
            return BadRequest("Invalid input");}
            int sum = request.Num1 + request.Num2;
            return Ok(new { sum }); //status 200
        }
    }

    public class NumbersRequest
    {
        public int Num1 { get; set; }
        public int Num2 { get; set; }
    }
}
