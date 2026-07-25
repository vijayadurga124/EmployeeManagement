namespace EmployeeManagement.API.Dtos;

public class TodayAttendanceDto
{
    public DateOnly Date { get; set; }

    public bool CheckedIn { get; set; }

    public TimeOnly? CheckIn { get; set; }

    public bool CheckedOut { get; set; }

    public TimeOnly? CheckOut { get; set; }

    public string Status { get; set; } = string.Empty;
}
