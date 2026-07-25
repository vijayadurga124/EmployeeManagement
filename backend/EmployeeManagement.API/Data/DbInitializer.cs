using EmployeeManagement.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.API.Data;

public static class DbInitializer
{
    public static async Task InitializeAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        await context.Database.MigrateAsync();

        if (await context.Roles.AnyAsync())
        {
            return;
        }

        context.Roles.AddRange(
            new Role { Name = "Admin", Description = "Administrator" },
            new Role { Name = "Employee", Description = "Standard employee" },
            new Role { Name = "Manager", Description = "Manager" }
        );

        await context.SaveChangesAsync();
    }
}
