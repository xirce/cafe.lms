using CafeLms.Api.Managers.Interfaces;

namespace CafeLms.Api.Managers;

public class AuthorizationProvider : IAuthorizationProvider
{
    public async Task<string[]> GetUserPermissions(string userId)
    {
        return Array.Empty<string>();
    }
}
