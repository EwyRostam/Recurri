using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class TemplatesController : ControllerBase
    {
         private readonly TemplateContext _context;

        public TemplatesController(TemplateContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Template>>> GetTemplates()
        {
            var userEmail = User.Claims.FirstOrDefault(claim => claim.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")!.Value;
            return await _context.Templates
            .Include(t => t.Weeks)
            .ThenInclude(w => w.Events)
            .Where(template => template.UserEmail == userEmail)
            .ToListAsync();
        }
    }
}