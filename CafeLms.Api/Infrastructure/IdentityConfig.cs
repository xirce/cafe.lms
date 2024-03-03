using IdentityModel;
using IdentityServer4.Models;

namespace CafeLms.Api.Infrastructure;

public static class IdentityConfig
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
            new("roles", "Roles", new[] { JwtClaimTypes.Role })
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
        {
            new("Cafe.Lms.Api")
        };

    public static IEnumerable<ApiResource> ApiResources =>
        new ApiResource[]
        {
            new("Cafe.Lms.Api", "Skill System Web Api", new[] { JwtClaimTypes.Role })
            {
                Scopes = { "Cafe.Lms.Api" }
            }
        };
}
