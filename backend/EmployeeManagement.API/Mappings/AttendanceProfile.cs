using AutoMapper;
using EmployeeManagement.API.Dtos;
using EmployeeManagement.API.Models;

namespace EmployeeManagement.API.Mappings;

public class AttendanceProfile : Profile
{
    public AttendanceProfile()
    {
        CreateMap<Attendance, AttendanceDto>();
    }
}