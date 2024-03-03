namespace CafeLms.Api.DataModel;

public class UserUnit
{
    public string UserId { get; set; }
    public Guid UnitId { get; set; }
    public UserUnitStatus Status { get; set; }
}

public enum UserUnitStatus
{
    InProgress,
    Done
}
