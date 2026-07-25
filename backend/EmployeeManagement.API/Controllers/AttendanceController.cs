using EmployeeManagement.API.Dtos;
using EmployeeManagement.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AttendanceController : BaseApiController
{
    private readonly IAttendanceService _attendanceService;

    public AttendanceController(IAttendanceService attendanceService)
    {
        _attendanceService = attendanceService;
    }

    [HttpPost("checkin")]
    public async Task<IActionResult> CheckIn()
    {
        var result = await _attendanceService.CheckInAsync();

        return Ok(result);
    }

    [HttpPost("checkout")]
    public async Task<IActionResult> CheckOut()
    {
        var result = await _attendanceService.CheckOutAsync();

        return Ok(result);
    }

    [HttpGet("today")]
    public async Task<IActionResult> GetTodayStatus()
    {
        var result = await _attendanceService.GetTodayStatusAsync();

        return Ok(result);
    }

    [HttpGet("my-history")]
    public async Task<IActionResult> History()
    {
        var result = await _attendanceService.GetAttendanceHistoryAsync();

        return Ok(result);
    }
}