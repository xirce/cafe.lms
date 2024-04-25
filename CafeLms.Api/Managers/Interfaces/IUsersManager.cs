using CafeLms.Api.Controllers;

namespace CafeLms.Api.Managers.Interfaces;

public interface IUsersManager
{
    Task<GetUserResponse> GetUser(string id);
}
