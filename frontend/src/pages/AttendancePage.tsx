import { useEffect, useState } from "react";
import { attendanceApi, type TodayAttendanceStatus } from "../api/attendanceApi";
import type { Attendance } from "../types/Attendance";
import MainLayout from "../layouts/MainLayout";
import Button from "../components/ui/Button";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";

export default function AttendancePage() {
    const [history, setHistory] = useState<Attendance[]>([]);
    const [todayStatus, setTodayStatus] = useState<TodayAttendanceStatus | null>(null);
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const loadAttendanceData = async () => {
        try {
            setLoading(true);
            setError("");
            const [today, historyData] = await Promise.all([attendanceApi.getTodayStatus(), attendanceApi.getHistory()]);
            setTodayStatus(today);
            setHistory(historyData);
        } catch (err) {
            setError("Failed to load attendance data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadAttendanceData();
    }, []);

    const handleCheckIn = async () => {
        try {
            setChecking(true);
            setError("");
            await attendanceApi.checkIn();
            setSuccess("Checked in successfully!");
            await loadAttendanceData();
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError("Failed to check in");
            console.error(err);
        } finally {
            setChecking(false);
        }
    };

    const handleCheckOut = async () => {
        try {
            setChecking(true);
            setError("");
            await attendanceApi.checkOut();
            setSuccess("Checked out successfully!");
            await loadAttendanceData();
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError("Failed to check out");
            console.error(err);
        } finally {
            setChecking(false);
        }
    };

    const canCheckIn = !todayStatus?.checkedIn;
    const canCheckOut = todayStatus?.checkedIn && !todayStatus?.checkedOut;

    const formatTime = (time: string | null | undefined) => {
        if (!time) return "—";
        try {
            const [hours, minutes] = time.split(":");
            return `${hours}:${minutes}`;
        } catch {
            return time;
        }
    };

    return (
        <MainLayout title="Attendance">
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

            {loading ? (
                <LoadingSpinner label="Loading attendance data..." />
            ) : (
                <div className="space-y-6">
                    {todayStatus && (
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex flex-col gap-4 border-b border-gray-200 pb-6 md:flex-row md:items-start md:justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">Today&apos;s attendance</h3>
                                    <p className="mt-1 text-sm text-gray-500">{todayStatus.date}</p>
                                </div>
                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${todayStatus.status === "Present" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                                    {todayStatus.status}
                                </span>
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                    <p className="text-sm text-gray-500">Check in time</p>
                                    <p className="mt-2 text-3xl font-semibold text-gray-900">{todayStatus.checkedIn ? formatTime(todayStatus.checkIn) : "—"}</p>
                                    <p className="mt-3 text-sm text-gray-500">{todayStatus.checkedIn ? "Checked in" : "Not checked in"}</p>
                                </div>
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                    <p className="text-sm text-gray-500">Check out time</p>
                                    <p className="mt-2 text-3xl font-semibold text-gray-900">{todayStatus.checkedOut ? formatTime(todayStatus.checkOut) : "—"}</p>
                                    <p className="mt-3 text-sm text-gray-500">{todayStatus.checkedOut ? "Checked out" : "Not checked out"}</p>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col gap-3 border-t border-gray-200 pt-6 md:flex-row">
                                <Button onClick={handleCheckIn} disabled={!canCheckIn || checking} isLoading={checking && canCheckIn} className="md:flex-1">
                                    Check in
                                </Button>
                                <Button variant="secondary" onClick={handleCheckOut} disabled={!canCheckOut || checking} isLoading={checking && canCheckOut} className="md:flex-1">
                                    Check out
                                </Button>
                            </div>
                        </div>
                    )}

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-900">Attendance history</h3>
                        {history.length === 0 ? (
                            <div className="mt-6">
                                <EmptyState title="No attendance records yet" description="Your recent clock-in and clock-out entries will appear here." />
                            </div>
                        ) : (
                            <div className="mt-6 space-y-3">
                                {history.map((entry) => (
                                    <div key={entry.id} className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <p className="font-medium text-gray-900">{entry.date}</p>
                                                <span className={`rounded-full px-3 py-1 text-xs font-medium ${entry.status === "Present" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                                                    {entry.status}
                                                </span>
                                            </div>
                                            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                                                <span>In: {formatTime(entry.checkIn)}</span>
                                                <span>Out: {formatTime(entry.checkOut)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </MainLayout>
    );
}