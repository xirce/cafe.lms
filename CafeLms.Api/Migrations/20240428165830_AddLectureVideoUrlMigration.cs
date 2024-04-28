using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CafeLms.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddLectureVideoUrlMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "VideoUrl",
                table: "Units",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VideoUrl",
                table: "Units");
        }
    }
}
