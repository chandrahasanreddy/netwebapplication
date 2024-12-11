using Microsoft.AspNetCore.Mvc;
// using Microsoft.AspNetCore.Mvc.Abstractions;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InputSectionController : ControllerBase
    {
        [HttpPost()]
        public IActionResult InputSection([FromBody] InputSecData inp)
        {
            Console.WriteLine(inp.a);
            Console.WriteLine(inp.precision);
            if (inp == null) {
            return BadRequest("Invalid input");}
            
            double sum= inp.a + inp.b + inp.c + inp.d;
            double adjustedsum= sum*(1+inp.error/100.0);
            double average=sum/4;
            int[] NumbersRequest = { inp.a, inp.b, inp.c, inp.d };
            Array.Sort(NumbersRequest);
            double median= (NumbersRequest[1]+NumbersRequest[2])/2.0;

            if (inp.precision==true)
            {
                adjustedsum = Math.Round(adjustedsum, 2);
                average = Math.Round(average, 2);
                median = Math.Round(median, 2);

            }
            
            var response= new {
                adjustedsum=adjustedsum,
                average=average,
                median=median,
            };

            
            return Ok(response); //status 200
        }
    }

    public class InputSecData
    {
        public int a { get; set; }
        public int b { get; set; }
        public int c { get; set; }
        public int d { get; set; }
        public int error { get; set; }
        public Boolean precision { get; set; }
    }
}
