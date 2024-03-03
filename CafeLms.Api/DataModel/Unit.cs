namespace CafeLms.Api.DataModel;

public class Unit
{
    public Guid Id { get; set; }
    public Guid CourseId { get; set; }
    public int Order { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public QuestionInternalModel[] Questions { get; set; }
}
