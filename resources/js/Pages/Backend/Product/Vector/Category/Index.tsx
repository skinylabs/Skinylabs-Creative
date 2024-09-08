import AdminLayout from "@/Layouts/AdminLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

import AdminHeader from "@/Components/Backend/AdminHeader";
import CreateVectorCategoryModal from "./Partials/Create";
import EditVectorCategoryModal from "./Partials/Edit";
import DeleteVectorCategoryModal from "./Partials/Delete";

interface VectorCategory {
    id: number;
    name: string;
}

interface Props extends PageProps {
    VectorCategories: VectorCategory[];
}

const VectorCategoryPage = ({ VectorCategories }: Props) => {
    const BreadcrumbItem = [
        { label: "Assets", href: "/" },
        { label: "Vector Categories" },
    ];

    return (
        <AdminLayout>
            <Head title="Vector Categories" />
            <AdminHeader items={BreadcrumbItem} title="Vector Categories" />
            <div className="flex justify-end">
                <CreateVectorCategoryModal categories={categories} />
            </div>

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-4">
                {VectorCategories.length > 0 ? (
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {VectorCategories.map((category) => (
                                <tr key={category.id}>
                                    <td className="px-4 py-2">
                                        {category.name}
                                    </td>
                                    <td className="px-4 py-2 flex gap-4">
                                        <EditVectorCategoryModal
                                            category={category}
                                        />
                                        <DeleteVectorCategoryModal
                                            category={category}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-4 text-center text-gray-500">
                        No categories available.
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default VectorCategoryPage;
