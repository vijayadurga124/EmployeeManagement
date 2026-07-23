import { useState } from "react";
import type { Employee } from "../../types/Employee";

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
    isActive: true
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

    const [employee, setEmployee] = useState<Employee>(
        employeeToEdit || emptyEmployee
    );
    const [errors, setErrors] = useState<EmployeeErrors>(emptyErrors);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const { name, value, type, checked } = e.target;

        setEmployee(prev => ({
            ...prev,
            [name]:
                type === "checkbox"
                ? checked
                : type === "number"
                ? Number(value)
                : value
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
            newErrors.firstName = "First Name is required.";
            isValid = false;
        }

        if (!employee.lastName.trim()) {
            newErrors.lastName = "Last Name is required.";
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
            newErrors.phoneNumber = "Phone Number is required.";
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        onSave(employee);
        setEmployee(emptyEmployee);
        setErrors(emptyErrors);
    };



    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow rounded p-6 mb-8"
        >

            <h2 className="text-2xl font-bold mb-5">

                Add Employee

            </h2>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <input
                        name="firstName"
                        placeholder="First Name"
                        value={employee.firstName}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                    {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.firstName}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        name="lastName"
                        placeholder="Last Name"
                        value={employee.lastName}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                    {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.lastName}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        name="email"
                        placeholder="Email"
                        value={employee.email}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={employee.phoneNumber}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                    {errors.phoneNumber && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.phoneNumber}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        name="department"
                        placeholder="Department"
                        value={employee.department}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                    {errors.department && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.department}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        type="number"
                        name="salary"
                        placeholder="Salary"
                        value={employee.salary}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                    {errors.salary && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.salary}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        type="date"
                        name="dateOfJoining"
                        value={employee.dateOfJoining}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                </div>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={employee.isActive}
                        onChange={handleChange}
                    />
                    Active
                </label>

            </div>

            <button
                type="submit"
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
            >
                {employeeToEdit ? "Update Employee" : "Add Employee"}
            </button>

        </form>

    );

}

export default EmployeeForm;