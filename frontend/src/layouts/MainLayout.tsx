import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { useAuth } from "../context/useAuth";

interface MainLayoutProps {
    children: React.ReactNode;
    title: string;
}

export default function MainLayout({ children, title }: MainLayoutProps) {
    const navigate = useNavigate();
    const { logout, role, user } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-lg font-semibold text-gray-900">
                            E
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">Employee Management</h1>
                            <p className="text-xs text-gray-500">HR operations workspace</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <nav className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 p-1">
                            <button
                                onClick={() => navigate("/employees")}
                                className="h-10 rounded-md px-4 text-sm font-medium text-gray-700 hover:bg-white hover:text-blue-600"
                            >
                                Employees
                            </button>
                            <button
                                onClick={() => navigate("/attendance")}
                                className="h-10 rounded-md px-4 text-sm font-medium text-gray-700 hover:bg-white hover:text-blue-600"
                            >
                                Attendance
                            </button>
                        </nav>

                        <div className="flex items-center gap-3 border-t border-gray-200 pt-3 sm:border-l sm:border-t-0 sm:pl-3 sm:pt-0">
                            <div className="hidden text-right sm:block">
                                <p className="text-sm font-medium text-gray-900">{user}</p>
                                <p className="text-xs text-gray-500">{role}</p>
                            </div>
                            <Button variant="secondary" onClick={handleLogout}>
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-6">
                    <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
                    <p className="mt-1 text-sm text-gray-500">Manage workforce records and attendance in one place.</p>
                </div>
            </div>

            <main className="mx-auto max-w-7xl px-6 py-6">
                {children}
            </main>

            <footer className="border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-gray-500">
                    <p>© 2026 Employee Management System. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
