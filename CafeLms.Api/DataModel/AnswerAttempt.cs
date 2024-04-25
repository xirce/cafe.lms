namespace CafeLms.Api.DataModel;

public class AnswerAttempt
{
    public Guid QuestionId { get; set; }
    public string Answer { get; set; }
}
