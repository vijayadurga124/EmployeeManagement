using EmployeeManagement.API.Models;

namespace EmployeeManagement.API.Interfaces;

public interface IEmployeeService
{
    Task<List<Employee>> GetAllEmployeesAsync();

    Task<Employee?> GetEmployeeByIdAsync(int id);

    Task<Employee> AddEmployeeAsync(Employee employee);

    Task<Employee?> UpdateEmployeeAsync(int id, Employee employee);

    Task<bool> DeleteEmployeeAsync(int id);
}