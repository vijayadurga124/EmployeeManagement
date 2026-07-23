import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../api/authApi";
import { useAuth } from "../context/useAuth";

function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const { login } = useAuth();

    const handleLogin = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();
        try {
            const response = await loginApi({
                email,
                password
            });
            login(response.token, response.role);
            navigate("/employees");
        }
        catch {
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20">
            <form
                onSubmit={handleLogin}
                className="shadow p-6 rounded bg-white"
            >
                <h2 className="text-3xl font-bold mb-6">
                    Login
                </h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="border w-full p-2 mb-4"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border w-full p-2 mb-4"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />
                {error && (
                    <p className="text-red-500 mb-4">
                        {error}
                    </p>
                )}
                <button
                    className="bg-blue-600 text-white px-5 py-2 rounded w-full"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginPage;