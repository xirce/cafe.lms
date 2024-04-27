using CafeLms.Api.Controllers;

namespace CafeLms.Api.Managers.Interfaces;

public interface ICoursesManager
{
    Task<SaveCourseResponse> SaveCourse(SaveCourseRequest request);
    Task<GetCoursesResponse> GetCourses(string? userId = null, bool onlyUser = false);
    Task<GetCourseResponse> GetCourse(Guid id, string? userId = null);
}