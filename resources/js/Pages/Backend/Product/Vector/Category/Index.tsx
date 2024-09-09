import AdminLayout from "@/Layouts/AdminLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import CreateModal from "./Partials/Create";
import DeleteCategoryModal from "./Partials/Delete";
import AdminHeader from "@/Components/Backend/AdminHeader";
import EditModal from "./Partials/Edit";

interface ProductCategories {
    id: number;
    name: string;
}

interface Props extends PageProps {
    Categories: ProductCategories[];
}

const ProductCategoryPage = ({ Categories = [] }: Props) => {
    console.log("Categories in IndexPage:", Categories);
    const BreadcrumbItem = [
        { label: "Product", href: "/" },
        { label: "Category" },
    ];

    return (
        <AdminLayout>
            <Head title="Product Categories" />
            <AdminHeader items={BreadcrumbItem} title="Vector Categories" />
            <div className="flex justify-end">
                <CreateModal ProductCategories={Categories} />
            </div>

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-4">
                {Categories.length > 0 ? (
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Categories.map((category) => (
                                <tr key={category.id}>
                                    <td className="px-4 py-2">
                                        {category.name}
                                    </td>
                                    <td className="px-4 py-2 flex gap-4">
                                        <EditModal category={category} />
                                        <DeleteCategoryModal
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

export default ProductCategoryPage;
