import { useEffect, useState } from "react";
import type { Employee } from "../../types/Employee";
import { getRoles } from "../../api/employeeApi";
import Button from "../ui/Button";

type EmployeeErrors = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    department: string;
    salary: string;
};

const emptyEmployee: Employee = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    department: "",
    salary: 0,
    dateOfJoining: "",
    isActive: true,
    roleId: null
};
const emptyErrors: EmployeeErrors = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    department: "",
    salary: ""
};

interface EmployeeFormProps {
    onSave: (employee: Employee) => void;
    employeeToEdit: Employee | null;
}

function EmployeeForm({ onSave, employeeToEdit }: EmployeeFormProps) {
    const [employee, setEmployee] = useState<Employee>(() => ({
        ...emptyEmployee,
        ...(employeeToEdit || {})
    }));
    const [errors, setErrors] = useState<EmployeeErrors>(emptyErrors);
    const [roles, setRoles] = useState<Array<{ id: number; name: string; description?: string }>>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadRoles = async () => {
            try {
                const data = await getRoles();
                setRoles(data);
            } catch (error) {
                console.error(error);
            }
        };

        loadRoles();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        const type = target.type;
        const checked = type === "checkbox" ? (target as HTMLInputElement).checked : false;

        setEmployee((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value
        }));
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setEmployee((prev) => ({
            ...prev,
            roleId: value ? Number(value) : null
        }));
    };

    const validate = () => {
        const newErrors: EmployeeErrors = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            department: "",
            salary: ""
        };

        let isValid = true;

        if (!employee.firstName.trim()) {
            newErrors.firstName = "First name is required.";
            isValid = false;
        }

        if (!employee.lastName.trim()) {
            newErrors.lastName = "Last name is required.";
            isValid = false;
        }

        if (!employee.email.trim()) {
            newErrors.email = "Email is required.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(employee.email)) {
            newErrors.email = "Enter a valid email.";
            isValid = false;
        }

        if (!employee.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required.";
            isValid = false;
        }

        if (!employee.department.trim()) {
            newErrors.department = "Department is required.";
            isValid = false;
        }

        if (Number(employee.salary) <= 0) {
            newErrors.salary = "Salary must be greater than zero.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        setLoading(true);
        try {
            onSave(employee);
            setEmployee({ ...emptyEmployee, roleId: null });
            setErrors(emptyErrors);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <h3 className="mb-4 border-b border-gray-200 pb-3 text-base font-semibold text-gray-900">Personal information</h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="form-group">
                        <label className="form-label">
                            First name
                            <span className="ml-1 text-red-600">*</span>
                        </label>
                        <input name="firstName" placeholder="John" value={employee.firstName} onChange={handleChange} className="input-field" />
                        {errors.firstName && <p className="error-text">{errors.firstName}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Last name
                            <span className="ml-1 text-red-600">*</span>
                        </label>
                        <input name="lastName" placeholder="Doe" value={employee.lastName} onChange={handleChange} className="input-field" />
                        {errors.lastName && <p className="error-text">{errors.lastName}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Email address
                            <span className="ml-1 text-red-600">*</span>
                        </label>
                        <input name="email" placeholder="john@example.com" value={employee.email} onChange={handleChange} className="input-field" />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Phone number
                            <span className="ml-1 text-red-600">*</span>
                        </label>
                        <input name="phoneNumber" placeholder="+1 (555) 123-4567" value={employee.phoneNumber} onChange={handleChange} className="input-field" />
                        {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}
                    </div>
                </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <h3 className="mb-4 border-b border-gray-200 pb-3 text-base font-semibold text-gray-900">Employment information</h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="form-group">
                        <label className="form-label">
                            Department
                            <span className="ml-1 text-red-600">*</span>
                        </label>
                        <input name="department" placeholder="Engineering" value={employee.department} onChange={handleChange} className="input-field" />
                        {errors.department && <p className="error-text">{errors.department}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Salary
                            <span className="ml-1 text-red-600">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <input type="number" name="salary" placeholder="50000" value={employee.salary} onChange={handleChange} className="input-field pl-8" />
                        </div>
                        {errors.salary && <p className="error-text">{errors.salary}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Date of joining</label>
                        <input type="date" name="dateOfJoining" value={employee.dateOfJoining} onChange={handleChange} className="input-field" />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Role</label>
                        <select value={employee.roleId ?? ""} onChange={handleRoleChange} className="input-field">
                            <option value="">Select a role</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <label className="flex cursor-pointer items-center gap-3">
                    <input type="checkbox" name="isActive" checked={employee.isActive} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm font-medium text-gray-900">Employee is active</span>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${employee.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                        {employee.isActive ? "Active" : "Inactive"}
                    </span>
                </label>
            </div>

            <div className="flex justify-end border-t border-gray-200 pt-4">
                <Button type="submit" isLoading={loading}>
                    {employeeToEdit ? "Update employee" : "Add employee"}
                </Button>
            </div>
        </form>
    );
}

export default EmployeeForm;