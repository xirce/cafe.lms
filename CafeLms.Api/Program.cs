using System.Text.Json.Serialization;
using CafeLms.Api.Configuration;
using CafeLms.Api.DI;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors()
    .AddControllers()
    .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.AddAuthorization()
    .AddAuthorization();

builder.Services
    .AddDb(builder.Configuration);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger()
        .UseSwaggerUI();
}

app.UseCors(
    builder => builder
        .WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials());
app.UseAuthentication()
    .UseAuthorization();

app.MapControllers();

app.Run();
