namespace CafeLms.Api.DataModel;

public class UserCourse
{
    public string UserId { get; set; }
    public Guid CourseId { get; set; }
    public CourseStatus Status { get; set; }
}

public enum CourseStatus
{
    InProgress,
    Completed,
}
