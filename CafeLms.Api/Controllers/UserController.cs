using CafeLms.Api.Managers.Interfaces;
using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace CafeLms.Api.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly IUsersManager usersManager;
    private readonly IAuthorizationProvider authorizationProvider;

    public UserController(IUsersManager usersManager, IAuthorizationProvider authorizationProvider)
    {
        this.usersManager = usersManager;
        this.authorizationProvider = authorizationProvider;
    }

    [HttpGet]
    public async Task<GetUserResponse> GetUser()
    {
        return await usersManager.GetUser(User.GetSubjectId());
    }

    [HttpPost]
    public async Task ChangePersonalData(ChangeUserRequest request)
    {
        request = request with { UserId = User.GetSubjectId() };
        await usersManager.ChangeUser(request);
    }

    [HttpGet("permissions")]
    public async Task<GetUserPermissionsResponse> GetPermissions()
    {
        var permissions = await authorizationProvider.GetUserPermissions(User.GetSubjectId());
        return new GetUserPermissionsResponse(permissions);
    }

    [HttpGet("{userId}")]
    public async Task<GetUserResponse> GetUser(string userId)
    {
        return await usersManager.GetUser(userId);
    }
}

public record GetUserPermissionsResponse(string[] Permissions);

public class GetUserResponse
{
    public string Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string MiddleName { get; set; }
    public string? Email { get; set; }
    public PositionInfo Position { get; set; }
}

public class PositionInfo
{
    public string Id { get; set; }
    public string Title { get; set; }
}
