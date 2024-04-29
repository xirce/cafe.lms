using System.Text.Json.Serialization;
using CafeLms.Api.Authentication;
using CafeLms.Api.Configuration;
using CafeLms.Api.DI;
using CafeLms.Api.Infrastructure;
using IdentityModel;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddDb(builder.Configuration)
    .AddBusinessLogic()
    .AddIdentityServerWithSettings(
        builder.Configuration.GetRequiredSection(nameof(IdentityServerSettings)).Get<IdentityServerSettings>()!);

builder.Services.AddAuthentication(
        options =>
        {
            options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        })
    .AddCookie(
        CookieAuthenticationDefaults.AuthenticationScheme,
        o =>
        {
            o.LoginPath = "/Authorize/Login";
            o.Events.OnRedirectToLogin = Events.OnRedirectToLogin;
            o.Events.OnRedirectToAccessDenied = Events.OnRedirectToAccessDenied;
        })
    .AddOpenIdConnect(
        OpenIdConnectDefaults.AuthenticationScheme,
        o =>
        {
            o.SignOutScheme = IdentityConstants.ExternalScheme;

            o.Authority = "http://localhost:5270";
            o.ClientId = "Cafe.Lms.Api";
            o.ClientSecret = "39127022-15a3-4d3f-b3b4-c6e6b00548d9";
            o.ResponseType = OidcConstants.ResponseTypes.Code;

            o.Scope.Add("Cafe.Lms.Api");
            o.Scope.Add("roles");

            o.SaveTokens = true;

            o.RequireHttpsMetadata = builder.Environment.IsProduction();
            o.NonceCookie.SameSite = SameSiteMode.Lax;
        });
builder.Services.AddAuthorization();

builder.Services.AddCors()
    .AddControllersWithViews()
    .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.Configure<CookiePolicyOptions>(options => { options.MinimumSameSitePolicy = SameSiteMode.Lax; });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger()
        .UseSwaggerUI();
}

app.EnsureDataSeeded();

app.UseStaticFiles();
app.UseCookiePolicy();

app.UseRouting();
app.UseIdentityServer();
app.UseCors(
    builder => builder
        .WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials());
app.UseAuthorization();

app.UseEndpoints(e => e.MapDefaultControllerRoute());

app.Run();
