using System.Security.Claims;

namespace CafeLms.Api.Managers.Interfaces;

public interface IAuthorizationProvider
{
    Task<string[]> GetUserPermissions(ClaimsPrincipal user);
}