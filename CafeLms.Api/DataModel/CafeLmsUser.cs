using Microsoft.AspNetCore.Identity;

namespace CafeLms.Api.DataModel;

public class CafeLmsUser : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string MiddleName { get; set; }
    public string PositionId { get; set; }
    public Position Position { get; set; }
}