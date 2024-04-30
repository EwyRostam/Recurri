namespace Backend.Models.DTOs
{
    public class EventDTO
    {
        public required string Name { get; set; }
        public string? Description { get; set; }
        public int Day { get; set; }
        public string? StartTime { get; set; }
        public string? EndTime { get; set; }
        public string? Recurrence { get; set; }
        public int WeekNumber {get; set;}
    }
}