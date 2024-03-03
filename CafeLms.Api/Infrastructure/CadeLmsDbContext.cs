using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CafeLms.Api.Infrastructure;

public class CadeLmsDbContext : IdentityDbContext<CafeLmsUser>
{
    public CadeLmsDbContext(DbContextOptions<CadeLmsDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.ApplyConfigurationsFromAssembly(typeof(CafeLmsUser).Assembly);
    }
}
