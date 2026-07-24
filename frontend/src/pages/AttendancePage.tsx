import { useEffect, useState } from "react";
import { attendanceApi } from "../api/attendanceApi";
import type { Attendance } from "../types/Attendance";

export default function AttendancePage() {
    const [history, setHistory] = useState<Attendance[]>([]);
    const [loading, setLoading] = useState(false);

    const loadHistory = async () => {
        try {
            setLoading(true);
            const data = await attendanceApi.getHistory(1);
            setHistory(data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadHistory();
    }, []);

    const handleCheckIn = async () => {
        await attendanceApi.checkIn();
        await loadHistory();
    };

    const handleCheckOut = async () => {
        await attendanceApi.checkOut();
        await loadHistory();
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Attendance</h2>

            <div className="flex gap-3 mb-6">
                <button
                    onClick={handleCheckIn}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Check In
                </button>
                <button
                    onClick={handleCheckOut}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                >
                    Check Out
                </button>
            </div>

            {loading ? (
                <p>Loading attendance history...</p>
            ) : (
                <ul className="space-y-2">
                    {history.map((entry) => (
                        <li key={entry.id} className="border rounded p-3">
                            <p><strong>Date:</strong> {entry.date}</p>
                            <p><strong>Check In:</strong> {entry.checkIn}</p>
                            <p><strong>Check Out:</strong> {entry.checkOut ?? "Not checked out yet"}</p>
                            <p><strong>Status:</strong> {entry.status}</p>
                        </li>
                    ))}
                    {history.length === 0 && <p>No attendance history found.</p>}
                </ul>
            )}
        </div>
    );
}