import { useEffect, useState } from "react";
import type { Employee } from "../types/Employee";
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from "../api/employeeApi";
import EmployeeTable from "../components/employee/EmployeeTable";
import EmployeeForm from "../components/employee/EmployeeForm";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/useAuth";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import SearchBox from "../components/ui/SearchBox";
import SectionCard from "../components/ui/SectionCard";
import EmptyState from "../components/ui/EmptyState";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function EmployeePage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { role } = useAuth();

    const loadEmployees = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await getEmployees();
            setEmployees(data);
        } catch (error) {
            setError("Failed to load employees");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEmployees();
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
        try {
            setError("");
            if (employee.id === 0) {
                await addEmployee(employee);
                setSuccess("Employee added successfully!");
            } else {
                await updateEmployee(employee.id, employee);
                setSuccess("Employee updated successfully!");
                setSelectedEmployee(null);
            }
            setIsModalOpen(false);
            await loadEmployees();
            setTimeout(() => setSuccess(""), 3000);
        } catch (error) {
            setError("Failed to save employee");
            console.error(error);
        }
    };

    const removeEmployee = async (id: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this employee?");

        if (!confirmed) return;

        try {
            setError("");
            await deleteEmployee(id);
            setSuccess("Employee deleted successfully!");
            await loadEmployees();
            setTimeout(() => setSuccess(""), 3000);
        } catch (error) {
            setError("Failed to delete employee");
            console.error(error);
        }
    };

    const filteredEmployees = employees.filter((employee) => {
        const search = searchTerm.toLowerCase();

        return (
            employee.firstName.toLowerCase().includes(search) ||
            employee.lastName.toLowerCase().includes(search) ||
            employee.email.toLowerCase().includes(search) ||
            employee.department.toLowerCase().includes(search)
        );
    });

    return (
        <MainLayout title="Employees">
            {error && (
                <div className="alert alert-error mb-6">
                    <span>{error}</span>
                    <button onClick={() => setError("")} className="text-lg font-semibold">
                        ×
                    </button>
                </div>
            )}

            {success && (
                <div className="alert alert-success mb-6">
                    <span>{success}</span>
                    <button onClick={() => setSuccess("")} className="text-lg font-semibold">
                        ×
                    </button>
                </div>
            )}

            <div className="space-y-6">
                <PageHeader
                    title="Employee directory"
                    description="Manage staff records and team details."
                    actions={role === "Admin" ? <Button onClick={() => setIsModalOpen(true)}><span className="mr-2">+</span> Add Employee</Button> : undefined}
                    search={<SearchBox value={searchTerm} onChange={setSearchTerm} placeholder="Search by name, email, department" />}
                />

                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                        <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-sm">
                            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {selectedEmployee ? "Edit employee" : "Add new employee"}
                                </h3>
                                <button onClick={handleCloseModal} className="text-2xl font-semibold text-gray-500">
                                    ×
                                </button>
                            </div>
                            <div className="p-6">
                                <EmployeeForm key={selectedEmployee?.id ?? "new"} onSave={saveEmployee} employeeToEdit={selectedEmployee} />
                            </div>
                        </div>
                    </div>
                )}

                {loading ? (
                    <LoadingSpinner label="Loading employees..." />
                ) : (
                    <>
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                <p className="text-sm font-medium text-gray-500">Total employees</p>
                                <p className="mt-2 text-3xl font-bold text-gray-900">{employees.length}</p>
                            </div>
                            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                <p className="text-sm font-medium text-gray-500">Active employees</p>
                                <p className="mt-2 text-3xl font-bold text-gray-900">{employees.filter((e) => e.isActive).length}</p>
                            </div>
                            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                <p className="text-sm font-medium text-gray-500">Search results</p>
                                <p className="mt-2 text-3xl font-bold text-gray-900">{filteredEmployees.length}</p>
                            </div>
                        </div>

                        <SectionCard title="Employee list">
                            {filteredEmployees.length === 0 ? (
                                <EmptyState
                                    title="No employees found"
                                    description="Try adjusting your search criteria."
                                    icon={<svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                                />
                            ) : (
                                <div className="overflow-x-auto">
                                    <EmployeeTable employees={filteredEmployees} onEdit={handleEdit} onDelete={removeEmployee} />
                                </div>
                            )}
                        </SectionCard>
                    </>
                )}
            </div>
        </MainLayout>
    );
}

export default EmployeePage;