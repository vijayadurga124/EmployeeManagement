import api from "./axios";
import type { Attendance } from "../types/Attendance";

export const attendanceApi = {

    checkIn: async () => {

        const response =
            await api.post<Attendance>("/attendance/checkin");

        return response.data;
    },

    checkOut: async () => {

        const response =
            await api.post<Attendance>("/attendance/checkout");

        return response.data;
    },

    getHistory: async (employeeId: number) => {

        const response =
            await api.get<Attendance[]>(`/attendance/${employeeId}`);

        return response.data;
    }

};