import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface AdminHeaderProps {
    items: BreadcrumbItem[];
    title: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ items, title }) => {
    return (
        <div className="mb-4">
            <h1 className="text-xl font-bold">{title}</h1>
            <Breadcrumb>
                <BreadcrumbList>
                    {items.map((item, index) => (
                        <BreadcrumbItem key={index}>
                            {index > 0 && <BreadcrumbSeparator />}
                            {item.href ? (
                                <BreadcrumbLink href={item.href}>
                                    {" "}
                                    {item.label}
                                </BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage>{item.label}</BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};

export default AdminHeader;
