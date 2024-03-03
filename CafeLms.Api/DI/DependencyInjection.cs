using CafeLms.Api.Configuration;
using CafeLms.Api.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CafeLms.Api.DI;

public static class DependencyInjection
{
    public static IServiceCollection AddDb(this IServiceCollection services, IConfiguration configuration)
    {
        return services.AddDbContext<CadeLmsDbContext>(
            options => options.UseNpgsql(configuration.GetConnectionString("Default")));
    }

    public static IServiceCollection AddIdentityServer(this IServiceCollection services, IdentityServerSettings settings)
    {
        services.AddIdentity<CafeLmsUser, IdentityRole>()
            .AddEntityFrameworkStores<CadeLmsDbContext>()
            .AddDefaultTokenProviders();

        services.AddIdentityServer(options => { })
            .AddInMemoryIdentityResources(IdentityConfig.IdentityResources)
            .AddInMemoryApiScopes(IdentityConfig.ApiScopes)
            .AddInMemoryApiResources(IdentityConfig.ApiResources)
            .AddInMemoryClients(settings.Clients)
            .AddDeveloperSigningCredential()
            .AddAspNetIdentity<CafeLmsUser>();

        return services;
    }
}
