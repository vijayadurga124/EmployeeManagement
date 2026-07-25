import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../api/authApi";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "../context/useAuth";

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await loginApi({ email, password });
            login(response.token, response.role, email);
            navigate("/employees");
        } catch {
            setError("Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md">
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-8 py-8 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-lg font-semibold text-gray-900">
                            E
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
                        <p className="mt-1 text-sm text-gray-500">Employee Management System</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5 px-8 py-8">
                        {error && (
                            <div className="alert alert-error">
                                <span>{error}</span>
                            </div>
                        )}

                        <Input
                            label="Email address"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <Button type="submit" className="w-full" isLoading={loading}>
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>
                </div>

                <p className="mt-6 text-center text-xs text-gray-500">
                    © 2026 Employee Management System. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default LoginPage;