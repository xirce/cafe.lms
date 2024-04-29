using CafeLms.Api.DataModel;
using CafeLms.Api.Managers.Interfaces;
using IdentityServer4.Extensions;
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
    public async Task<SaveCourseResponse> SaveCourse(SaveCourseRequest request)
    {
        return await coursesManager.SaveCourse(request);
    }

    [HttpGet]
    public async Task<GetCoursesResponse> GetCourses(Guid? userId = null)
    {
        return await coursesManager.GetCourses(userId?.ToString() ?? User.GetSubjectId(), userId != null);
    }

    [HttpGet("{courseId}")]
    public async Task<GetCourseResponse> GetCourse(Guid courseId)
    {
        return await coursesManager.GetCourse(courseId, User.GetSubjectId());
    }
}

public record SaveCourseRequest
{
    public Guid? Id { get; init; }
    public string Title { get; init; }
    public string? PreviewImageUrl { get; init; } 
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
    public UserUnitProgress? Progress { get; set; }
}

public record UserUnitProgress
{
    public UserUnitStatus Status { get; set; }
}

public record SaveCourseResponse
{
    public Guid Id { get; init; }
    public string Title { get; init; }
    public string? PreviewImageUrl { get; init; }
    public PositionInfo Position { get; init; }
}

public record GetCoursesResponse(CourseInfo[] Courses);

public record CourseInfo
{
    public Guid Id { get; init; }
    public string Title { get; init; }
    public string PreviewImageUrl { get; init; }
    public int UnitsCount { get; init; }
    public PositionInfo Position { get; set; }
    public CourseProgress? Progress { get; set; }
}

public record CourseProgress
{
    public string UserId { get; init; }
    public int UnitsDoneCount { get; init; }
}
