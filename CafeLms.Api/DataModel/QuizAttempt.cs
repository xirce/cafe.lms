namespace CafeLms.Api.DataModel;

public class QuizAttempt
{
    public DateTime AttemptDateTime { get; set; }
    public string UserId { get; set; }
    public Guid QuizId { get; set; }
    public AnswerAttempt[] Answers { get; set; }
    public bool IsCorrect { get; set; }
}

public class AnswerAttempt
{
    public Guid QuestionId { get; set; }
    public string Answer { get; set; }
    public bool IsCorrect { get; set; }
}
