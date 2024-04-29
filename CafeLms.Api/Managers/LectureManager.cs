using CafeLms.Api.Controllers;
using CafeLms.Api.Infrastructure;
using CafeLms.Api.Managers.Interfaces;
using Microsoft.EntityFrameworkCore;
using Unit = CafeLms.Api.DataModel.Unit;

namespace CafeLms.Api.Managers;

public class LectureManager : ILectureManager
{
    private readonly CafeLmsDbContext dbContext;

    public LectureManager(CafeLmsDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task<SaveLectureResponse> SaveLecture(SaveLectureRequest request)
    {
        var unit = await dbContext.Units.FirstOrDefaultAsync(
            u => u.CourseId == request.CourseId && u.Id == request.LectureId);

        if (unit is null)
        {
            unit = new Unit { CourseId = request.CourseId };
            await dbContext.Units.AddAsync(unit);
        }

        unit.Title = request.Title;
        unit.Content = request.Content;
        unit.Order = request.Order;
        unit.VideoUrl = request.VideoUrl;

        await dbContext.SaveChangesAsync();

        return new SaveLectureResponse
        {
            Id = unit.Id,
            Title = unit.Title,
            Content = unit.Content,
            Order = unit.Order
        };
    }

    public async Task<GetLectureResponse> GetLecture(Guid unitId)
    {
        var unit = await dbContext.Units.FirstOrDefaultAsync(u => u.Id == unitId);

        return new GetLectureResponse
        {
            Id = unit.Id,
            CourseId = unit.CourseId,
            Title = unit.Title,
            Content = unit.Content,
            VideoUrl = unit.VideoUrl,
            Order = unit.Order
        };
    }
}
