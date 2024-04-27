using CafeLms.Api.DataModel;
using CafeLms.Api.Models.Account;
using IdentityModel;
using IdentityServer4.Extensions;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CafeLms.Api.Controllers;

public class AccountController : Controller
{
    private readonly UserManager<CafeLmsUser> userManager;
    private readonly SignInManager<CafeLmsUser> signInManager;
    private readonly IIdentityServerInteractionService interactionService;

    public AccountController(
        UserManager<CafeLmsUser> userManager,
        SignInManager<CafeLmsUser> signInManager,
        IIdentityServerInteractionService interactionService)
    {
        this.userManager = userManager;
        this.signInManager = signInManager;
        this.interactionService = interactionService;
    }

    [HttpGet]
    public IActionResult Login(string returnUrl)
    {
        return View(new LoginViewModel { ReturnUrl = returnUrl });
    }

    [HttpPost]
    public async Task<IActionResult> Login(LoginViewModel model)
    {
        if (!ModelState.IsValid)
            return View(model);

        var user = await userManager.FindByEmailAsync(model.Email);
        if (user is null)
        {
            ModelState.AddModelError(string.Empty, "User not found");
            return View(model);
        }

        var signInResult = await signInManager.PasswordSignInAsync(user, model.Password, false, false);
        if (!signInResult.Succeeded)
        {
            ModelState.AddModelError(string.Empty, "Incorrect password");
            return View(model);
        }

        return Redirect(model.ReturnUrl);
    }

    [HttpGet]
    public async Task<IActionResult> Logout(string logoutId)
    {
        var vm = await BuildLoggedOutViewModelAsync(logoutId);

        if (User.Identity?.IsAuthenticated == true)
        {
            await signInManager.SignOutAsync();
        }

        return View("LoggedOut", vm);
    }

    private async Task<LoggedOutViewModel> BuildLoggedOutViewModelAsync(string logoutId)
    {
        // get context information (client name, post logout redirect URI and iframe for federated signout)
        var logout = await interactionService.GetLogoutContextAsync(logoutId);

        var vm = new LoggedOutViewModel
        {
            AutomaticRedirectAfterSignOut = true,
            PostLogoutRedirectUri = logout?.PostLogoutRedirectUri,
            ClientName = string.IsNullOrEmpty(logout?.ClientName) ? logout?.ClientId : logout?.ClientName,
            SignOutIframeUrl = logout?.SignOutIFrameUrl,
            LogoutId = logoutId
        };

        return vm;
    }
}