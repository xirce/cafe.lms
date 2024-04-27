namespace CafeLms.Api.DataModel;

public class AnswerAttemptWithResult : AnswerAttempt
{
    public bool IsCorrect { get; set; }
    public Guid[] IncorrectAnswerIds { get; set; } 
}
