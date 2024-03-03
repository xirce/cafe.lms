using CafeLms.Api.DataModel;
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

    [HttpGet]
    public async Task<GetCoursesResponse> GetCourses()
    {
        return await coursesManager.GetCourses();
    }

    [HttpGet("{id}")]
    public async Task<GetCourseResponse> GetCourse(Guid id)
    {
        return await coursesManager.GetCourse(id);
    }
}

public record GetCourseResponse(Course Course);

public class Course : CourseInfo
{
    public Chapter[] Chapters { get; set; }
}

public class Chapter
{
    public string Title { get; set; }
    public int Position { get; set; }
    public Unit[] Units { get; set; } 
}

public class Unit
{
    public string Title { get; set; }
    public int Position { get; set; }
    public UnitType Type { get; set; }
    public UnitStatus Status { get; set; }
}

public enum UnitType
{
    Lecture,
    Quiz
}

public enum UnitStatus
{
    NotCompleted,
    Completed
}

public interface ICoursesManager
{
    Task<GetCoursesResponse> GetCourses();
    Task<GetCourseResponse> GetCourse(Guid id);
}

public record GetCoursesResponse(CourseInfo[] Courses);

public class CourseInfo
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public Position Position { get; set; }
}