using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Mvc;

namespace CafeLms.Api.Controllers;

public class AuthorizeController : ControllerBase
{
    private const string DefaultBackPath = "/";

    [HttpGet]
    public async Task Login([FromQuery] string backUrl = DefaultBackPath)
    {
        await HttpContext.ChallengeAsync(
            OpenIdConnectDefaults.AuthenticationScheme,
            new AuthenticationProperties { RedirectUri = backUrl });
    }

    [HttpGet]
    public async Task Logout([FromQuery] string backUrl = DefaultBackPath)
    {
        await HttpContext.SignOutAsync(
            OpenIdConnectDefaults.AuthenticationScheme,
            new AuthenticationProperties { RedirectUri = backUrl });
    }   
}
