using CafeLms.Api.Controllers;
using CafeLms.Api.DataModel;
using CafeLms.Api.Infrastructure;
using CafeLms.Api.Managers.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CafeLms.Api.Managers;

public class UsersManager : IUsersManager
{
    private readonly UserManager<CafeLmsUser> userManager;
    private readonly CafeLmsDbContext dbContext;

    public UsersManager(UserManager<CafeLmsUser> userManager, CafeLmsDbContext dbContext)
    {
        this.userManager = userManager;
        this.dbContext = dbContext;
    }

    public async Task<UserInfo> GetUser(string id)
    {
        var user = await userManager.FindByIdAsync(id);

        var position = await dbContext.Positions.FindAsync(user.PositionId);

        return new UserInfo
        {
            Id = id,
            LastName = user.LastName,
            FirstName = user.FirstName,
            MiddleName = user.MiddleName,
            Email = user.Email,
            Position = new PositionInfo
            {
                Id = position.Id,
                Title = position.Title,
                Order = position.Order
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

    public async Task<GetUsersResponse> GetUsers()
    {
        var users = await dbContext.Users
            .Include(u => u.Position)
            .Select(u => new UserInfo
            {
                Id = u.Id,
                LastName = u.LastName,
                FirstName = u.FirstName,
                MiddleName = u.MiddleName,
                Email = u.Email,
                Position = new PositionInfo
                {
                    Id = u.Position.Id,
                    Title = u.Position.Title,
                    Order = u.Position.Order
                }
            })
            .ToArrayAsync();

        return new GetUsersResponse(users);
    }
}
