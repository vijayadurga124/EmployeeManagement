import type { Employee } from "../../types/Employee";
import { useAuth } from "../../context/useAuth";

interface EmployeeTableProps {
    employees: Employee[];
    onEdit: (employee: Employee) => void;
    onDelete?: (id: number) => void;
}

function EmployeeTable({ employees, onEdit, onDelete }: EmployeeTableProps) {
    const { role } = useAuth();

    const formatSalary = (salary: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(salary);
    };

    return (
        <table className="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Role</th>
                    <th>Status</th>
                    {role === "Admin" && <th className="text-right">Actions</th>}
                </tr>
            </thead>
            <tbody>
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td className="font-medium text-gray-900">#{employee.id}</td>
                        <td className="font-medium text-gray-900">{employee.firstName} {employee.lastName}</td>
                        <td className="break-all text-blue-600">{employee.email}</td>
                        <td>{employee.department}</td>
                        <td className="font-medium text-gray-900">{formatSalary(employee.salary)}</td>
                        <td>
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                                {employee.role?.name ?? employee.roleName ?? "Employee"}
                            </span>
                        </td>
                        <td>
                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${employee.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                                {employee.isActive ? "Active" : "Inactive"}
                            </span>
                        </td>
                        {role === "Admin" && (
                            <td className="text-right">
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => onEdit(employee)} className="inline-flex h-9 items-center rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                        Edit
                                    </button>
                                    <button onClick={() => onDelete?.(employee.id)} className="inline-flex h-9 items-center rounded-md bg-red-600 px-3 text-sm font-medium text-white hover:bg-red-700">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default EmployeeTable;