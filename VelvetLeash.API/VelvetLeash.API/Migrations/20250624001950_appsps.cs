using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VelvetLeash.API.Migrations
{
    /// <inheritdoc />
    public partial class appsps : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Pets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Size = table.Column<int>(type: "int", nullable: false),
                    Age = table.Column<int>(type: "int", nullable: false),
                    GetAlongWithDogs = table.Column<bool>(type: "bit", nullable: false),
                    GetAlongWithCats = table.Column<bool>(type: "bit", nullable: false),
                    IsUnsureWithDogs = table.Column<bool>(type: "bit", nullable: false),
                    IsUnsureWithCats = table.Column<bool>(type: "bit", nullable: false),
                    SpecialInstructions = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MedicalConditions = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pets", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Pets");
        }
    }
}
