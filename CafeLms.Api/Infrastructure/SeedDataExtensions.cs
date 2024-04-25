using CafeLms.Api.DataModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CafeLms.Api.Infrastructure;

internal static class SeedDataExtensions
{
    public static void EnsureDataSeeded(this IApplicationBuilder applicationBuilder)
    {
        var scope = applicationBuilder.ApplicationServices.CreateScope();
        var serviceProvider = scope.ServiceProvider;

        var dbContext = serviceProvider.GetRequiredService<CadeLmsDbContext>();
        var database = dbContext.Database;
        if (database.IsRelational())
            database.Migrate();

        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = serviceProvider.GetRequiredService<UserManager<CafeLmsUser>>();

        var internRole = SeedRole(roleManager, "intern");
        var internPosition = dbContext.Positions.SingleOrDefault(p => p.Id == "intern");
        if (internPosition is null)
        {
            internPosition = new Position
            {
                Id = "intern",
                Order = 0,
                Title = "Стажёр",
                RoleId = internRole.Id
            };
            dbContext.Positions.Add(internPosition);
            dbContext.SaveChanges();
        }

        var user1 = new CafeLmsUser
        {
            FirstName = "Юзер",
            LastName = "Юзеров",
            MiddleName = "Юзерович",
            Email = "user@mail.ru",
            UserName = "user@mail.ru",
            PositionId = internPosition.Id
        };

        SeedUser(userManager, user1, "User123.");
    }

    private static IdentityRole SeedRole(RoleManager<IdentityRole> roleManager, string roleName)
    {
        var presentRole = roleManager.FindByNameAsync(roleName).GetAwaiter().GetResult();
        if (presentRole is null)
        {
            var role = new IdentityRole(roleName);
            var identityResult = roleManager.CreateAsync(role).GetAwaiter().GetResult();
            if (!identityResult.Succeeded)
                throw new Exception(identityResult.Errors.First().Description);
            return role;
        }

        return presentRole;
    }

    private static void SeedUser(UserManager<CafeLmsUser> userManager, CafeLmsUser user, string password)
    {
        var presentUser = userManager.FindByEmailAsync(user.Email).GetAwaiter().GetResult();
        if (presentUser is null)
        {
            var identityResult = userManager.CreateAsync(user, password).GetAwaiter().GetResult();
            if (!identityResult.Succeeded)
                throw new Exception(identityResult.Errors.First().Description);
        }
    }
}
