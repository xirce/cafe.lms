namespace CafeLms.Api.DataModel;

public class Answer
{
    public Guid Id { get; set; }
    public Guid QuestionId { get; set; }
    public string Content { get; set; }
    public int Order { get; set; }
}
