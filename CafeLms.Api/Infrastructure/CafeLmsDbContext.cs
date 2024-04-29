using CafeLms.Api.DataModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CafeLms.Api.Infrastructure;

public class CafeLmsDbContext : IdentityDbContext<CafeLmsUser>
{
    public DbSet<Position> Positions { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<UserCourse> UserCourses { get; set; }
    public DbSet<Unit> Units { get; set; }
    public DbSet<UserUnit> UserUnits { get; set; }
    public DbSet<QuestionInternalModel> Questions { get; set; }
    public DbSet<QuizAttempt> QuizAttempts { get; set; }

    public CafeLmsDbContext()
    {
    }

    public CafeLmsDbContext(DbContextOptions<CafeLmsDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<CafeLmsUser>()
            .HasOne(u => u.Position)
            .WithMany()
            .HasForeignKey(u => u.PositionId);

        builder.Entity<Position>()
            .HasOne<IdentityRole>()
            .WithMany()
            .HasForeignKey(p => p.RoleId);

        builder.Entity<Course>()
            .HasOne(c => c.Position)
            .WithMany()
            .HasForeignKey(c => c.PositionId);

        builder.Entity<Course>()
            .HasMany(c => c.Units)
            .WithOne()
            .HasForeignKey(u => u.CourseId);

        builder.Entity<UserCourse>()
            .HasKey(u => new { u.UserId, u.CourseId });

        builder.Entity<UserCourse>()
            .HasOne<CafeLmsUser>()
            .WithMany()
            .HasForeignKey(u => u.UserId);

        builder.Entity<UserCourse>()
            .HasOne(u => u.Course)
            .WithMany()
            .HasForeignKey(u => u.CourseId);

        builder.Entity<UserUnit>()
            .HasKey(u => new { u.UserId, u.UnitId });

        builder.Entity<UserUnit>()
            .HasOne<CafeLmsUser>()
            .WithMany()
            .HasForeignKey(u => u.UserId);

        builder.Entity<UserUnit>()
            .HasOne(u => u.Unit)
            .WithMany()
            .HasForeignKey(u => u.UnitId);

        builder.Entity<Unit>()
            .HasMany(q => q.Questions)
            .WithOne()
            .HasForeignKey(q => q.QuizId);

        builder.Entity<Unit>()
            .Navigation(u => u.Questions)
            .AutoInclude();

        builder.Entity<QuestionInternalModel>()
            .HasMany(q => q.Answers)
            .WithOne()
            .HasForeignKey(a => a.QuestionId);

        builder.Entity<QuestionInternalModel>()
            .Navigation(q => q.Answers)
            .AutoInclude();

        builder.Entity<QuestionInternalModel>()
            .Property(q => q.CorrectAnswer)
            .HasConversion<AnswerConverter>();

        builder.Entity<QuizAttempt>()
            .OwnsMany(q => q.Answers, c => c.ToJson());

        builder.Entity<QuizAttempt>()
            .HasOne<CafeLmsUser>()
            .WithMany()
            .HasForeignKey(q => q.UserId);

        builder.Entity<QuizAttempt>()
            .HasOne<Unit>()
            .WithMany()
            .HasForeignKey(q => q.QuizId);
    }
}
