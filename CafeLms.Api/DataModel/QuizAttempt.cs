namespace CafeLms.Api.DataModel;

public class QuizAttempt
{
    public Guid Id { get; set; }
    public string UserId { get; set; }
    public Guid QuizId { get; set; }
    public DateTime AttemptDateTime { get; set; }
    public AnswerAttemptWithResult[] Answers { get; set; }
    public bool IsCorrect { get; set; }
}
