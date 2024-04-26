using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CafeLms.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddCoursePreviewImageMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PreviewImageUrl",
                table: "Courses",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PreviewImageUrl",
                table: "Courses");
        }
    }
}
