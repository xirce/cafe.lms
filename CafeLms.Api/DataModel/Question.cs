namespace CafeLms.Api.DataModel;

public class Question
{
    public string Content { get; set; }
    public int Position { get; set; }
    public QuestionType Type { get; set; } 
    public Answer[]? Answers { get; set; }
    public string CorrectAnswer { get; set; }
}

public enum QuestionType
{
    SingleCorrect,
    SingleOrManyCorrect,
    Text
}
