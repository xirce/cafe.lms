namespace CafeLms.Api.Models.Account;

public class LoggedOutViewModel
{
    public bool AutomaticRedirectAfterSignOut { get; set; }
    public string? PostLogoutRedirectUri { get; set; }
    public string? ClientName { get; set; }
    public string? SignOutIframeUrl { get; set; }
    public string LogoutId { get; set; }
}
