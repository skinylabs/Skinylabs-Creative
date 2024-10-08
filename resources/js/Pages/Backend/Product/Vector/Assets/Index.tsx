import AdminLayout from "@/Layouts/AdminLayout";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import CreateModal from "./Partials/Create";
import AdminHeader from "@/Components/Backend/AdminHeader";

import Pagination from "@/Components/ui/Pagination";
import { buttonVariants } from "@/components/ui/button";
interface VectorAssets {
    id: number;
    name: string;
    description: string;
    price: number;
    file: string;
    status: string;
    vector_category_id: number;
    vector_category?: {
        id: number;
        name: string;
    }[];
}
interface VectorCategory {
    id: number;
    name: string;
}

interface Props extends PageProps {
    vectorAssets: {
        data: VectorAssets[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    vectorCategories: VectorCategory[];
}

const VectorCategoryPage = ({ vectorCategories, vectorAssets }: Props) => {
    const { data, current_page, last_page, per_page, total } = vectorAssets;

    const BreadcrumbItem = [
        { label: "Vector", href: "/" },
        { label: "Category" },
    ];
    console.log(vectorCategories);
    return (
        <AdminLayout>
            <Head title="Vector Assets" />
            <AdminHeader items={BreadcrumbItem} title="Vector Assets" />
            <div className="flex justify-end">
                <Link
                    href="/vector-assets/create"
                    className={buttonVariants({ variant: "default" })}
                >
                    Create
                </Link>
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
                                {data.map((vectorAssets, index) => (
                                    <tr key={vectorAssets.id}>
                                        <td className="px-4 py-2">
                                            {(current_page - 1) * per_page +
                                                index +
                                                1}
                                        </td>
                                        <td className="px-4 py-2">
                                            {vectorAssets.name}
                                        </td>
                                        <td className="px-4 py-2">
                                            {vectorAssets.description}
                                        </td>
                                        <td className="px-4 py-2">
                                            {vectorAssets.price}
                                        </td>
                                        <td className="px-4 py-2">
                                            {vectorAssets.status}
                                        </td>
                                        <td className="px-4 py-2">
                                            {vectorAssets.file && (
                                                <img
                                                    src={`http://localhost:8000/storage/${vectorAssets.file}`}
                                                    alt={vectorAssets.name}
                                                    className="w-20 h-20 object-cover"
                                                />
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            {vectorAssets.vector_category
                                                ?.map(
                                                    (category) => category.name
                                                )
                                                .join(", ") || "No category"}
                                        </td>
                                        <td className="px-4 py-2 flex gap-4">
                                            <Link
                                                href={route(
                                                    "vector-assets.edit",
                                                    vectorAssets.id
                                                )}
                                                className={buttonVariants({
                                                    variant: "default",
                                                })}
                                            >
                                                Edit
                                            </Link>
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
                        No Assets available.
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default VectorCategoryPage;
