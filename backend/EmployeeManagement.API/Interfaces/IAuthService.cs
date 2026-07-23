using EmployeeManagement.API.Dtos;

namespace EmployeeManagement.API.Interfaces;

public interface IAuthService
{
    Task<LoginResponseDto?> LoginAsync(LoginRequestDto request);
}