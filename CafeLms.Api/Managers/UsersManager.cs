using CafeLms.Api.Controllers;
using CafeLms.Api.DataModel;
using CafeLms.Api.Infrastructure;
using CafeLms.Api.Managers.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace CafeLms.Api.Managers;

public class UsersManager : IUsersManager
{
    private readonly UserManager<CafeLmsUser> userManager;
    private readonly CadeLmsDbContext dbContext;

    public UsersManager(UserManager<CafeLmsUser> userManager, CadeLmsDbContext dbContext)
    {
        this.userManager = userManager;
        this.dbContext = dbContext;
    }

    public async Task<GetUserResponse> GetUser(string id)
    {
        var user = await userManager.FindByIdAsync(id);

        var position = await dbContext.Positions.FindAsync(user.PositionId);

        return new GetUserResponse
        {
            Id = id,
            LastName = user.LastName,
            FirstName = user.FirstName,
            MiddleName = user.MiddleName,
            Email = user.Email,
            Position = new PositionInfo
            {
                Id = position.Id,
                Title = position.Title
            }
        };
    }

    public async Task ChangeUser(ChangeUserRequest request)
    {
        var user = await userManager.FindByIdAsync(request.UserId);

        user.FirstName = request.FirstName;
        user.LastName = request.LastName;
        user.MiddleName = request.MiddleName;
        user.Email = request.Email;

        await userManager.UpdateAsync(user);
    }
}
