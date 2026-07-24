using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement.API.Controllers;

[ApiController]
public abstract class BaseApiController : ControllerBase
{
    protected int CurrentEmployeeId
    {
        get
        {
            var claim = User.FindFirst("EmployeeId");

            if (claim == null)
                throw new UnauthorizedAccessException();

            return int.Parse(claim.Value);
        }
    }

    protected string CurrentUserEmail
    {
        get
        {
            return User.FindFirst(ClaimTypes.Email)?.Value ?? "";
        }
    }

    protected string CurrentRole
    {
        get
        {
            return User.FindFirst(ClaimTypes.Role)?.Value ?? "";
        }
    }
}