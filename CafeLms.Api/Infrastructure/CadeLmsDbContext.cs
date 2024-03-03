using CafeLms.Api.DataModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CafeLms.Api.Infrastructure;

public class CadeLmsDbContext : IdentityDbContext<CafeLmsUser>
{
    public DbSet<Position> Positions { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<UserCourse> UserCourses { get; set; }
    public DbSet<Unit> Units { get; set; }
    public DbSet<Quiz> Quizzes { get; set; }
    public DbSet<QuestionInternalModel> Questions { get; set; }
    public DbSet<QuizAttempt> QuizAttempts { get; set; }

    public CadeLmsDbContext(DbContextOptions<CadeLmsDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<CafeLmsUser>()
            .HasOne<Position>()
            .WithMany()
            .HasForeignKey(u => u.PositionId);

        builder.Entity<Position>()
            .HasOne<IdentityRole>()
            .WithMany()
            .HasForeignKey(p => p.RoleId);

        builder.Entity<Course>()
            .HasOne<Position>()
            .WithMany()
            .HasForeignKey(c => c.PositionId);

        builder.Entity<Course>()
            .HasMany(c => c.Units)
            .WithOne()
            .HasForeignKey(u => u.CourseId);

        builder.Entity<Unit>()
            .HasOne(u => u.Quiz)
            .WithOne()
            .HasForeignKey<Quiz>(c => c.UnitId);

        builder.Entity<Quiz>()
            .HasMany(q => q.Questions)
            .WithOne()
            .HasForeignKey(q => q.QuizId);

        builder.Entity<QuestionInternalModel>()
            .OwnsMany(q => q.Answers, c => c.ToJson());

        builder.Entity<QuizAttempt>()
            .OwnsMany(q => q.Answers, c => c.ToJson());
    }
}
