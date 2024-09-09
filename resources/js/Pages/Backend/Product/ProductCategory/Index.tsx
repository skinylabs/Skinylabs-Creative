import AdminLayout from "@/Layouts/AdminLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import CreateModal from "./Partials/Create";
import AdminHeader from "@/Components/Backend/AdminHeader";
import EditModal from "./Partials/Edit";
import Pagination from "@/Components/ui/Pagination";
import DeleteModal from "./Partials/Delete";

interface ProductCategory {
    id: number;
    name: string;
}

interface Props extends PageProps {
    ProductCategories: {
        data: ProductCategory[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

const ProductCategoryPage = ({ ProductCategories }: Props) => {
    const { data, current_page, last_page, per_page, total } =
        ProductCategories;

    const BreadcrumbItem = [
        { label: "Product", href: "/" },
        { label: "Category" },
    ];

    return (
        <AdminLayout>
            <Head title="Product Categories" />
            <AdminHeader items={BreadcrumbItem} title="Product Category" />
            <div className="flex justify-end">
                <CreateModal />
            </div>

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-4">
                {data.length > 0 ? (
                    <>
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">No</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((ProductCategories, index) => (
                                    <tr key={ProductCategories.id}>
                                        <td className="px-4 py-2">
                                            {(current_page - 1) * per_page +
                                                index +
                                                1}
                                        </td>
                                        <td className="px-4 py-2">
                                            {ProductCategories.name}
                                        </td>
                                        <td className="px-4 py-2 flex gap-4">
                                            <EditModal
                                                ProductCategories={
                                                    ProductCategories
                                                }
                                            />
                                            <DeleteModal
                                                ProductCategories={
                                                    ProductCategories
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Pagination controls */}
                        <Pagination
                            current_page={current_page}
                            last_page={last_page}
                        />
                        <div className="mt-4">
                            <span>
                                Page {current_page} of {last_page}
                            </span>
                            {/* You might want to add pagination links here */}
                        </div>
                    </>
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
