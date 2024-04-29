namespace Backend.Models
{
    public class Week
    {
         public int Id { get; set; }
        public int Number {get; set;}
        public ICollection<Event> Events {get; set;} = [];
    }
}