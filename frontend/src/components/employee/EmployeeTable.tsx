import type { Employee } from "../../types/Employee";

interface EmployeeTableProps {
    employees: Employee[];
    onEdit: (employee: Employee) => void;
    onDelete?: (id: number) => void;
}

import { useAuth } from "../../context/useAuth";

function EmployeeTable({ employees, onEdit, onDelete }: EmployeeTableProps) {
    const { role } = useAuth();

    return (
        <table className="table-auto border-collapse border border-gray-300 w-full">

            <thead>

                <tr className="bg-blue-600 text-white">

                    <th className="border p-3">Id</th>
                    <th className="border p-3">First Name</th>
                    <th className="border p-3">Last Name</th>
                    <th className="border p-3">Email</th>
                    <th className="border p-3">Department</th>
                    {role === 'Admin' && <th className="border p-3">Actions</th>}

                </tr>

            </thead>
            {employees.length === 0 && (
                <tbody>
                    <tr>
                        <td
                            colSpan={6}
                            className="text-center py-6"
                        >
                            No employees found.
                        </td>
                    </tr>
                </tbody>
            )}

            <tbody>

                {employees.map(employee => (

                    <tr key={employee.id}>

                        <td className="border p-3">{employee.id}</td>
                        <td className="border p-3">{employee.firstName}</td>
                        <td className="border p-3">{employee.lastName}</td>
                        <td className="border p-3">{employee.email}</td>
                        <td className="border p-3">{employee.department}</td>
                        {role === 'Admin' && (
                            <td className="border p-3">
                                <button
                                    onClick={() => onEdit(employee)}
                                    className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete?.(employee.id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        )}
                    </tr>

                ))}

            </tbody>

        </table>
    );
}

export default EmployeeTable;