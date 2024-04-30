namespace Backend.Models
{
    public class Week
    {
         public int Id { get; set; }
        public int Number {get; set;}
        public ICollection<Event> Events {get; set;} = [];
        public int TemplateId {get; set;}
        public required Template Template {get; set;}
    }
}