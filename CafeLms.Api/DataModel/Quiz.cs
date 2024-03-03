namespace CafeLms.Api.DataModel;

public class Quiz
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public Question[] Questions { get; set; }
}
