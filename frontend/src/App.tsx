import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import EmployeePage from "./pages/EmployeePage";
import AttendancePage from "./pages/AttendancePage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

    return (
        <Routes>
            <Route
                path="/login"
                element={<LoginPage />}
            />
            <Route
                path="/employees"
                element={
                    <ProtectedRoute>
                        <EmployeePage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/attendance"
                element={
                    <ProtectedRoute>
                        <AttendancePage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />
        </Routes>
    );
}


export default App;