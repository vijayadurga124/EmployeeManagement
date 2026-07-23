using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeManagement.API.Models;

public class User
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    public string Role { get; set; } = "Employee";

    public bool IsActive { get; set; } = true;

    // Foreign Key
    public int EmployeeId { get; set; }

    [ForeignKey(nameof(EmployeeId))]
    public Employee Employee { get; set; } = null!;
}