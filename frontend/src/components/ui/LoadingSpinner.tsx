export default function LoadingSpinner({ label = "Loading..." }: { label?: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" />
            <p className="text-sm text-gray-500">{label}</p>
        </div>
    );
}
