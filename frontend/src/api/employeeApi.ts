import api from "./axios";
import type { Employee } from "../types/Employee";

export const getEmployees = async (): Promise<Employee[]> => {
    const response = await api.get<Employee[]>("/Employee");
    return response.data;
};

export const getEmployeeById = async (id: number): Promise<Employee> => {
    const response = await api.get<Employee>(`/Employee/${id}`);
    return response.data;
};

export const addEmployee = async (employee: Employee) => {
    const response = await api.post("/Employee", employee);
    return response.data;
};

export const updateEmployee = async (id: number, employee: Employee) => {
    const response = await api.put(`/Employee/${id}`, employee);
    return response.data;
};

export const deleteEmployee = async (id: number) => {
    await api.delete(`/Employee/${id}`);
};