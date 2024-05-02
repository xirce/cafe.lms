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

        var dbContext = serviceProvider.GetRequiredService<CafeLmsDbContext>();
        var database = dbContext.Database;
        if (database.IsRelational())
            database.Migrate();

        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = serviceProvider.GetRequiredService<UserManager<CafeLmsUser>>();

        var internPosition = SeedPosition(dbContext, roleManager, "intern", "Стажёр", 0);
        var baristaPosition = SeedPosition(dbContext, roleManager, "barista", "Бариста", 1);
        SeedPosition(dbContext, roleManager, "manager", "Менеджер", 2);
        SeedPosition(dbContext, roleManager, "administrator", "Управляющий", 3);
        var hrPosition = SeedPosition(dbContext, roleManager, "hr", "Менеджер по персоналу", 4);

        var intern = new CafeLmsUser
        {
            FirstName = "Юзер",
            LastName = "Юзеров",
            MiddleName = "Юзерович",
            Email = "user@mail.ru",
            UserName = "user@mail.ru",
            PositionId = internPosition.Id
        };
        
        var barista = new CafeLmsUser
        {
            FirstName = "Бариста",
            LastName = "Баристов",
            MiddleName = "Баристович",
            Email = "barista@mail.ru",
            UserName = "barista@mail.ru",
            PositionId = baristaPosition.Id
        };

        var hr = new CafeLmsUser
        {
            FirstName = "Эйчар",
            LastName = "Эйчаров",
            MiddleName = "Эйчарович",
            Email = "hr@mail.ru",
            UserName = "hr@mail.ru",
            PositionId = hrPosition.Id
        };

        SeedUser(userManager, intern, "User123.");
        SeedUser(userManager, barista, "User123.");
        SeedUser(userManager, hr, "Hr123.");
    }

    private static Position SeedPosition(
        CafeLmsDbContext dbContext,
        RoleManager<IdentityRole> roleManager,
        string id,
        string title,
        int order)
    {
        var internRole = SeedRole(roleManager, id);
        var position = dbContext.Positions.SingleOrDefault(p => p.Id == id);
        if (position is null)
        {
            position = new Position
            {
                Id = id,
                Order = order,
                Title = title,
                RoleId = internRole.Id
            };
            dbContext.Positions.Add(position);
            dbContext.SaveChanges();
        }

        return position;
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
