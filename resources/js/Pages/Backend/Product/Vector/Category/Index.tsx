import AdminLayout from "@/Layouts/AdminLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import CreateModal from "./Partials/Create";
import AdminHeader from "@/Components/Backend/AdminHeader";
import EditModal from "./Partials/Edit";
import DeleteModal from "./Partials/Delete";
import Pagination from "@/Components/ui/Pagination";
interface VectorCategory {
    id: number;
    name: string;
    product_category_id: number;
    product_category?: {
        id: number;
        name: string;
    };
}
interface ProductCategory {
    id: number;
    name: string;
}

interface Props extends PageProps {
    vectorCategories: {
        data: VectorCategory[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    productCategories: ProductCategory[];
}

const VectorCategoryPage = ({ vectorCategories, productCategories }: Props) => {
    const { data, current_page, last_page, per_page, total } = vectorCategories;

    const BreadcrumbItem = [
        { label: "Vector", href: "/" },
        { label: "Category" },
    ];
    console.log(vectorCategories);
    return (
        <AdminLayout>
            <Head title="Vector Categories" />
            <AdminHeader items={BreadcrumbItem} title="Vector Category" />
            <div className="flex justify-end">
                <CreateModal productCategories={productCategories} />
            </div>

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-4">
                {data.length > 0 ? (
                    <>
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">No</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">
                                        Product Category
                                    </th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((vectorCategory, index) => (
                                    <tr key={vectorCategory.id}>
                                        <td className="px-4 py-2">
                                            {(current_page - 1) * per_page +
                                                index +
                                                1}
                                        </td>
                                        <td className="px-4 py-2">
                                            {vectorCategory.name}
                                        </td>
                                        <td className="px-4 py-2">
                                            {vectorCategory.product_category
                                                ?.name || "No category"}
                                        </td>
                                        <td className="px-4 py-2 flex gap-4">
                                            <EditModal
                                                vectorCategory={vectorCategory}
                                                productCategories={
                                                    productCategories
                                                }
                                            />
                                            <DeleteModal
                                                vectorCategory={vectorCategory}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            current_page={current_page}
                            last_page={last_page}
                        />
                        <div className="mt-4">
                            <span>
                                Page {current_page} of {last_page}
                            </span>
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

export default VectorCategoryPage;
