using CafeLms.Api.Controllers;
using CafeLms.Api.DataModel;
using CafeLms.Api.Infrastructure;
using CafeLms.Api.Managers.Interfaces;
using Microsoft.EntityFrameworkCore;
using Unit = CafeLms.Api.Controllers.Unit;

namespace CafeLms.Api.Managers;

public class CoursesManager : ICoursesManager
{
    private readonly CafeLmsDbContext dbContext;

    public CoursesManager(CafeLmsDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task<SaveCourseResponse> SaveCourse(SaveCourseRequest request)
    {
        var course = await dbContext.Courses.FindAsync(request.Id);

        if (course is null)
        {
            course = new Course();
            await dbContext.Courses.AddAsync(course);
        }

        course.Title = request.Title;
        course.PreviewImageUrl = request.PreviewImageUrl;
        course.PositionId = request.PositionId;

        await dbContext.SaveChangesAsync();

        var position = await dbContext.Positions.FindAsync(course.PositionId);

        return new SaveCourseResponse
        {
            Id = course.Id,
            Title = course.Title,
            PreviewImageUrl = course.PreviewImageUrl,
            Position = new PositionInfo
            {
                Id = position.Id,
                Title = position.Title
            }
        };
    }

    public async Task<GetCoursesResponse> GetCourses(string? userId = null, bool onlyUser = false)
    {
        IQueryable<Course> baseCoursesQuery;
        if (userId != null && onlyUser)
        {
            baseCoursesQuery = dbContext.UserCourses
                .Include(u => u.Course)
                .ThenInclude(c => c.Units)
                .Include(u => u.Course)
                .ThenInclude(c => c.Position)
                .Where(u => u.UserId == userId)
                .Select(u => u.Course);
        }
        else
        {
            baseCoursesQuery = dbContext.Courses
                .Include(c => c.Units)
                .Include(c => c.Position);
        }

        var courses = await baseCoursesQuery
            .Select(
                c => new CourseInfo
                {
                    Id = c.Id,
                    Title = c.Title,
                    PreviewImageUrl = c.PreviewImageUrl,
                    UnitsCount = c.Units.Count,
                    Position = new PositionInfo
                    {
                        Id = c.Position.Id,
                        Title = c.Position.Title
                    }
                }).ToArrayAsync();

        var userDoneUnits = await dbContext.UserUnits
            .Include(u => u.Unit)
            .Where(u => u.UserId == userId && u.Status == UserUnitStatus.Done)
            .GroupBy(u => u.Unit.CourseId)
            .ToDictionaryAsync(u => u.Key, u => u.ToArray());

        foreach (var course in courses)
        {
            if (userDoneUnits.TryGetValue(course.Id, out var courseDoneUnits))
                course.Progress = new CourseProgress
                {
                    UserId = userId,
                    UnitsDoneCount = courseDoneUnits.Length
                };
        }

        return new GetCoursesResponse(courses);
    }

    public async Task<GetCourseResponse> GetCourse(Guid id, string? userId = null)
    {
        var course = await dbContext.Courses
            .Include(c => c.Position)
            .Include(c => c.Units)
            .Where(c => c.Id == id)
            .Select(
                c => new GetCourseResponse
                {
                    Id = c.Id,
                    Title = c.Title,
                    PreviewImageUrl = c.PreviewImageUrl,
                    UnitsCount = c.Units.Count,
                    Units = c.Units
                        .Select(
                            u => new Unit
                            {
                                Id = u.Id,
                                Title = u.Title,
                                Order = u.Order
                            })
                        .ToArray(),
                    Position = new PositionInfo
                    {
                        Id = c.Position.Id,
                        Title = c.Position.Title
                    },
                })
            .FirstOrDefaultAsync();

        var userUnits = await dbContext.UserUnits
            .Include(u => u.Unit)
            .Where(u => u.UserId == userId && u.Unit.CourseId == id)
            .ToDictionaryAsync(u => u.UnitId);

        course.Progress = new CourseProgress
        {
            UnitsDoneCount = userUnits.Values.Count(u => u.Status is UserUnitStatus.Done)
        };

        foreach (var unit in course.Units)
        {
            if (userUnits.TryGetValue(unit.Id, out var userUnit))
                unit.Progress = new UserUnitProgress
                {
                    Status = userUnit.Status
                };
        }

        return course;
    }
}
