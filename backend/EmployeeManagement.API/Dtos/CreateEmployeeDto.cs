using System.ComponentModel.DataAnnotations;

namespace EmployeeManagement.API.DTOs;

public class CreateEmployeeDto
{
    [Required]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    public string LastName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string PhoneNumber { get; set; } = string.Empty;

    [Required]
    public string Department { get; set; } = string.Empty;

    [Required]
    public decimal Salary { get; set; }

    public DateTime DateOfJoining { get; set; }

    public bool IsActive { get; set; } = true;
}