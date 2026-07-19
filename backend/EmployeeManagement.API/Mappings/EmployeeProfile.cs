using AutoMapper;
using EmployeeManagement.API.DTOs;
using EmployeeManagement.API.Models;

namespace EmployeeManagement.API.Mappings;

public class EmployeeProfile : Profile
{
    public EmployeeProfile()
    {
        CreateMap<Employee, EmployeeDto>();

        CreateMap<CreateEmployeeDto, Employee>();

        CreateMap<UpdateEmployeeDto, Employee>();

        CreateMap<Employee, UpdateEmployeeDto>();
    }
}