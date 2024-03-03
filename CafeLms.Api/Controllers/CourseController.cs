using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CafeLms.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/courses")]
public class CourseController : ControllerBase
{
    private readonly ICoursesManager coursesManager;

    public CourseController(ICoursesManager coursesManager)
    {
        this.coursesManager = coursesManager;
    }

    [HttpPost]
    public async Task<CreateCourseResponse> SaveCourse(CreateCourseRequest request)
    {
        return await coursesManager.SaveCourse(request);
    }

    [HttpGet]
    public async Task<GetCoursesResponse> GetCourses()
    {
        return await coursesManager.GetCourses();
    }

    [HttpGet("{courseId}")]
    public async Task<GetCourseResponse> GetCourse(Guid id)
    {
        return await coursesManager.GetCourse(id);
    }
}

public record CreateCourseRequest
{
    public string Title { get; init; }
    public string PositionId { get; set; }
}

public record GetCourseResponse : CourseInfo
{
    public Unit[] Units { get; set; }
}

public class Unit
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public int Order { get; set; }
}

public interface ICoursesManager
{
    Task<CreateCourseResponse> SaveCourse(CreateCourseRequest request);
    Task<GetCoursesResponse> GetCourses();
    Task<GetCourseResponse> GetCourse(Guid id);
}

public record CreateCourseResponse
{
    public Guid Id { get; init; }
    public string Title { get; init; }
    public PositionInfo Position { get; init; }
}

public record GetCoursesResponse(CourseInfo[] Courses);

public record CourseInfo
{
    public Guid Id { get; init; }
    public string Title { get; init; }
    public PositionInfo Position { get; init; }
}
