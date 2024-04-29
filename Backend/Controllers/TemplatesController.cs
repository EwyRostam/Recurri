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

        [HttpGet("{id}")]
        public async Task<ActionResult<Template>> GetTemplate(int id)
        {
            var template = await _context.Templates
            .Include(t => t.Weeks)
            .ThenInclude(w => w.Events).FirstOrDefaultAsync(t => t.Id == id);

            if (template == null)
            {
                return NotFound();
            }

            return template;
        }

        [HttpPost]
        public async Task<ActionResult<Template>> PostTemplate(Template template)
        {
            await _context.Templates.AddAsync(template);
            template.Weeks.Select(week => _context.Weeks.Add(week));
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTemplate", new { id = template.Id }, template);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Template>> PutTemplate(int id, [FromBody] Template template)
        {
            if (id != template.Id)
            {
                return BadRequest();
            }

            var templateToUpdate = await _context.Templates
            .Include(t => t.Weeks)
            .ThenInclude(w => w.Events)
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == id);

            if (templateToUpdate == null)
            {
                return NotFound();
            }

            templateToUpdate = template;
            templateToUpdate.Weeks = template.Weeks;

            _context.Templates.Update(templateToUpdate);
            await _context.SaveChangesAsync();

            await _context.SaveChangesAsync();


            return NoContent();
        }



    }
}