namespace TaskManager.API.Models;

public class Label
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Color { get; set; } = "#6366f1";
    public int OwnerId { get; set; }
    public User Owner { get; set; } = null!;
    public ICollection<TaskLabel> TaskLabels { get; set; } = [];
}
