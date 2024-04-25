using CafeLms.Api.Controllers;

namespace CafeLms.Api.Managers.Interfaces;

public interface ICoursesManager
{
    Task<CreateCourseResponse> SaveCourse(CreateCourseRequest request);
    Task<GetCoursesResponse> GetCourses();
    Task<GetCourseResponse> GetCourse(Guid id);
}
