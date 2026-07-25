using EmployeeManagement.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Employee> Employees { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Attendance> Attendances => Set<Attendance>();
    public DbSet<Role> Roles { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Employee>()
            .HasOne(e => e.User)
            .WithOne(u => u.Employee)
            .HasForeignKey<User>(u => u.EmployeeId);

        modelBuilder.Entity<Employee>()
            .HasOne(e => e.Role)
            .WithMany()
            .HasForeignKey(e => e.RoleId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}