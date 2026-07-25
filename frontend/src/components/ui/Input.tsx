interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export default function Input({ label, error, className = "", ...props }: InputProps) {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                    {props.required && <span className="ml-1 text-red-600">*</span>}
                </label>
            )}
            <input
                className={`h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${className}`.trim()}
                {...props}
            />
            {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
    );
}
