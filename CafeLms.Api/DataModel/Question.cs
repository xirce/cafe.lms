namespace CafeLms.Api.DataModel;

public class Question
{
    public Guid Id { get; set; }
    public Guid QuizId { get; set; }
    public string Content { get; set; }
    public int Order { get; set; }
    public AnswerType AnswerType { get; set; }
    public ICollection<Answer> Answers { get; set; }
}

public class QuestionInternalModel : Question
{
    public List<Guid> CorrectAnswer { get; set; }
}

public enum AnswerType
{
    SingleCorrect,
    ManyCorrect,
    Text
}
