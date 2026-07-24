import { useEffect, useState } from "react";
import type { Employee } from "../types/Employee";
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from "../api/employeeApi";
import EmployeeTable from "../components/employee/EmployeeTable";
import EmployeeForm from "../components/employee/EmployeeForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function EmployeePage() {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const { logout, role } = useAuth();

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

    const handleEdit = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEmployee(null);
    };

    const saveEmployee = async (employee: Employee) => {
        if (employee.id === 0) {
            await addEmployee(employee);
        }
        else {
            await updateEmployee(employee.id, employee);
            setSelectedEmployee(null);
        }
        setIsModalOpen(false);
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

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
    <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">
            Employee Management System
        </h1>
        <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
            <div className="flex gap-3">
                {role === "Admin" && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        + Add Employee
                    </button>
                )}
                <button
                    onClick={() => navigate("/attendance")}
                    className="bg-indigo-600 text-white px-4 py-2 rounded"
                >
                    Attendance
                </button>
            </div>
            <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded"
            >
                Logout
            </button>
        </div>

        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded shadow-lg w-full max-w-2xl p-6 relative">
                    <button
                        onClick={handleCloseModal}
                        className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
                    >
                        &times;
                    </button>
                    <EmployeeForm
                        key={selectedEmployee?.id ?? "new"}
                        onSave={saveEmployee}
                        employeeToEdit={selectedEmployee}
                    />
                </div>
            </div>
        )}
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
            onEdit={handleEdit}
            onDelete={removeEmployee}
        />
    </div>
);

}

export default EmployeePage;