import api from "./axios";
import type { Attendance } from "../types/Attendance";

export interface TodayAttendanceStatus {
    date: string;
    checkedIn: boolean;
    checkIn?: string | null;
    checkedOut: boolean;
    checkOut?: string | null;
    status: string;
}

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

    getTodayStatus: async (): Promise<TodayAttendanceStatus> => {
        const response = await api.get<TodayAttendanceStatus>("/attendance/today");
        return response.data;
    },

    getHistory: async () => {

        const response =
            await api.get<Attendance[]>("/attendance/my-history");

        return response.data;
    }

};