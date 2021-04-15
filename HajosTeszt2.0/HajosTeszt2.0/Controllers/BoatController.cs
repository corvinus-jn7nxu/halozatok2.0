using HajosTeszt2._0.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HajosTeszt2._0.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class BoatController : ControllerBase
    {
        [HttpGet]
        [Route("questions/all")]
        public ActionResult M1()
        {   

            hajostesztContext context = new hajostesztContext();
            var kérdések = from x in context.Questions select x.QuestionText;

            return new JsonResult(kérdések);
        }
    }
}
