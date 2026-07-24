namespace EmployeeManagement.API.Models;

public class Attendance
{
    public int Id { get; set; }

    public int EmployeeId { get; set; }

    public DateOnly Date { get; set; }

    public TimeOnly CheckIn { get; set; }

    public TimeOnly? CheckOut { get; set; }

    public string Status { get; set; } = "Present";

    // Navigation Property
    public Employee Employee { get; set; } = null!;
}