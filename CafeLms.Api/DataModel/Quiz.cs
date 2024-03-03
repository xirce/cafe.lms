namespace CafeLms.Api.DataModel;

public class Quiz
{
    public Guid Id { get; set; }
    public Guid UnitId { get; set; }
    public QuestionInternalModel[] Questions { get; set; }
}
