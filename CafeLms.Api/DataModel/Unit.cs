namespace CafeLms.Api.DataModel;

public class Unit
{
    public Guid Id { get; set; }
    public Guid CourseId { get; set; }
    public int Order { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public string? VideoUrl { get; set; }
    public ICollection<QuestionInternalModel> Questions { get; set; }
}
