using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace studyProject.Migrations.Pokemon
{
    /// <inheritdoc />
    public partial class addedFieldsToPokemonModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "imgUrl",
                table: "Pokemons",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "lastTimeTrained",
                table: "Pokemons",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "timesTrainedToday",
                table: "Pokemons",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "imgUrl",
                table: "Pokemons");

            migrationBuilder.DropColumn(
                name: "lastTimeTrained",
                table: "Pokemons");

            migrationBuilder.DropColumn(
                name: "timesTrainedToday",
                table: "Pokemons");
        }
    }
}
