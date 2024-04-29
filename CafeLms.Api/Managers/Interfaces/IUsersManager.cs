using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using CafeLms.Api.Controllers;

namespace CafeLms.Api.Managers.Interfaces;

public interface IUsersManager
{
    Task<UserInfo> GetUser(string id);
    Task ChangeUser(ChangeUserRequest request);
    Task<GetUsersResponse> GetUsers();
}

public record GetUsersResponse(UserInfo[] Users);

public record ChangeUserRequest
{
    [JsonIgnore]
    public string? UserId { get; init; }
    public string FirstName { get; init; }
    public string LastName { get; init; }
    public string MiddleName { get; init; }

    [EmailAddress]
    public string? Email { get; init; }
}
