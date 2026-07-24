using AutoMapper;
using EmployeeManagement.API.Data;
using EmployeeManagement.API.Dtos;
using EmployeeManagement.API.Interfaces;
using EmployeeManagement.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.API.Services;

public class AttendanceService : IAttendanceService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUser;

    public AttendanceService(AppDbContext context,
                             IMapper mapper, ICurrentUserService currentUser)
    {
        _context = context;
        _mapper = mapper;
        _currentUser = currentUser;
    }

    public async Task<AttendanceDto> CheckInAsync()
    {
        var employeeId = _currentUser.EmployeeId;
        var today = DateOnly.FromDateTime(DateTime.Now);

        bool alreadyCheckedIn = await _context.Attendances
            .AnyAsync(a =>
                a.EmployeeId == employeeId &&
                a.Date == today);

        if (alreadyCheckedIn)
        {
            throw new Exception("Employee already checked in today.");
        }

        var attendance = new Attendance
        {
            EmployeeId = employeeId,
            Date = today,
            CheckIn = TimeOnly.FromDateTime(DateTime.Now),
            Status = "Present"
        };

        _context.Attendances.Add(attendance);

        await _context.SaveChangesAsync();

        return _mapper.Map<AttendanceDto>(attendance);
    }

    public async Task<AttendanceDto> CheckOutAsync()
    {
        var employeeId = _currentUser.EmployeeId;
        var today = DateOnly.FromDateTime(DateTime.Now);

        var attendance = await _context.Attendances
            .FirstOrDefaultAsync(a =>
                a.EmployeeId == employeeId &&
                a.Date == today);

        if (attendance == null)
            throw new Exception("Check-In not found.");

        if (attendance.CheckOut != null)
            throw new Exception("Already checked out.");

        attendance.CheckOut = TimeOnly.FromDateTime(DateTime.Now);

        await _context.SaveChangesAsync();

        return _mapper.Map<AttendanceDto>(attendance);
    }

    public async Task<IEnumerable<AttendanceDto>> GetAttendanceHistoryAsync()
    {
        var employeeId = _currentUser.EmployeeId;
        var records = await _context.Attendances
            .Where(a => a.EmployeeId == employeeId)
            .OrderByDescending(a => a.Date)
            .ToListAsync();

        return _mapper.Map<List<AttendanceDto>>(records);
    }
}