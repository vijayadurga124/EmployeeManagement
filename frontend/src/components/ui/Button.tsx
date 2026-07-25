import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVariant;
    isLoading?: boolean;
}

const baseClasses = "inline-flex h-10 items-center justify-center rounded-md px-4 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "text-gray-700 hover:bg-gray-100"
};

export default function Button({ children, variant = "primary", isLoading = false, className = "", disabled, type = "button", ...props }: ButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled || isLoading}
            className={`${baseClasses} ${variants[variant]} ${className}`.trim()}
            {...props}
        >
            {isLoading ? (
                <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" />
                        <path d="M4 12a8 8 0 018-8" stroke="currentColor" />
                    </svg>
                    {children}
                </span>
            ) : (
                children
            )}
        </button>
    );
}
