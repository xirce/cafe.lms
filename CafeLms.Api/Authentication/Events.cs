using System.Net;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace CafeLms.Api.Authentication;

internal static class Events
{
    public static Func<RedirectContext<CookieAuthenticationOptions>, Task> OnRedirectToLogin => context =>
    {
        if (context.Request.Path.StartsWithSegments("/api"))
            context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;

        return Task.CompletedTask;
    };

    public static Func<RedirectContext<CookieAuthenticationOptions>, Task> OnRedirectToAccessDenied => context =>
    {
        if (context.Request.Path.StartsWithSegments("/api"))
            context.Response.StatusCode = (int)HttpStatusCode.Forbidden;

        return Task.CompletedTask;
    };
}
