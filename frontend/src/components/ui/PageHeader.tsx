interface PageHeaderProps {
    title: string;
    description?: string;
    actions?: React.ReactNode;
    search?: React.ReactNode;
}

export default function PageHeader({ title, description, actions, search }: PageHeaderProps) {
    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                    {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
                </div>
                {actions && <div className="flex items-center gap-3">{actions}</div>}
            </div>
            {search && <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">{search}</div>}
        </div>
    );
}
