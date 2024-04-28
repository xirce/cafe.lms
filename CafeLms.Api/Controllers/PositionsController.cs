using CafeLms.Api.Managers.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CafeLms.Api.Controllers;

[Authorize]
[Route("api/positions")]
[ApiController]
public class PositionsController : ControllerBase
{
    private readonly IPositionsManager positionsManager;

    public PositionsController(IPositionsManager positionsManager)
    {
        this.positionsManager = positionsManager;
    }

    [HttpGet]
    public Task<GetPositionsResponse> GetPositions()
    {
        return positionsManager.GetPositions();
    }
}

public record GetPositionsResponse(PositionInfo[] Positions);