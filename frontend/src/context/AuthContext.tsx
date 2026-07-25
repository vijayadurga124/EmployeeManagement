import {
    createContext,
    useState,
    type ReactNode
} from "react";

interface AuthContextType {
    token: string | null;
    role: string | null;
    user: string | null;
    login: (token: string, role: string, user?: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export { AuthContext };

export function AuthProvider({ children }: { children: ReactNode }) {

    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem("token")
    );
    const [role, setRole] = useState<string | null>(
        () => localStorage.getItem("role")
    );
    const [user, setUser] = useState<string | null>(
        () => localStorage.getItem("user")
    );

    const login = (token: string, role: string, userEmail: string = "User") => {

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("user", userEmail);

        setToken(token);
        setRole(role);
        setUser(userEmail);
    };
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        setToken(null);
        setRole(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                role,
                user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
