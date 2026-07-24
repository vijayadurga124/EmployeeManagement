using System.Security.Claims;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public int EmployeeId =>
        int.Parse(
            _httpContextAccessor.HttpContext!
            .User
            .FindFirst("EmployeeId")!
            .Value);

    public string Email =>
        _httpContextAccessor.HttpContext!
        .User
        .FindFirst(ClaimTypes.Email)!
        .Value;

    public string Role =>
        _httpContextAccessor.HttpContext!
        .User
        .FindFirst(ClaimTypes.Role)!
        .Value;
}