using CafeLms.Api.Controllers;

namespace CafeLms.Api.Managers.Interfaces;

public interface IPositionsManager
{
    Task<GetPositionsResponse> GetPositions();
}