using EmployeeManagement.API.Data;
using EmployeeManagement.API.Dtos;
using EmployeeManagement.API.Interfaces;
using EmployeeManagement.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EmployeeManagement.API.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthService(
        AppDbContext context,
        IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<LoginResponseDto?> LoginAsync(LoginRequestDto request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x =>
                x.Email == request.Email &&
                x.IsActive);

        if (user == null)
            return null;

        // Temporary plain text comparison
        if (user.PasswordHash != request.Password)
            return null;

        var token = GenerateJwtToken(user);

        return new LoginResponseDto
        {
            Token = token,
            Email = user.Email,
            Role = user.Role
        };
    }

    private string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, user.Email),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim("EmployeeId", user.EmployeeId.ToString())
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));

        var credentials = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(
                Convert.ToDouble(_configuration["Jwt:ExpiryInMinutes"])),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}