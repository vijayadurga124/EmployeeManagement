using EmployeeManagement.API.Interfaces;
using EmployeeManagement.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace EmployeeManagement.API.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class EmployeeController : ControllerBase
{
    private readonly IEmployeeService _employeeService;

    public EmployeeController(IEmployeeService employeeService)
    {
        _employeeService = employeeService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllEmployees()
    {
        var employees = await _employeeService.GetAllEmployeesAsync();
        return Ok(employees);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetEmployeeById(int id)
    {
        var employee = await _employeeService.GetEmployeeByIdAsync(id);

        if (employee == null)
            return NotFound();

        return Ok(employee);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> AddEmployee(Employee employee)
    {
        var createdEmployee = await _employeeService.AddEmployeeAsync(employee);

        return CreatedAtAction(
            nameof(GetEmployeeById),
            new { id = createdEmployee.Id },
            createdEmployee);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEmployee(int id, Employee employee)
    {
        var updatedEmployee = await _employeeService.UpdateEmployeeAsync(id, employee);

        if (updatedEmployee == null)
            return NotFound();

        return Ok(updatedEmployee);
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(int id)
    {
        var deleted = await _employeeService.DeleteEmployeeAsync(id);

        if (!deleted)
            return NotFound();

        return NoContent();
    }
}