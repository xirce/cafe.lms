namespace CafeLms.Api.DataModel;

public class AnswerAttempt
{
    public Guid QuestionId { get; set; }
    public List<Guid> Answer { get; set; }
}
