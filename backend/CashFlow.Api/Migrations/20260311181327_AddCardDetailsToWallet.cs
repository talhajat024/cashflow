using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CashFlow.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddCardDetailsToWallet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CardNumber",
                table: "Wallets",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CardStatus",
                table: "Wallets",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "Active");

            migrationBuilder.AddColumn<decimal>(
                name: "CreditLimit",
                table: "Wallets",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Cvc",
                table: "Wallets",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ExpireDate",
                table: "Wallets",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "UsedLimit",
                table: "Wallets",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CardNumber",
                table: "Wallets");

            migrationBuilder.DropColumn(
                name: "CardStatus",
                table: "Wallets");

            migrationBuilder.DropColumn(
                name: "CreditLimit",
                table: "Wallets");

            migrationBuilder.DropColumn(
                name: "Cvc",
                table: "Wallets");

            migrationBuilder.DropColumn(
                name: "ExpireDate",
                table: "Wallets");

            migrationBuilder.DropColumn(
                name: "UsedLimit",
                table: "Wallets");
        }
    }
}
