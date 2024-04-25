using CafeLms.Api.Configuration;
using CafeLms.Api.DataModel;
using CafeLms.Api.Infrastructure;
using CafeLms.Api.Managers;
using CafeLms.Api.Managers.Interfaces;
using IdentityServer4.Validation;
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

    public static IServiceCollection AddBusinessLogic(this IServiceCollection services)
    {
        return services.AddScoped<IUsersManager, UsersManager>()
            .AddScoped<IAuthorizationProvider, AuthorizationProvider>()
            .AddScoped<IQuizManager, QuizManager>();
    }

    public static IServiceCollection AddIdentityServerWithSettings(
        this IServiceCollection services,
        IdentityServerSettings settings)
    {
        services.AddIdentity<CafeLmsUser, IdentityRole>()
            .AddEntityFrameworkStores<CadeLmsDbContext>()
            .AddDefaultTokenProviders();

        services.AddIdentityServer(options =>
            {
                options.Authentication.CheckSessionCookieSameSiteMode = SameSiteMode.Lax;
            })
            .AddInMemoryIdentityResources(IdentityConfig.IdentityResources)
            .AddInMemoryApiScopes(IdentityConfig.ApiScopes)
            .AddInMemoryApiResources(IdentityConfig.ApiResources)
            .AddInMemoryClients(settings.Clients)
            .AddDeveloperSigningCredential()
            .AddAspNetIdentity<CafeLmsUser>();

        services.ConfigureApplicationCookie(o => o.Cookie.SameSite = SameSiteMode.Lax);

        services.AddTransient<ISecretValidator, PlainTextSharedSecretValidator>();

        return services;
    }
}
