namespace CafeLms.Api.Managers.Interfaces;

public interface IAuthorizationProvider
{
    Task<string[]> GetUserPermissions(string userId);
}