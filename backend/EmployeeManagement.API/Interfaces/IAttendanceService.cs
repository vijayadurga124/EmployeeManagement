using EmployeeManagement.API.Dtos;

namespace EmployeeManagement.API.Interfaces;

public interface IAttendanceService
{
    Task<AttendanceDto> CheckInAsync();

    Task<AttendanceDto> CheckOutAsync();

    Task<IEnumerable<AttendanceDto>> GetAttendanceHistoryAsync();
}