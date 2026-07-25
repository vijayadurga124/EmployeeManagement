using EmployeeManagement.API.Data;
using EmployeeManagement.API.Interfaces;
using EmployeeManagement.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.API.Services;

public class EmployeeService : IEmployeeService
{
    private readonly AppDbContext _context;

    public EmployeeService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Employee>> GetAllEmployeesAsync()
    {
        return await _context.Employees
            .Include(e => e.Role)
            .ToListAsync();
    }

    public async Task<Employee?> GetEmployeeByIdAsync(int id)
    {
        return await _context.Employees
            .Include(e => e.Role)
            .FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task<Employee> AddEmployeeAsync(Employee employee)
    {
        _context.Employees.Add(employee);

        await _context.SaveChangesAsync();

        return employee;
    }

    public async Task<Employee?> UpdateEmployeeAsync(int id, Employee employee)
    {
        var existingEmployee = await _context.Employees.FindAsync(id);

        if (existingEmployee == null)
            return null;

        existingEmployee.FirstName = employee.FirstName;
        existingEmployee.LastName = employee.LastName;
        existingEmployee.Email = employee.Email;
        existingEmployee.PhoneNumber = employee.PhoneNumber;
        existingEmployee.Department = employee.Department;
        existingEmployee.Salary = employee.Salary;
        existingEmployee.DateOfJoining = employee.DateOfJoining;
        existingEmployee.IsActive = employee.IsActive;
        existingEmployee.RoleId = employee.RoleId;

        await _context.SaveChangesAsync();

        return existingEmployee;
    }

    public async Task<bool> DeleteEmployeeAsync(int id)
    {
        var employee = await _context.Employees.FindAsync(id);

        if (employee == null)
            return false;

        _context.Employees.Remove(employee);

        await _context.SaveChangesAsync();

        return true;
    }
}