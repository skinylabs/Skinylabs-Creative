import AdminLayout from "@/Layouts/AdminLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

import AdminHeader from "@/Components/Backend/AdminHeader";
import EditModal from "./Partials/Edit";
import Pagination from "@/Components/ui/Pagination";
import CreateVectorAssetModal from "./Partials/Create";
import DeleteCategoryModal from "./Partials/Delete";

interface VectorAsset {
    id: number;
    name: string;
    description: string;
    vector_category_id: number;
    file: string;
    price: number;
    status: string;
    vectorCategory: {
        id: number;
        name: string;
    };
}

interface Props extends PageProps {
    VectorAssets: {
        data: VectorAsset[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

const VectorAssetsPage = ({ VectorAssets }: Props) => {
    const { data, current_page, last_page, per_page, total } = VectorAssets;

    const BreadcrumbItem = [
        { label: "Product", href: "/" },
        { label: "Vector Assets" },
    ];

    return (
        <AdminLayout>
            <Head title="Vector Assets" />
            <AdminHeader items={BreadcrumbItem} title="Vector Assets" />
            <div className="flex justify-end mb-4">
                <CreateVectorAssetModal />
            </div>

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-4">
                {data.length > 0 ? (
                    <>
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">No</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Category</th>
                                    <th className="px-4 py-2">Price</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((asset, index) => (
                                    <tr key={asset.id}>
                                        <td className="px-4 py-2">
                                            {(current_page - 1) * per_page +
                                                index +
                                                1}
                                        </td>
                                        <td className="px-4 py-2">
                                            {asset.name}
                                        </td>
                                        <td className="px-4 py-2">
                                            {asset.vectorCategory.name}
                                        </td>
                                        <td className="px-4 py-2">
                                            ${asset.price.toFixed(2)}
                                        </td>
                                        <td className="px-4 py-2 flex gap-4">
                                            <EditModal asset={asset} />
                                            <DeleteCategoryModal
                                                asset={asset}
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
                        No vector assets available.
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default VectorAssetsPage;
