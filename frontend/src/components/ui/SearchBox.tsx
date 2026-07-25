interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export default function SearchBox({ value, onChange, placeholder = "Search", className = "" }: SearchBoxProps) {
    return (
        <div className={`relative w-full md:w-80 ${className}`.trim()}>
            <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
                type="text"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="h-10 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}
