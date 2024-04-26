namespace CafeLms.Api.DataModel;

public class Course
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string PreviewImageUrl { get; set; }
    public string PositionId { get; set; }
    public Position Position { get; set; }
    public Unit[] Units { get; set; }
}
