using CafeLms.Api.DataModel;
using Microsoft.AspNetCore.Mvc;

namespace CafeLms.Api.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly IUsersManager usersManager;

    public UserController(IUsersManager usersManager)
    {
        this.usersManager = usersManager;
    }

    [HttpGet("{id}")]
    public async Task<GetUserResponse> GetUser(string id)
    {
        return await usersManager.GetUser(id);
    }
}

public interface IUsersManager
{
    Task<GetUserResponse> GetUser(string id);
}

public class GetUserResponse    
{
    public string Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string MiddleName { get; set; }
    public Position Position { get; set; }
}
