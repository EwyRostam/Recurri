using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class TemplateContext : DbContext
    {
        public TemplateContext(DbContextOptions<TemplateContext> options) : base(options)
        {

        }
        public DbSet<Template> Templates {get; set;}
        public DbSet<Week> Weeks {get; set;}
        public DbSet<Event> Events {get; set;}
    }
}