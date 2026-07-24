public interface ICurrentUserService
{
    int EmployeeId { get; }

    string Email { get; }

    string Role { get; }
}