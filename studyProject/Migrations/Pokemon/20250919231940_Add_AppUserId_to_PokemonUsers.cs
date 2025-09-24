using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace studyProject.Migrations.Pokemon
{
    /// <inheritdoc />
    public partial class Add_AppUserId_to_PokemonUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "PokemonUsers",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_PokemonUsers_AppUserId",
                table: "PokemonUsers",
                column: "AppUserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PokemonUsers_AppUserId",
                table: "PokemonUsers");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "PokemonUsers");
        }
    }
}
