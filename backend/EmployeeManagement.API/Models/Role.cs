using System.ComponentModel.DataAnnotations;

namespace EmployeeManagement.API.Models;

public class Role
{
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }
}
