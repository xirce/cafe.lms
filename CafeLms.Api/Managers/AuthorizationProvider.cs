using System.Security.Claims;
using CafeLms.Api.Managers.Interfaces;
using ClaimTypes = CafeLms.Api.Authorization.ClaimTypes;

namespace CafeLms.Api.Managers;

public class AuthorizationProvider : IAuthorizationProvider
{
    public Task<string[]> GetUserPermissions(ClaimsPrincipal user)
    {
        return Task.FromResult(user.Claims
            .Where(c => c.Type == ClaimTypes.Permission)
            .Select(c => c.Value)
            .ToArray());
    }
}
