using System.ComponentModel.DataAnnotations;

namespace EmployeeManagement.API.Models;

public class Employee
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string LastName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    public string PhoneNumber { get; set; } = string.Empty;

    [Required]
    public string Department { get; set; } = string.Empty;

    [Required]
    public decimal Salary { get; set; }

    public DateTime DateOfJoining { get; set; }

    public bool IsActive { get; set; } = true;
    public User? User { get; set; }
    // Navigation Property
    public ICollection<Attendance> Attendances { get; set; }
        = new List<Attendance>();
}