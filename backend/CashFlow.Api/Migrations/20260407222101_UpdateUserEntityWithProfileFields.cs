using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CashFlow.Api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserEntityWithProfileFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // ==========================================
            // STEP 1: Add FirstName and LastName columns (nullable initially)
            // ==========================================
            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Users",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);
            
            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Users",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);
            
            // ==========================================
            // STEP 2: Migrate existing data from Name to FirstName/LastName
            // ==========================================
            migrationBuilder.Sql(
                @"
                -- Check if Name column exists before trying to migrate
                IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Users' AND COLUMN_NAME = 'Name')
                BEGIN
                    -- Migrate data: split Name into FirstName and LastName
                    UPDATE Users SET 
                        FirstName = CASE 
                            WHEN CHARINDEX(' ', Name) > 0 
                            THEN SUBSTRING(Name, 1, CHARINDEX(' ', Name) - 1)
                            ELSE Name 
                        END,
                        LastName = CASE 
                            WHEN CHARINDEX(' ', Name) > 0 
                            THEN SUBSTRING(Name, CHARINDEX(' ', Name) + 1, LEN(Name))
                            ELSE '' 
                        END
                    WHERE Name IS NOT NULL AND (FirstName IS NULL OR LastName IS NULL);
                END");
            
            // ==========================================
            // STEP 3: Make FirstName and LastName non-nullable
            // ==========================================
            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "Users",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
            
            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "Users",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
            
            // ==========================================
            // STEP 4: Drop the old Name column if it exists
            // ==========================================
            migrationBuilder.Sql(
                @"
                IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Users' AND COLUMN_NAME = 'Name')
                BEGIN
                    ALTER TABLE Users DROP COLUMN Name;
                END");
            
            // ==========================================
            // STEP 5: Add Profile fields
            // ==========================================
            migrationBuilder.AddColumn<bool>(
                name: "AllowApplePay",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "AllowGooglePay",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Currency",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DefaultPaymentMethod",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FullAddress",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Users",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ZipCode",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // ==========================================
            // STEP 1: Add back the Name column for rollback
            // ==========================================
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
            
            // ==========================================
            // STEP 2: Restore data from FirstName/LastName to Name
            // ==========================================
            migrationBuilder.Sql(
                @"
                UPDATE Users 
                SET Name = TRIM(CONCAT(FirstName, ' ', LastName))
                WHERE FirstName IS NOT NULL OR LastName IS NOT NULL");
            
            // ==========================================
            // STEP 3: Drop all the new columns
            // ==========================================
            migrationBuilder.DropColumn(name: "FirstName", table: "Users");
            migrationBuilder.DropColumn(name: "LastName", table: "Users");
            migrationBuilder.DropColumn(name: "AllowApplePay", table: "Users");
            migrationBuilder.DropColumn(name: "AllowGooglePay", table: "Users");
            migrationBuilder.DropColumn(name: "City", table: "Users");
            migrationBuilder.DropColumn(name: "Country", table: "Users");
            migrationBuilder.DropColumn(name: "Currency", table: "Users");
            migrationBuilder.DropColumn(name: "DefaultPaymentMethod", table: "Users");
            migrationBuilder.DropColumn(name: "FullAddress", table: "Users");
            migrationBuilder.DropColumn(name: "PhoneNumber", table: "Users");
            migrationBuilder.DropColumn(name: "State", table: "Users");
            migrationBuilder.DropColumn(name: "UpdatedAt", table: "Users");
            migrationBuilder.DropColumn(name: "ZipCode", table: "Users");
        }
    }
}