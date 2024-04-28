using CafeLms.Api.Controllers;
using CafeLms.Api.Infrastructure;
using CafeLms.Api.Managers.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CafeLms.Api.Managers;

public class PositionsManager : IPositionsManager
{
    private readonly CafeLmsDbContext dbContext;

    public PositionsManager(CafeLmsDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task<GetPositionsResponse> GetPositions()
    {
        var positions = (await dbContext.Positions.ToArrayAsync())
            .Select(
                p => new PositionInfo
                {
                    Id = p.Id,
                    Title = p.Title,
                    Order = p.Order
                })
            .ToArray();
        return new GetPositionsResponse(positions);
    }
}
