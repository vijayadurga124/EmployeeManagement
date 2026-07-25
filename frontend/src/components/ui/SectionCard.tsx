interface SectionCardProps {
    title: string;
    children: React.ReactNode;
    action?: React.ReactNode;
    className?: string;
}

export default function SectionCard({ title, children, action, className = "" }: SectionCardProps) {
    return (
        <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`.trim()}>
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                {action}
            </div>
            <div className="p-6">{children}</div>
        </div>
    );
}
