import { useEffect, useState } from "react";
import type { Employee } from "../types/Employee";
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from "../api/employeeApi";
import EmployeeTable from "../components/employee/EmployeeTable";
import EmployeeForm from "../components/employee/EmployeeForm";

function EmployeePage() {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    const loadEmployees = async () => {
        try {
            setLoading(true);
            const data = await getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                setLoading(true);
                const data = await getEmployees();
                    setEmployees(data);
            } catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    const saveEmployee = async (employee: Employee) => {
        if (employee.id === 0) {
            await addEmployee(employee);
        }
        else {
            await updateEmployee(employee.id, employee);
            setSelectedEmployee(null);
        }
        await loadEmployees();
    };

    const removeEmployee = async (id: number) => {

        const confirmed = window.confirm(
            "Delete this employee?"
        );

        if (!confirmed) return;

        await deleteEmployee(id);

        await loadEmployees();

    };
    
    const filteredEmployees = employees.filter(employee => {

        const search = searchTerm.toLowerCase();

        return (
            employee.firstName.toLowerCase().includes(search) ||
            employee.lastName.toLowerCase().includes(search) ||
            employee.email.toLowerCase().includes(search) ||
            employee.department.toLowerCase().includes(search)
        );

    });

    return (
    <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">
            Employee Management System
        </h1>
        <EmployeeForm 
            key={selectedEmployee?.id ?? "new"}
            onSave={saveEmployee} 
            employeeToEdit={selectedEmployee}
        />
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search by name, email or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded p-2"
            />
        </div>
        {loading && (
            <p className="text-lg">Loading employees...</p>
        )}
        <EmployeeTable
            employees={filteredEmployees}
            onEdit={setSelectedEmployee}
            onDelete={removeEmployee}
        />
    </div>
);

}

export default EmployeePage;