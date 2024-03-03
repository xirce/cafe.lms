using CafeLms.Api.DataModel;
using Microsoft.AspNetCore.Mvc;

namespace CafeLms.Api.Controllers;

[ApiController]
[Route("api/users/{userId}/courses")]
public class UserCoursesController : ControllerBase
{
    private readonly IUsersCoursesProvider usersCoursesProvider;

    public UserCoursesController(IUsersCoursesProvider usersCoursesProvider)
    {
        this.usersCoursesProvider = usersCoursesProvider;
    }

    [HttpGet]
    public async Task<GetUserCoursesResponse> GetUserCourses(string userId)
    {
        return await usersCoursesProvider.GetUserCourses(userId);
    }

    [HttpGet("{courseId}")]
    public async Task<GetUserCourseResponse> GetUserCourse(string userId, Guid courseId)
    {
        var request = new GetUserCourseRequest(userId, courseId);
        return await usersCoursesProvider.GetUserCourse(request);
    }
}

public record GetUserCourseResponse : CourseInfo
{
    public UserUnit[] UserUnits { get; set; }
}

public interface IUsersCoursesProvider
{
    Task<GetUserCourseResponse> GetUserCourse(GetUserCourseRequest request);
    Task<GetUserCoursesResponse> GetUserCourses(string userId);
}

public record GetUserCoursesResponse(UserCourse[] UserCourses);

public record UserCourse : CourseInfo
{
    public CourseStatus Status { get; set; }
}

public record GetUserCourseRequest(string UserId, Guid CourseId);

public class UserUnit : Unit
{
    public UserUnitStatus Status { get; set; }
}
